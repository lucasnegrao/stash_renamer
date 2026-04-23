import { requestResultsFocus } from "../services/renamerRuntimeState";
import { clearHistory } from "../api/sceneRenamerApi";
import { ConfirmDialog } from "../components/shared/ConfirmDialog";
import { HookSettingsModal } from "../components/hook/HookSettingsPanel";
import { WatchdogSettingsPanel } from "../components/watchdog/WatchdogSettingsPanel";

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
	const [clearing, setClearing] = React.useState(false);
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

	return (
		<div className={className}>
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
			<Card className="mb-4">
				<Card.Body>
					<div className="d-flex flex-column gap-2">
						<div className="d-flex align-items-center gap-2">
							<Button
								variant={activeInlinePanel === "hook" ? "primary" : "primary"}
								onClick={() =>
									setActiveInlinePanel((prev) =>
										prev === "hook" ? "" : "hook",
									)
								}
								disabled={clearing}
							>
								Hook Settings
							</Button>
							<Button
								variant={
									activeInlinePanel === "watchdog" ? "primary" : "primary"
								}
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
								variant="danger"
								onClick={() => setShowClearConfirm(true)}
								disabled={clearing}
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
									"Clean Database History"
								)}
							</Button>
						</div>

						{status ? <div className="small">{status}</div> : null}
					</div>
				</Card.Body>
			</Card>

			{activeInlinePanel === "hook" ? (
				<div className="mb-4">
					<HookSettingsModal inline hookType="Scene.Update.Post" />
				</div>
			) : null}

			{activeInlinePanel === "watchdog" ? <WatchdogSettingsPanel /> : null}
		</div>
	);
};
