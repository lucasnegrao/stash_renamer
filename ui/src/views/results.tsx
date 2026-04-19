import {
	fetchBatchOperations,
	fetchOperationBatches,
	undoBatchOperation,
	undoOperation,
	type IOperationBatch,
	type IScenePreviewResult,
} from "../services/sceneRenamerApi";
import {
	subscribeActiveTabState,
	subscribeResultsFocus,
} from "../services/renamerRuntimeState";
import { ResultsTable } from "../components/ResultsTable";
import { trackTaskJob } from "../services/taskProgressService";
import { TaskProgressOverlay } from "../components/TaskProgressOverlay";

const PluginApi = window.PluginApi;
const React = PluginApi.React;
const {
	Button,
	Dropdown,
	Spinner,
	Form,
	ButtonGroup,
	FormControl,
	Alert,
	ButtonToolbar,
} = PluginApi.libraries.Bootstrap;
const { Icon } = PluginApi.components;
const {
	faArrowRotateLeft,
	faCircleCheck,
	faCircleXmark,
	faTriangleExclamation,
	faRotateRight,
	faCaretDown,
	faCaretUp,
} = PluginApi.libraries.FontAwesomeSolid;
const HOOK_BATCH_ID = "stash_renamer_hook_batch";

export const RenamerResults: React.FC = () => {
	const intl = PluginApi.libraries.Intl.useIntl();
	const Pagination =
		(PluginApi.components as any).Pagination ||
		(PluginApi.components as any).pagination;
	const PaginationIndex =
		(PluginApi.components as any).PaginationIndex ||
		(PluginApi.components as any).paginationIndex;

	const [batches, setBatches] = React.useState<IOperationBatch[]>([]);
	const [selectedBatchId, setSelectedBatchId] = React.useState<string>("");
	const [operations, setOperations] = React.useState<IScenePreviewResult[]>([]);
	const [selectedOperationIds, setSelectedOperationIds] = React.useState<
		Set<string>
	>(new Set());
	const [loading, setLoading] = React.useState(false);
	const [status, setStatus] = React.useState("Idle");
	const [runningUndo, setRunningUndo] = React.useState(false);
	const [taskProgress, setTaskProgress] = React.useState(0);
	const [taskProgressText, setTaskProgressText] = React.useState("");
	const activeTaskCleanupRef = React.useRef<(() => void) | null>(null);
	const [currentPage, setCurrentPage] = React.useState(1);
	const [itemsPerPage, setItemsPerPage] = React.useState(25);
	const [sortField, setSortField] = React.useState<
		"when" | "status" | "old_path" | "new_path"
	>("when");
	const [sortDirection, setSortDirection] = React.useState<"asc" | "desc">(
		"desc",
	);
	const [statusFilters, setStatusFilters] = React.useState({
		success: true,
		error: true,
		warn: true,
	});

	const selectedBatch = React.useMemo(
		() => batches.find((b) => String(b.id) === String(selectedBatchId)) || null,
		[batches, selectedBatchId],
	);
	const formatBatchLabel = React.useCallback(
		(batch: IOperationBatch) => {
			const mode = String(batch.mode || "").toLowerCase();
			const isHookBatch =
				String(batch.id || "") === HOOK_BATCH_ID || mode === "hook";
			const modeLabel = isHookBatch
				? "Hook"
				: mode === "rename"
					? "Rename"
					: batch.mode || "Batch";
			const dateLabel = batch.started_at
				? `${intl.formatDate(new Date(batch.started_at), {
						year: "numeric",
						month: "2-digit",
						day: "2-digit",
					})} ${intl.formatTime(new Date(batch.started_at), {
						hour: "2-digit",
						minute: "2-digit",
						second: "2-digit",
					})}`
				: "-";
			return `${modeLabel} - ${dateLabel}`;
		},
		[intl],
	);

	const toggleStatusFilter = (type: "success" | "error" | "warn") => {
		setStatusFilters((prev) => ({ ...prev, [type]: !prev[type] }));
		setCurrentPage(1);
	};

	const filteredOperations = React.useMemo(() => {
		const filtered = operations.filter((row) => {
			const raw = String(row.status || row.operation_type || "").toLowerCase();
			const details = String(row.error || row.log || "").toLowerCase();
			const successValue = row.success as any;
			const hasSuccess =
				successValue === true || successValue === 1 || successValue === "1";
			const hasFailure =
				successValue === false || successValue === 0 || successValue === "0";
			const isNoChange = details.includes("no change (same path and filename)");

			const isWarn =
				isNoChange || raw === "warn" || raw === "warning" || raw === "skipped";
			const isError =
				!isNoChange && (hasFailure || raw === "error" || raw === "fail");
			const isSuccess =
				hasSuccess ||
				(!hasFailure && !isWarn && (raw === "success" || raw === "pending"));

			if (isError && statusFilters.error) return true;
			if (isWarn && statusFilters.warn) return true;
			if (isSuccess && statusFilters.success) return true;
			return false;
		});

		filtered.sort((a, b) => {
			let valA = "";
			let valB = "";
			if (sortField === "when") {
				valA = String(a.created_at || "");
				valB = String(b.created_at || "");
			} else if (sortField === "status") {
				valA = String(a.status || a.operation_type || "");
				valB = String(b.status || b.operation_type || "");
			} else if (sortField === "old_path") {
				valA = String(a.old_path || "");
				valB = String(b.old_path || "");
			} else if (sortField === "new_path") {
				valA = String(a.new_path || "");
				valB = String(b.new_path || "");
			}
			const cmp = valA.localeCompare(valB);
			return sortDirection === "asc" ? cmp : -cmp;
		});

		return filtered;
	}, [operations, statusFilters, sortField, sortDirection]);

	const statusCounts = React.useMemo(() => {
		let success = 0,
			error = 0,
			warn = 0;
		operations.forEach((row) => {
			const raw = String(row.status || row.operation_type || "").toLowerCase();
			const details = String(row.error || row.log || "").toLowerCase();
			const successValue = row.success as any;
			const hasSuccess =
				successValue === true || successValue === 1 || successValue === "1";
			const hasFailure =
				successValue === false || successValue === 0 || successValue === "0";
			const isNoChange = details.includes("no change (same path and filename)");

			const isWarn =
				isNoChange || raw === "warn" || raw === "warning" || raw === "skipped";
			const isError =
				!isNoChange && (hasFailure || raw === "error" || raw === "fail");
			const isSuccess =
				hasSuccess ||
				(!hasFailure && !isWarn && (raw === "success" || raw === "pending"));

			if (isError) error++;
			else if (isWarn) warn++;
			else if (isSuccess) success++;
		});
		return { success, error, warn };
	}, [operations]);

	const metadataByline = React.useMemo(() => {
		const parts = [];
		if (statusFilters.success) parts.push(`${statusCounts.success} successful`);
		if (statusFilters.error) parts.push(`${statusCounts.error} errors`);
		if (statusFilters.warn) parts.push(`${statusCounts.warn} unchanged`);

		const shownText = parts.length > 0 ? parts.join(" + ") : "0 files";
		return `${shownText} shown from ${operations.length} total files`;
	}, [statusFilters, statusCounts, operations.length]);

	const totalItems = filteredOperations.length;
	const start = (currentPage - 1) * itemsPerPage;
	const pageRows = filteredOperations.slice(start, start + itemsPerPage);

	async function loadBatches(selectLatest = true) {
		setLoading(true);
		try {
			const rows = (await fetchOperationBatches()).filter((b) => {
				const mode = String(b.mode || "").toLowerCase();
				if (mode === "dry_run") return false;
				if (mode.startsWith("hook") && String(b.id || "") !== HOOK_BATCH_ID) {
					return false;
				}
				return true;
			});
			setBatches(rows);
			if (selectLatest && rows.length > 0) {
				setSelectedBatchId(String(rows[0].id));
			}
			if (rows.length === 0) {
				setSelectedBatchId("");
				setOperations([]);
			}
			setStatus(`Loaded ${rows.length} batches.`);
		} catch (e: any) {
			setStatus(`Error loading batches: ${e?.message || String(e)}`);
		} finally {
			setLoading(false);
		}
	}

	async function loadBatchOperations(batchId: string) {
		if (!batchId) {
			setOperations([]);
			return;
		}
		setLoading(true);
		try {
			const rows = await fetchBatchOperations(batchId);
			setOperations(rows);
			setSelectedOperationIds(new Set());
			setCurrentPage(1);
			setStatus(`Loaded ${rows.length} operations from batch ${batchId}.`);
		} catch (e: any) {
			setStatus(`Error loading operations: ${e?.message || String(e)}`);
		} finally {
			setLoading(false);
		}
	}

	React.useEffect(() => {
		loadBatches(true);
	}, []);

	React.useEffect(() => {
		const unsub = subscribeActiveTabState((tab) => {
			if (tab !== "results") return;
			loadBatches(true);
		});
		return () => unsub();
	}, []);

	React.useEffect(() => {
		loadBatchOperations(selectedBatchId);
	}, [selectedBatchId]);

	React.useEffect(() => {
		const unsub = subscribeResultsFocus(async ({ batchId }) => {
			if (batchId) {
				setSelectedBatchId(String(batchId));
				await loadBatchOperations(String(batchId));
				return;
			}
			await loadBatches(true);
		});
		return () => unsub();
	}, []);

	React.useEffect(() => {
		return () => {
			if (activeTaskCleanupRef.current) {
				activeTaskCleanupRef.current();
				activeTaskCleanupRef.current = null;
			}
		};
	}, []);

	const onSelectChange = (id: string, checked: boolean) => {
		if (!id) return;
		const next = new Set(selectedOperationIds);
		if (checked) next.add(id);
		else next.delete(id);
		setSelectedOperationIds(next);
	};

	async function onUndoOne(id: string) {
		if (!id) return;
		setRunningUndo(true);
		try {
			await undoOperation(id);
			setStatus(`Undo completed for operation ${id}.`);
			await loadBatchOperations(selectedBatchId);
		} catch (e: any) {
			setStatus(`Undo failed: ${e?.message || String(e)}`);
		} finally {
			setRunningUndo(false);
		}
	}

	async function onUndoSelected() {
		const ids = Array.from(selectedOperationIds);
		if (ids.length === 0) return;
		setRunningUndo(true);
		try {
			let ok = 0;
			const errors: string[] = [];
			for (const id of ids) {
				try {
					await undoOperation(id);
					ok += 1;
				} catch (e: any) {
					errors.push(`${id}: ${e?.message || String(e)}`);
				}
			}
			setStatus(
				errors.length
					? `Undone ${ok}/${ids.length}. Errors: ${errors.slice(0, 3).join(" | ")}`
					: `Undone ${ok}/${ids.length} operations.`,
			);
			await loadBatchOperations(selectedBatchId);
		} finally {
			setRunningUndo(false);
		}
	}

	async function onUndoBatch() {
		if (!selectedBatchId) return;
		if (activeTaskCleanupRef.current) {
			activeTaskCleanupRef.current();
			activeTaskCleanupRef.current = null;
		}
		setRunningUndo(true);
		try {
			const jobId = await undoBatchOperation(selectedBatchId);
			if (!jobId) {
				setStatus("Batch undo queued (no job id returned)");
				setRunningUndo(false);
				return;
			}
			setTaskProgress(0);
			setTaskProgressText("Starting undo batch...");
			setStatus(`Batch undo queued (${jobId})`);

			const tracker = trackTaskJob(jobId, {
				onProgress: ({ progress, status, error }) => {
					setTaskProgress(progress);
					setTaskProgressText(`${status}${error ? ` - ${error}` : ""}`);
				},
			});
			activeTaskCleanupRef.current = tracker.stop;

			const final = await tracker.done;
			activeTaskCleanupRef.current = null;

			if (String(final.status).toUpperCase() === "FINISHED") {
				setStatus(`Batch undo completed.`);
				await loadBatchOperations(selectedBatchId);
				await loadBatches(false);
			} else {
				setStatus(
					`Batch undo ended with status ${final.status}${final.error ? `: ${final.error}` : ""}.`,
				);
			}
		} catch (e: any) {
			setStatus(`Batch undo failed: ${e?.message || String(e)}`);
		} finally {
			setRunningUndo(false);
		}
	}

	return (
		<div className="container-fluid p-8">
			<TaskProgressOverlay
				show={activeTaskCleanupRef.current !== null}
				progress={taskProgress}
				text={taskProgressText}
			/>
			<div className="d-flex align-items-center justify-content-end gap-2 mb-3">
				<Dropdown
					as={ButtonGroup}
					className="flex-grow-1"
					style={{ maxWidth: "500px" }}
				>
					<Button
						variant="secondary"
						onClick={() => loadBatches(false)}
						disabled={loading || runningUndo}
						title="Refresh"
					>
						<Icon icon={faRotateRight} />
					</Button>
					<Dropdown.Toggle
						variant="secondary"
						disabled={loading || runningUndo || batches.length === 0}
						className="w-70 text-left d-flex justify-content-between align-items-center"
					>
						<span className="text-truncate mr-3">
							{selectedBatch
								? formatBatchLabel(selectedBatch)
								: batches.length === 0
									? "No batches"
									: "Select batch..."}
						</span>
					</Dropdown.Toggle>
					<Dropdown.Menu
						className="w-70"
						style={{ maxHeight: "340px", overflowY: "auto" }}
					>
						{batches.length === 0 ? (
							<Dropdown.Item disabled>No batches</Dropdown.Item>
						) : (
							batches.map((batch) => (
								<Dropdown.Item
									key={String(batch.id)}
									eventKey={String(batch.id)}
									active={String(batch.id) === String(selectedBatchId)}
									onSelect={(eventKey: string | null) =>
										setSelectedBatchId(String(eventKey || ""))
									}
								>
									{formatBatchLabel(batch)}
								</Dropdown.Item>
							))
						)}
					</Dropdown.Menu>
					<Button
						variant="danger"
						onClick={onUndoBatch}
						disabled={
							loading ||
							runningUndo ||
							!selectedBatchId ||
							selectedBatch?.mode !== "rename"
						}
						title="Undo Batch"
					>
						{runningUndo ? (
							<Spinner animation="border" size="sm" role="status" />
						) : (
							<>
								<Icon icon={faArrowRotateLeft} /> Undo Batch
							</>
						)}
					</Button>
				</Dropdown>
			</div>

			{status && /fail|error/i.test(status) ? (
				<div className="mb-3">
					<Alert variant="danger" className="mb-0">
						{status}
					</Alert>
				</div>
			) : null}

			<ButtonToolbar className="filtered-list-toolbar mb-2 mt-2 align-items-center">
				{selectedOperationIds.size > 0 ? (
					<Button
						variant="secondary"
						onClick={onUndoSelected}
						disabled={loading || runningUndo || selectedOperationIds.size === 0}
						title="Undo Selected"
					>
						<Icon icon={faArrowRotateLeft} /> Undo Selected (
						{selectedOperationIds.size})
					</Button>
				) : null}

				<Dropdown as={ButtonGroup} className="sort-by-select">
					<Dropdown.Toggle variant="secondary">
						{sortField === "when"
							? "When"
							: sortField === "status"
								? "Status"
								: sortField === "old_path"
									? "Old Path"
									: "New Path"}
					</Dropdown.Toggle>
					<Dropdown.Menu className="bg-secondary text-white">
						<Dropdown.Item
							eventKey="when"
							className="bg-secondary text-white"
							onSelect={() => setSortField("when")}
						>
							When
						</Dropdown.Item>
						<Dropdown.Item
							eventKey="status"
							className="bg-secondary text-white"
							onSelect={() => setSortField("status")}
						>
							Status
						</Dropdown.Item>
						<Dropdown.Item
							eventKey="old_path"
							className="bg-secondary text-white"
							onSelect={() => setSortField("old_path")}
						>
							Old Path
						</Dropdown.Item>
						<Dropdown.Item
							eventKey="new_path"
							className="bg-secondary text-white"
							onSelect={() => setSortField("new_path")}
						>
							New Path
						</Dropdown.Item>
					</Dropdown.Menu>
					<Button
						variant="secondary"
						title="Sort Direction"
						onClick={() =>
							setSortDirection((d) => (d === "asc" ? "desc" : "asc"))
						}
					>
						<Icon icon={sortDirection === "desc" ? faCaretDown : faCaretUp} />
					</Button>
				</Dropdown>

				<ButtonGroup className="ml-2">
					<FormControl
						as="select"
						value={String(itemsPerPage)}
						className="btn-secondary"
						style={{ width: "auto" }}
						onChange={(e: any) => {
							setItemsPerPage(Number(e.target.value) || 25);
							setCurrentPage(1);
						}}
					>
						{[10, 25, 50, 100, 250].map((n) => (
							<option key={n} value={n}>
								{n}
							</option>
						))}
					</FormControl>
				</ButtonGroup>

				<div className="pl-3">
					<ButtonGroup>
						<Button
							variant={statusFilters.success ? "primary" : "secondary"}
							onClick={() => toggleStatusFilter("success")}
							disabled={loading || runningUndo}
							title="Toggle successful files"
						>
							<Icon icon={faCircleCheck} />
						</Button>
						<Button
							variant={statusFilters.error ? "primary" : "secondary"}
							onClick={() => toggleStatusFilter("error")}
							disabled={loading || runningUndo}
							title="Toggle error files"
						>
							<Icon icon={faCircleXmark} />
						</Button>
						<Button
							variant={statusFilters.warn ? "primary" : "secondary"}
							onClick={() => toggleStatusFilter("warn")}
							disabled={loading || runningUndo}
							title="Toggle unchanged files"
						>
							<Icon icon={faTriangleExclamation} />
						</Button>
					</ButtonGroup>
				</div>
			</ButtonToolbar>
			{Pagination ? (
				<div className="mr-2">
					<Pagination
						currentPage={currentPage}
						itemsPerPage={itemsPerPage}
						totalItems={totalItems}
						onChangePage={(page: number) => setCurrentPage(page)}
					/>
				</div>
			) : null}

			{PaginationIndex ? (
				<div className="d-flex justify-content-center mb-3 mt-2 text-muted small">
					<PaginationIndex
						loading={loading || runningUndo}
						itemsPerPage={itemsPerPage}
						currentPage={currentPage}
						totalItems={totalItems}
						metadataByline={metadataByline}
					/>
				</div>
			) : null}

			{loading || runningUndo ? (
				<div className="d-flex justify-content-center align-items-center py-5">
					<Spinner animation="border" role="status" variant="secondary" />
				</div>
			) : (
				<ResultsTable
					rows={pageRows}
					selected={selectedOperationIds}
					onSelectChange={onSelectChange}
					onUndoOne={onUndoOne}
					loading={false}
				/>
			)}

			{Pagination ? (
				<div className="pagination-footer-container">
					<div className="pagination-footer"></div>
					<Pagination
						itemsPerPage={itemsPerPage}
						currentPage={currentPage}
						totalItems={totalItems}
						onChangePage={(page: number) => setCurrentPage(page)}
						pagePopupPlacement="top"
					/>
				</div>
			) : null}
		</div>
	);
};
