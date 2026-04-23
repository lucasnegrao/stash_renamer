import {
	fetchWatchdogConfigs,
	fetchWatchdogStatus,
	type IWatchdogConfig,
	type IWatchdogState,
	reorderWatchdogConfigs,
	restartWatchdog,
	runWatchdog,
	saveWatchdogConfigToDatabase,
	stopWatchdog,
} from "../services/sceneRenamerApi";
import { FolderSelect } from "./list/Filters/FolderFilter";
import { StashEndpointSelect } from "./list/Filters/StashEndpointSelect";

const PluginApi = window.PluginApi;
const React = PluginApi.React;
const { Button, Card, Spinner, Table, Modal, Form, Badge, Alert } =
	PluginApi.libraries.Bootstrap;
const { faPlay, faStop, faSync, faEdit, faPlus, faArrowUp, faArrowDown } =
	PluginApi.libraries.FontAwesomeSolid;
const { Icon } = PluginApi.components;

const METADATA_SCAN_OP = `mutation metadataScan($input: ScanMetadataInput!) { metadataScan(input: $input) }`;
const METADATA_IDENTIFY_OP = `mutation metadataIdentify($input: IdentifyMetadataInput!) { metadataIdentify(input: $input) }`;

export const WatchdogSettingsPanel: React.FC<{ className?: string }> = ({
	className = "",
}) => {
	const [status, setStatus] = React.useState<IWatchdogState | null>(null);
	const [configs, setConfigs] = React.useState<IWatchdogConfig[]>([]);
	const [loading, setLoading] = React.useState(false);
	const [actionLoading, setActionLoading] = React.useState(false);

	const [showModal, setShowModal] = React.useState(false);
	const [fixedPath, setFixedPath] = React.useState<string | null>(null);
	const [editingConfig, setEditingConfig] = React.useState<
		Partial<IWatchdogConfig> & {
			options?: any;
		}
	>({});

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
		configs.forEach((c) => {
			if (!groups[c.path]) groups[c.path] = [];
			groups[c.path].push(c);
		});
		return groups;
	}, [configs]);

	const moveConfig = async (
		path: string,
		currentIndex: number,
		direction: "up" | "down",
	) => {
		const group = [...(groupedConfigs[path] || [])];
		if (direction === "up" && currentIndex > 0) {
			const temp = group[currentIndex - 1];
			group[currentIndex - 1] = group[currentIndex];
			group[currentIndex] = temp;
		} else if (direction === "down" && currentIndex < group.length - 1) {
			const temp = group[currentIndex + 1];
			group[currentIndex + 1] = group[currentIndex];
			group[currentIndex] = temp;
		} else {
			return;
		}

		setActionLoading(true);
		try {
			await reorderWatchdogConfigs(
				path,
				group.map((c) => c.id),
			);
			await loadData();
		} catch (e) {
			console.error("Failed to reorder configs", e);
		} finally {
			setActionLoading(false);
		}
	};

	const openCreateModal = (path?: string) => {
		setFixedPath(path || null);
		setEditingConfig({
			enabled: true,
			path: path || "",
			operation: METADATA_SCAN_OP,
			options: {
				variables: {
					input: {
						rescan: false,
						scanGenerateCovers: false,
						scanGeneratePreviews: false,
						scanGenerateImagePreviews: false,
						scanGenerateSprites: false,
						scanGeneratePhashes: false,
						scanGenerateImagePhashes: false,
						scanGenerateThumbnails: false,
						scanGenerateClipPreviews: false,
					},
				},
			},
		});
		setShowModal(true);
	};

	const openEditModal = (config: IWatchdogConfig) => {
		setFixedPath(config.path);
		setEditingConfig(JSON.parse(JSON.stringify(config))); // deep copy
		setShowModal(true);
	};

	const saveConfig = async () => {
		if (!editingConfig.path) return;
		setActionLoading(true);
		try {
			const variablesInput = editingConfig.options?.variables?.input || {};
			variablesInput.paths = [editingConfig.path];

			const payload = {
				id: editingConfig.id,
				path: editingConfig.path,
				operation: editingConfig.operation || METADATA_SCAN_OP,
				enabled: editingConfig.enabled ?? true,
				options: {
					...editingConfig.options,
					variables: {
						...editingConfig.options?.variables,
						input: variablesInput,
					},
				},
			};

			await saveWatchdogConfigToDatabase(payload);
			await loadData();
			setShowModal(false);
		} catch (e) {
			console.error("Failed to save watchdog config", e);
		} finally {
			setActionLoading(false);
		}
	};

	const setInputOption = (key: string, val: boolean) => {
		setEditingConfig((prev: any) => {
			const next = { ...prev };
			next.options = next.options || {};
			next.options.variables = next.options.variables || {};
			next.options.variables.input = next.options.variables.input || {};
			next.options.variables.input[key] = val;
			return next;
		});
	};

	const setIdentifySources = (endpoints: string[]) => {
		setEditingConfig((prev: any) => {
			const next = { ...prev };
			next.options = next.options || {};
			next.options.variables = next.options.variables || {};
			next.options.variables.input = next.options.variables.input || {};
			next.options.variables.input.sources = endpoints.map((ep) => ({
				source: { endpoint: ep },
			}));
			return next;
		});
	};

	const handleOperationChange = (newOp: string) => {
		setEditingConfig((prev: any) => ({
			...prev,
			operation: newOp,
			options: {
				...prev.options,
				variables: {
					...prev.options?.variables,
					input:
						newOp === METADATA_SCAN_OP
							? {
									rescan: false,
									scanGenerateCovers: false,
									scanGeneratePreviews: false,
									scanGenerateImagePreviews: false,
									scanGenerateSprites: false,
									scanGeneratePhashes: false,
									scanGenerateImagePhashes: false,
									scanGenerateThumbnails: false,
									scanGenerateClipPreviews: false,
								}
							: {
									sources: [],
								},
				},
			},
		}));
	};

	const inputOptions = editingConfig.options?.variables?.input || {};
	const identifySourcesValue = (inputOptions.sources || []).map(
		(s: any) => s?.source?.endpoint,
	);

	return (
		<div className={className}>
			<Card className="mb-3">
				<Card.Header className="d-flex justify-content-between align-items-center">
					<h5 className="mb-0">Watchdog Service</h5>
					<div>
						{status?.status === "running" ? (
							<Badge bg="success" className="mr-2">
								Running (PID: {status.pid})
							</Badge>
						) : status?.status === "error" ? (
							<Badge bg="danger" className="mr-2">
								Error
							</Badge>
						) : (
							<Badge bg="secondary" className="mr-2">
								Stopped
							</Badge>
						)}
					</div>
				</Card.Header>
				<Card.Body>
					{status?.status === "error" && status?.message && (
						<Alert variant="danger" className="mb-3">
							{status.message}
						</Alert>
					)}
					<div className="d-flex gap-2">
						<Button
							variant="success"
							size="sm"
							disabled={actionLoading || status?.status === "running"}
							onClick={() => handleServiceAction("start")}
						>
							<Icon icon={faPlay} className="mr-1" /> Start
						</Button>
						<Button
							variant="danger"
							size="sm"
							disabled={actionLoading || status?.status !== "running"}
							onClick={() => handleServiceAction("stop")}
						>
							<Icon icon={faStop} className="mr-1" /> Stop
						</Button>
						<Button
							variant="warning"
							size="sm"
							disabled={actionLoading}
							onClick={() => handleServiceAction("restart")}
						>
							<Icon icon={faSync} className="mr-1" /> Restart
						</Button>
					</div>
				</Card.Body>
			</Card>

			<Card>
				<Card.Header className="d-flex justify-content-between align-items-center">
					<h6 className="mb-0">Watchdog Paths & Operations</h6>
					<Button variant="primary" size="sm" onClick={() => openCreateModal()}>
						<Icon icon={faPlus} className="mr-1" /> Add Path
					</Button>
				</Card.Header>
				<Card.Body>
					{loading && configs.length === 0 ? (
						<Spinner animation="border" size="sm" />
					) : Object.keys(groupedConfigs).length === 0 ? (
						<div className="text-center text-muted">
							No configurations found.
						</div>
					) : (
						Object.entries(groupedConfigs).map(([path, pathConfigs]) => (
							<div key={path} className="mb-4">
								<div className="d-flex justify-content-between align-items-center mb-2 bg-light p-2 rounded">
									<h6
										className="mb-0 text-break font-monospace"
										style={{ wordBreak: "break-all" }}
									>
										{path}
									</h6>
									<Button
										variant="outline-primary"
										size="sm"
										onClick={() => openCreateModal(path)}
									>
										<Icon icon={faPlus} className="mr-1" /> Add Operation
									</Button>
								</div>
								<Table striped bordered hover size="sm">
									<thead>
										<tr>
											<th>Order</th>
											<th>Operation</th>
											<th>Enabled</th>
											<th>Actions</th>
										</tr>
									</thead>
									<tbody>
										{pathConfigs.map((c, index) => (
											<tr key={c.id}>
												<td className="align-middle" style={{ width: "100px" }}>
													<div className="d-flex gap-1">
														<Button
															variant="outline-secondary"
															size="sm"
															disabled={index === 0 || actionLoading}
															onClick={() => moveConfig(path, index, "up")}
															title="Move Up"
														>
															<Icon icon={faArrowUp} />
														</Button>
														<Button
															variant="outline-secondary"
															size="sm"
															disabled={
																index === pathConfigs.length - 1 ||
																actionLoading
															}
															onClick={() => moveConfig(path, index, "down")}
															title="Move Down"
														>
															<Icon icon={faArrowDown} />
														</Button>
													</div>
												</td>
												<td className="align-middle">
													{c.operation.includes("metadataIdentify")
														? "Identify"
														: "Scan"}
												</td>
												<td className="align-middle">
													{c.enabled ? (
														<Badge bg="success">Yes</Badge>
													) : (
														<Badge bg="danger">No</Badge>
													)}
												</td>
												<td
													className="align-middle text-right"
													style={{ width: "80px" }}
												>
													<Button
														variant="secondary"
														size="sm"
														onClick={() => openEditModal(c)}
													>
														<Icon icon={faEdit} /> Edit
													</Button>
												</td>
											</tr>
										))}
									</tbody>
								</Table>
							</div>
						))
					)}
				</Card.Body>
			</Card>

			<Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
				<Modal.Header closeButton>
					<Modal.Title>
						{editingConfig.id ? "Edit Operation" : "New Operation"}
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form.Group className="mb-3">
						<Form.Label>Target Path</Form.Label>
						{fixedPath ? (
							<Form.Control
								type="text"
								value={editingConfig.path || ""}
								readOnly
								disabled
							/>
						) : (
							<FolderSelect
								value={editingConfig.path}
								onChange={(v: string) =>
									setEditingConfig((prev: any) => ({ ...prev, path: v }))
								}
							/>
						)}
					</Form.Group>

					<Form.Group className="mb-3">
						<Form.Label>Operation Type</Form.Label>
						<Form.Control
							as="select"
							value={editingConfig.operation || METADATA_SCAN_OP}
							onChange={(e: any) => handleOperationChange(e.target.value)}
						>
							<option value={METADATA_SCAN_OP}>Metadata Scan</option>
							<option value={METADATA_IDENTIFY_OP}>Metadata Identify</option>
						</Form.Control>
					</Form.Group>

					<Form.Group className="mb-3">
						<Form.Check
							type="switch"
							label="Enabled"
							checked={editingConfig.enabled ?? true}
							onChange={(e: any) =>
								setEditingConfig((prev: any) => ({
									...prev,
									enabled: e.target.checked,
								}))
							}
						/>
					</Form.Group>

					<hr />

					{editingConfig.operation === METADATA_SCAN_OP ? (
						<>
							<h6>Metadata Scan Options</h6>
							<div className="d-flex flex-wrap gap-3 mt-3">
								{[
									{ key: "rescan", label: "Rescan" },
									{ key: "scanGenerateCovers", label: "Generate Covers" },
									{ key: "scanGeneratePreviews", label: "Generate Previews" },
									{
										key: "scanGenerateImagePreviews",
										label: "Generate Image Previews",
									},
									{ key: "scanGenerateSprites", label: "Generate Sprites" },
									{ key: "scanGeneratePhashes", label: "Generate Phashes" },
									{
										key: "scanGenerateImagePhashes",
										label: "Generate Image Phashes",
									},
									{
										key: "scanGenerateThumbnails",
										label: "Generate Thumbnails",
									},
									{
										key: "scanGenerateClipPreviews",
										label: "Generate Clip Previews",
									},
								].map((opt) => (
									<Form.Check
										key={opt.key}
										type="checkbox"
										label={opt.label}
										checked={inputOptions[opt.key] ?? false}
										onChange={(e: any) =>
											setInputOption(opt.key, e.target.checked)
										}
									/>
								))}
							</div>
						</>
					) : (
						<>
							<h6>Metadata Identify Endpoints</h6>
							<div className="mt-3">
								<StashEndpointSelect
									value={identifySourcesValue}
									onChange={setIdentifySources}
								/>
							</div>
						</>
					)}
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={() => setShowModal(false)}>
						Cancel
					</Button>
					<Button
						variant="primary"
						disabled={!editingConfig.path || actionLoading}
						onClick={saveConfig}
					>
						{actionLoading ? <Spinner size="sm" animation="border" /> : "Save"}
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
};
