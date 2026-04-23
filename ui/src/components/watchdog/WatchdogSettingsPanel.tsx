import {
	fetchGeneralConfigSnapshot,
	deleteWatchdogConfigFromDatabase,
	fetchWatchdogConfigs,
	fetchWatchdogStatus,
	type IWatchdogConfig,
	type IWatchdogState,
	installFfmpegProxyServiceTask,
	reorderWatchdogConfigs,
	restartWatchdog,
	runWatchdog,
	saveWatchdogConfigToDatabase,
	stopWatchdog,
	uninstallFfmpegProxyServiceTask,
} from "../../api/sceneRenamerApi";
import { trackTaskJob } from "../../services/taskProgressService";
import { WatchdogListTable } from "./WatchdogListTable";
import { WatchdogOperationModal } from "./WatchdogOperationModal";

const PluginApi = window.PluginApi;
const React = PluginApi.React;
const { Button, Card, Spinner, Badge, Alert } = PluginApi.libraries.Bootstrap;
const { faPlay, faStop, faSync, faPlus } = PluginApi.libraries.FontAwesomeSolid;
const { Icon } = PluginApi.components;

interface IModalState {
	show: boolean;
	fixedPath: string | null;
	config: Partial<IWatchdogConfig> | null;
}

export const WatchdogSettingsPanel: React.FC<{ className?: string }> = ({
	className = "",
}) => {
	const [status, setStatus] = React.useState<IWatchdogState | null>(null);
	const [configs, setConfigs] = React.useState<IWatchdogConfig[]>([]);
	const [loading, setLoading] = React.useState(false);
	const [actionLoading, setActionLoading] = React.useState(false);
	const [serviceInstalled, setServiceInstalled] =
		React.useState<boolean>(false);
	const [serviceBusy, setServiceBusy] = React.useState(false);
	const [serviceStatus, setServiceStatus] = React.useState("");
	const [modal, setModal] = React.useState<IModalState>({
		show: false,
		fixedPath: null,
		config: null,
	});

	const loadData = async () => {
		setLoading(true);
		try {
			const [st, cfg] = await Promise.all([
				fetchWatchdogStatus(),
				fetchWatchdogConfigs(),
			]);
			setStatus(st);
			setConfigs(cfg);
		} catch (e) {
			console.error("Failed to load watchdog data", e);
		} finally {
			setLoading(false);
		}
	};

	React.useEffect(() => {
		loadData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const refreshServiceInstalled = React.useCallback(async () => {
		try {
			const config = await fetchGeneralConfigSnapshot();
			const ffmpegPath = String(config?.ffmpegPath || "");
			const installed =
				/(?:^|[\\/])\.ffmpeg_proxy[\\/]ffmpeg_proxy(?:\.sh|\.cmd)?$/i.test(
					ffmpegPath,
				);
			setServiceInstalled(installed);
		} catch (e) {
			console.error("Failed to fetch general configuration", e);
		}
	}, []);

	React.useEffect(() => {
		void refreshServiceInstalled();
	}, [refreshServiceInstalled]);

	const onToggleInstallService = React.useCallback(async () => {
		setServiceBusy(true);
		setServiceStatus("");
		try {
			const jobId = serviceInstalled
				? await uninstallFfmpegProxyServiceTask()
				: await installFfmpegProxyServiceTask();
			if (!jobId) {
				setServiceStatus(
					serviceInstalled
						? "Uninstall service task queued."
						: "Install service task queued.",
				);
				return;
			}

			setServiceStatus(
				serviceInstalled
					? `Uninstall service task queued (${jobId}).`
					: `Install service task queued (${jobId}).`,
			);

			const tracker = trackTaskJob(jobId, {
				onProgress: ({ status: taskStatus, error }) => {
					setServiceStatus(
						`Service task: ${taskStatus}${error ? ` - ${String(error)}` : ""}`,
					);
				},
			});

			const final = await tracker.done;
			if (String(final.status).toUpperCase() === "FINISHED") {
				await refreshServiceInstalled();
				setServiceStatus(
					serviceInstalled
						? "Service uninstalled successfully."
						: "Service installed successfully.",
				);
			} else {
				setServiceStatus(
					`Service task ended with status ${final.status}${final.error ? `: ${final.error}` : ""}`,
				);
			}
		} catch (e: unknown) {
			const message =
				typeof e === "object" && e && "message" in e
					? String((e as { message?: unknown }).message || "")
					: "";
			setServiceStatus(
				`Failed to ${serviceInstalled ? "uninstall" : "install"} service: ${message || String(e)}`,
			);
		} finally {
			setServiceBusy(false);
			await refreshServiceInstalled();
		}
	}, [serviceInstalled, refreshServiceInstalled]);

	const handleServiceAction = async (action: "start" | "stop" | "restart") => {
		setActionLoading(true);
		try {
			let st: IWatchdogState;
			if (action === "start") st = await runWatchdog();
			else if (action === "stop") st = await stopWatchdog();
			else st = await restartWatchdog();
			setStatus(st);
		} catch (e) {
			console.error(`Failed to ${action} watchdog`, e);
		} finally {
			setActionLoading(false);
		}
	};

	const groupedConfigs = React.useMemo(() => {
		const groups: Record<string, IWatchdogConfig[]> = {};
		configs.forEach((config) => {
			if (!groups[config.path]) groups[config.path] = [];
			groups[config.path].push(config);
		});
		return groups;
	}, [configs]);

	const groupedEntries = React.useMemo(
		() => Object.entries(groupedConfigs),
		[groupedConfigs],
	);

	const pathTableName = (path: string) => {
		const normalized = String(path || "")
			.toLowerCase()
			.replace(/[^a-z0-9]+/g, "_")
			.replace(/^_+|_+$/g, "")
			.slice(0, 64);
		return `watchdog_${normalized || "path"}`;
	};

	const reorderPathConfigs = async (path: string, rows: IWatchdogConfig[]) => {
		setActionLoading(true);
		try {
			await reorderWatchdogConfigs(
				path,
				rows.map((row) => String(row.id)),
			);
			await loadData();
		} catch (e) {
			console.error("Failed to reorder configs", e);
		} finally {
			setActionLoading(false);
		}
	};

	const toggleEnabled = async (
		config: IWatchdogConfig,
		nextEnabled: boolean,
	) => {
		setActionLoading(true);
		try {
			await saveWatchdogConfigToDatabase({
				id: config.id,
				path: config.path,
				operation: config.operation,
				enabled: nextEnabled,
				options: config.options || {},
			});
			await loadData();
		} catch (e) {
			console.error("Failed to toggle watchdog config", e);
		} finally {
			setActionLoading(false);
		}
	};

	const removeConfig = async (config: IWatchdogConfig) => {
		const ok = window.confirm("Remove this watchdog operation?");
		if (!ok) return;
		setActionLoading(true);
		try {
			await deleteWatchdogConfigFromDatabase(config.id);
			await loadData();
		} catch (e) {
			console.error("Failed to delete watchdog config", e);
		} finally {
			setActionLoading(false);
		}
	};

	const openCreateModal = (path?: string) => {
		setModal({
			show: true,
			fixedPath: path || null,
			config: null,
		});
	};

	const openEditModal = (config: IWatchdogConfig) => {
		setModal({
			show: true,
			fixedPath: config.path,
			config: JSON.parse(JSON.stringify(config)),
		});
	};

	const closeModal = () => {
		setModal({
			show: false,
			fixedPath: null,
			config: null,
		});
	};

	const saveFromModal = async (payload: any) => {
		setActionLoading(true);
		try {
			await saveWatchdogConfigToDatabase(payload);
			await loadData();
			closeModal();
		} catch (e) {
			console.error("Failed to save watchdog config", e);
		} finally {
			setActionLoading(false);
		}
	};

	return (
		<div className={className}>
			<Card>
				<Card.Header className="d-flex justify-content-between align-items-center">
					<h5 className="mb-0">Watchdog Service</h5>
					<div className="d-flex gap-6">
						{status?.status === "running" ? (
							<>
								<Button
									variant="danger"
									size="sm"
									disabled={actionLoading || serviceBusy}
									onClick={() => handleServiceAction("stop")}
								>
									<Icon icon={faStop} className="mr-1" />
								</Button>
								<Button
									variant="warning"
									size="sm"
									disabled={actionLoading || serviceBusy}
									onClick={() => handleServiceAction("restart")}
								>
									<Icon icon={faSync} className="mr-1" />
								</Button>
							</>
						) : (
							<Button
								variant="success"
								size="sm"
								disabled={actionLoading || serviceBusy}
								onClick={() => handleServiceAction("start")}
							>
								<Icon icon={faPlay} className="mr-1" />
							</Button>
						)}
					</div>
				</Card.Header>
				<Card.Body>
					{status?.status === "error" && status?.message && (
						<Alert variant="danger" className="mb-3">
							{status.message}
						</Alert>
					)}

					{serviceStatus ? (
						<div className="small text-muted mt-2">{serviceStatus}</div>
					) : null}
					<Button
						variant={serviceInstalled ? "warning" : "success"}
						size="sm"
						disabled={serviceBusy || actionLoading}
						onClick={onToggleInstallService}
					>
						{serviceBusy
							? "Working..."
							: serviceInstalled
								? "Uninstall Service"
								: "Install Service"}
					</Button>
					<Button variant="primary" size="sm" onClick={() => openCreateModal()}>
						<Icon icon={faPlus} className="mr-1" /> Add Path
					</Button>
				</Card.Body>
			</Card>

			{loading && configs.length === 0 ? (
				<Spinner animation="border" size="sm" />
			) : groupedEntries.length === 0 ? (
				<div className="text-center text-muted">No configurations found.</div>
			) : (
				groupedEntries.map(([path, pathConfigs]) => (
					<Card key={path} className="mb-4">
						<Card.Header className="d-flex justify-content-between align-items-center">
							<h6>{path}</h6>
							<div className="d-flex">
								<Button
									variant="primary"
									size="sm"
									onClick={() => openCreateModal(path)}
								>
									<Icon icon={faPlus} /> Add Operation
								</Button>
							</div>
						</Card.Header>
						<Card.Body>
							<WatchdogListTable
								tableName={pathTableName(path)}
								rows={pathConfigs}
								disabled={actionLoading}
								onReorder={(rows) => reorderPathConfigs(path, rows)}
								onToggleEnabled={toggleEnabled}
								onEdit={openEditModal}
								onRemove={removeConfig}
							/>
						</Card.Body>
					</Card>
				))
			)}

			<WatchdogOperationModal
				show={modal.show}
				saving={actionLoading}
				fixedPath={modal.fixedPath}
				initialConfig={modal.config}
				onHide={closeModal}
				onSave={saveFromModal}
			/>
		</div>
	);
};
