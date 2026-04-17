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

const PluginApi = window.PluginApi;
const React = PluginApi.React;
const { Button, Dropdown, Spinner, Form } = PluginApi.libraries.Bootstrap;
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
	const [currentPage, setCurrentPage] = React.useState(1);
	const [itemsPerPage, setItemsPerPage] = React.useState(25);
	const [hideUnchanged, setHideUnchanged] = React.useState(false);

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

	const filteredOperations = React.useMemo(() => {
		if (!hideUnchanged) return operations;
		return operations.filter((row) => {
			const details = String(row.error || row.log || "").toLowerCase();
			const unchangedByText = details.includes(
				"no change (same path and filename)",
			);
			return !unchangedByText;
		});
	}, [operations, hideUnchanged]);

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
		setRunningUndo(true);
		try {
			const result = await undoBatchOperation(selectedBatchId);
			const total = Number(result?.total || 0);
			const ok = Number(result?.success || 0);
			const errors = Array.isArray(result?.errors) ? result.errors : [];
			setStatus(
				errors.length
					? `Batch undone ${ok}/${total}. Errors: ${errors.slice(0, 3).join(" | ")}`
					: `Batch undone ${ok}/${total}.`,
			);
			await loadBatchOperations(selectedBatchId);
			await loadBatches(false);
		} catch (e: any) {
			setStatus(`Batch undo failed: ${e?.message || String(e)}`);
		} finally {
			setRunningUndo(false);
		}
	}

	return (
		<div className="container-fluid p-8">
			<div className="d-flex align-items-center mb-2">
				<Button
					variant="secondary"
					size="sm"
					onClick={() => loadBatches(false)}
					disabled={loading || runningUndo}
				>
					{loading ? "Refreshing..." : "Refresh"}
				</Button>
				<Button
					className="ml-2"
					variant="secondary"
					size="sm"
					onClick={onUndoSelected}
					disabled={loading || runningUndo || selectedOperationIds.size === 0}
				>
					Undo Selected ({selectedOperationIds.size})
				</Button>
				<Button
					className="ml-2"
					variant="danger"
					size="sm"
					onClick={onUndoBatch}
					disabled={
						loading ||
						runningUndo ||
						!selectedBatchId ||
						selectedBatch?.mode !== "rename"
					}
				>
					{runningUndo ? (
						<>
							<Spinner
								animation="border"
								size="sm"
								role="status"
								className="mr-1"
							/>
							Undo Batch
						</>
					) : (
						"Undo Batch"
					)}
				</Button>
			</div>

			<div className="form-group row mb-2">
				<label className="col-sm-2 col-form-label">Batch</label>
				<div className="col-sm-10">
					<Dropdown>
						<Dropdown.Toggle
							variant="secondary"
							className="w-100 text-left"
							disabled={loading || batches.length === 0}
						>
							{selectedBatch ? formatBatchLabel(selectedBatch) : "No batches"}
						</Dropdown.Toggle>
						<Dropdown.Menu
							className="w-100"
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
					</Dropdown>
				</div>
			</div>

			<div className="mb-2">
				<strong>Status:</strong> {status}
			</div>
			<div className="mb-2">
				<Form.Check
					id="results-hide-unchanged"
					type="checkbox"
					label="Hide unchanged files"
					checked={hideUnchanged}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
						setHideUnchanged(e.target.checked);
						setCurrentPage(1);
					}}
				/>
			</div>

			{PaginationIndex ? (
				<PaginationIndex
					loading={loading}
					itemsPerPage={itemsPerPage}
					currentPage={currentPage}
					totalItems={totalItems}
				/>
			) : null}

			<ResultsTable
				rows={pageRows}
				selected={selectedOperationIds}
				onSelectChange={onSelectChange}
				onUndoOne={onUndoOne}
				loading={loading || runningUndo}
			/>

			<div className="d-flex align-items-center">
				<label className="mb-0 mr-2">Rows</label>
				<select
					className="form-control form-control-sm"
					style={{ width: "90px" }}
					value={itemsPerPage}
					onChange={(e) => {
						setItemsPerPage(Number(e.target.value) || 25);
						setCurrentPage(1);
					}}
				>
					{[10, 25, 50, 100].map((n) => (
						<option key={n} value={n}>
							{n}
						</option>
					))}
				</select>
			</div>

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
