import { requestResultsFocus } from "../services/renamerRuntimeState";
import {
	clearHistory,
	fetchInstalledPluginPackageSpec,
	setPluginRuntimeConfig,
	uninstallFfmpegProxyServiceTask,
	uninstallPluginPackageTask,
} from "../api/sceneRenamerApi";
import { ConfirmDialog } from "../components/shared/ConfirmDialog";
import { HookSettingsModal } from "../components/hook/HookSettingsPanel";
import { WatchdogSettingsPanel } from "../components/watchdog/WatchdogSettingsPanel";
import { trackTaskJob } from "../services/taskProgressService";

const PluginApi = window.PluginApi;
const React = PluginApi.React;
const { Button, Card, Spinner } = PluginApi.libraries.Bootstrap;

interface ISettingsViewProps {
	className?: string;
}

export const SettingsView: React.FC<ISettingsViewProps> = ({
	className = "container-fluid p-8",
}) => {
	const [activeInlinePanel, setActiveInlinePanel] = React.useState<
		"" | "hook" | "watchdog"
	>("");
	const [showClearConfirm, setShowClearConfirm] = React.useState(false);
	const [showUninstallConfirm, setShowUninstallConfirm] = React.useState(false);
	const [clearing, setClearing] = React.useState(false);
	const [uninstalling, setUninstalling] = React.useState(false);
	const [status, setStatus] = React.useState("");

	const onConfirmClear = async () => {
		setClearing(true);
		setStatus("");
		try {
			const result = await clearHistory();
			const deletedOperations = Number(result?.deleted_operations || 0);
			const deletedBatches = Number(result?.deleted_batches || 0);
			setStatus(
				`History cleared. Removed ${deletedOperations} operations and ${deletedBatches} batches.`,
			);
			requestResultsFocus(null);
		} catch (e: unknown) {
			const message =
				typeof e === "object" && e && "message" in e
					? String((e as { message?: unknown }).message || "")
					: "";
			setStatus(`Failed to clear history: ${message || String(e)}`);
		} finally {
			setClearing(false);
			setShowClearConfirm(false);
		}
	};

	const onConfirmUninstall = async () => {
		setUninstalling(true);
		setStatus("");
		try {
			const proxyJobId = await uninstallFfmpegProxyServiceTask();
			if (proxyJobId) {
				const proxyTracker = trackTaskJob(proxyJobId, {
					onProgress: ({ status: taskStatus, error }) => {
						setStatus(
							`Uninstalling FFmpeg proxy service: ${taskStatus}${error ? ` - ${String(error)}` : ""}`,
						);
					},
				});
				const finalProxy = await proxyTracker.done;
				if (String(finalProxy.status || "").toUpperCase() !== "FINISHED") {
					throw new Error(
						finalProxy.error ||
							`FFmpeg proxy uninstall ended with status ${finalProxy.status}`,
					);
				}
			}

			await setPluginRuntimeConfig({
				pluginId: "stash_renamer",
				installed: false,
				pythonPath: "",
			});

			const pkg = await fetchInstalledPluginPackageSpec();
			if (!pkg || !pkg.id || !pkg.sourceURL) {
				throw new Error(
					"Could not resolve installed package spec (id/sourceURL) for stash_renamer.",
				);
			}

			const uninstallJobId = await uninstallPluginPackageTask(pkg);
			if (!uninstallJobId) {
				throw new Error("uninstallPackages did not return a job id");
			}
			const uninstallTracker = trackTaskJob(uninstallJobId, {
				onProgress: ({ status: taskStatus, error }) => {
					setStatus(
						`Uninstalling plugin package: ${taskStatus}${error ? ` - ${String(error)}` : ""}`,
					);
				},
			});
			const finalUninstall = await uninstallTracker.done;
			if (String(finalUninstall.status || "").toUpperCase() !== "FINISHED") {
				throw new Error(
					finalUninstall.error ||
						`Plugin uninstall ended with status ${finalUninstall.status}`,
				);
			}

			setStatus("Plugin uninstalled successfully. Reloading page...");
			window.location.reload();
		} catch (e: unknown) {
			const message =
				typeof e === "object" && e && "message" in e
					? String((e as { message?: unknown }).message || "")
					: "";
			setStatus(`Failed to uninstall plugin: ${message || String(e)}`);
		} finally {
			setUninstalling(false);
			setShowUninstallConfirm(false);
		}
	};

	return (
		<div className="w-100">
			<ConfirmDialog
				show={showClearConfirm}
				title="Clear Rename History?"
				body="This removes all saved operation batches and results. Templates and hook settings are kept."
				confirmLabel={clearing ? "Clearing..." : "Clear History"}
				confirmVariant="danger"
				closeButton={!clearing}
				staticBackdrop
				onCancel={() => {
					if (clearing) return;
					setShowClearConfirm(false);
				}}
				onConfirm={onConfirmClear}
			/>
			<ConfirmDialog
				show={showUninstallConfirm}
				title="Uninstall Scene Renamer?"
				body="This will uninstall FFmpeg proxy service, clear plugin runtime configuration, uninstall package stash_renamer, and reload the page."
				confirmLabel={uninstalling ? "Uninstalling..." : "Uninstall Plugin"}
				confirmVariant="danger"
				closeButton={!uninstalling}
				staticBackdrop
				onCancel={() => {
					if (uninstalling) return;
					setShowUninstallConfirm(false);
				}}
				onConfirm={onConfirmUninstall}
			/>
			<Card>
				<Card.Body>
					<Button
						variant={activeInlinePanel === "hook" ? "secondary" : "primary"}
						onClick={() =>
							setActiveInlinePanel((prev) => (prev === "hook" ? "" : "hook"))
						}
						disabled={clearing}
					>
						Hook Settings
					</Button>
					<Button
						variant={activeInlinePanel === "watchdog" ? "secondary" : "primary"}
						onClick={() =>
							setActiveInlinePanel((prev) =>
								prev === "watchdog" ? "" : "watchdog",
							)
						}
						disabled={clearing}
					>
						Watchdog Settings
					</Button>
					<Button
						variant="warning"
						onClick={() => setShowClearConfirm(true)}
						disabled={clearing || uninstalling}
					>
						{clearing ? (
							<>
								<Spinner
									animation="border"
									size="sm"
									role="status"
									className="mr-1"
								/>
								Clearing...
							</>
						) : (
							"Clear History"
						)}
					</Button>
					<Button
						variant="danger"
						onClick={() => setShowUninstallConfirm(true)}
						disabled={clearing || uninstalling}
					>
						{uninstalling ? (
							<>
								<Spinner
									animation="border"
									size="sm"
									role="status"
									className="mr-1"
								/>
								Uninstalling...
							</>
						) : (
							"Uninstall Plugin"
						)}
					</Button>
				</Card.Body>
			</Card>

			{activeInlinePanel === "hook" ? (
				<HookSettingsModal inline hookType="Scene.Update.Post" />
			) : null}

			{activeInlinePanel === "watchdog" ? <WatchdogSettingsPanel /> : null}
		</div>
	);
};
