import { useTableColumns } from "../hooks/useTableColumns";
import type { IScenePreviewResult } from "../services/sceneRenamerApi";
import { type IColumn, ListTable } from "./list/ListTable";

const PluginApi = window.PluginApi;
const React = PluginApi.React;
const { Button, Badge } = PluginApi.libraries.Bootstrap;
const { Icon } = PluginApi.components;
const {
	faArrowRotateLeft,
	faArrowRotateRight,
	faCircleCheck,
	faCircleXmark,
	faTriangleExclamation,
} = PluginApi.libraries.FontAwesomeSolid;

interface IResultsTableProps {
	rows: IScenePreviewResult[];
	selected: Set<string>;
	onSelectChange: (id: string, checked: boolean) => void;
	onUndoOne: (id: string) => void;
	loading?: boolean;
}

interface IColumnSpec extends IColumn {
	defaultShow?: boolean;
	render: (row: IScenePreviewResult) => React.ReactNode;
}

function formatDate(value?: string): string {
	if (!value) return "-";
	const d = new Date(value);
	if (Number.isNaN(d.getTime())) return value;
	return d.toLocaleString();
}

function getStatusMeta(row: IScenePreviewResult): {
	label: string;
	tone: "success" | "warning" | "danger" | "secondary" | "undone";
	details: string;
} {
	if (row.undone) {
		return {
			label: "undone",
			tone: "undone",
			details: String(row.error || row.log || ""),
		};
	}

	const raw = String(row.status || row.operation_type || "").toLowerCase();
	const details = String(row.error || row.log || "");
	const successValue = row.success as any;
	const hasSuccess =
		successValue === true || successValue === 1 || successValue === "1";
	const hasFailure =
		successValue === false || successValue === 0 || successValue === "0";
	const detailsLower = details.toLowerCase();
	const isNoChange = detailsLower.includes(
		"no change (same path and filename)",
	);
	const isWarn =
		isNoChange || raw === "warn" || raw === "warning" || raw === "skipped";
	const isError =
		!isNoChange && (hasFailure || raw === "error" || raw === "fail");
	const isSuccess =
		hasSuccess ||
		(!hasFailure && !isWarn && (raw === "success" || raw === "pending"));

	if (isError) return { label: raw || "error", tone: "danger", details };
	if (isWarn) return { label: raw || "warn", tone: "warning", details };
	if (isSuccess) return { label: raw || "success", tone: "success", details };

	return { label: raw || "unknown", tone: "secondary", details };
}

function canUndoRow(row: IScenePreviewResult): boolean {
	const successValue = row.success;
	const isSuccessful =
		successValue === true || successValue === 1 || successValue === "1";
	const opType = String(row.operation_type || "").toLowerCase();
	return (
		!!row.id && ["rename", "undo", "redo"].includes(opType) && isSuccessful
	);
}

export const ResultsTable: React.FC<IResultsTableProps> = ({
	rows,
	selected,
	onSelectChange,
	onUndoOne,
	loading,
}) => {
	const allColumns: IColumnSpec[] = [
		{
			value: "when",
			label: "When",
			defaultShow: true,
			defaultWidth: 190,
			minWidth: 160,
			multiline: false,
			render: (row) => (
				<span className="font-monospace">{formatDate(row.created_at)}</span>
			),
		},
		{
			value: "scene_id",
			label: "Scene",
			defaultShow: true,
			defaultWidth: 110,
			minWidth: 90,
			multiline: false,
			render: (row) => <span>{String(row.scene_id || "-")}</span>,
		},
		{
			value: "old_path",
			label: "Old Path",
			defaultShow: true,
			defaultWidth: 360,
			minWidth: 220,
			maxLines: 2,
			render: (row) => (
				<Badge className="stash-renamer-list-path-badge" variant="info">
					{String(row.old_path || "-")}
				</Badge>
			),
		},
		{
			value: "new_path",
			label: "New Path",
			defaultShow: true,
			defaultWidth: 360,
			minWidth: 220,
			maxLines: 2,
			render: (row) => {
				const meta = getStatusMeta(row);

				return (
					<Badge className="stash-renamer-list-path-badge" variant={meta.tone}>
						{meta.tone == "danger" || meta.tone == "warning"
							? String(row.error || row.log)
							: String(row.new_path)}
					</Badge>
				);
			},
		},
		{
			value: "status",
			label: "Status",
			defaultShow: true,
			defaultWidth: 90,
			minWidth: 82,
			multiline: false,
			render: (row) => {
				const meta = getStatusMeta(row);
				const canUndo = canUndoRow(row);
				const opType = String(row.operation_type || "").toLowerCase();
				const isUndoType = opType === "undo";
				const titleAction =
					meta.tone === "undone"
						? "Redo this rename"
						: isUndoType
							? "Redo this rename"
							: "Undo this rename";

				const iconNode =
					meta.tone === "undone" ? (
						<Icon
							size="lg"
							icon={isUndoType ? faArrowRotateLeft : faArrowRotateRight}
							className="text-info"
							title={meta.details || meta.label}
						/>
					) : meta.tone === "success" ? (
						<Icon
							size="lg"
							icon={faCircleCheck}
							className="text-success"
							title={meta.details || meta.label}
						/>
					) : meta.tone === "warning" ? (
						<Icon
							size="lg"
							icon={faTriangleExclamation}
							className="text-warning"
							title={meta.details || meta.label}
						/>
					) : meta.tone === "danger" ? (
						<Icon
							size="lg"
							icon={faCircleXmark}
							className="text-danger"
							title={meta.details || meta.label}
						/>
					) : (
						<span title={meta.details}>{meta.label}</span>
					);

				if (canUndo) {
					return (
						<button
							type="button"
							title={titleAction}
							disabled={loading}
							onClick={(e) => {
								e.preventDefault();
								e.stopPropagation();
								onUndoOne(String(row.id));
							}}
							style={{
								border: "none",
								background: "transparent",
								padding: 0,
								lineHeight: 1,
								cursor: "pointer",
							}}
						>
							{iconNode}
						</button>
					);
				}

				return iconNode;
			},
		},
		// {
		// 	value: "status_text",
		// 	label: "Status Text",
		// 	defaultShow: true,
		// 	defaultWidth: 280,
		// 	minWidth: 180,
		// 	maxLines: 2,
		// 	render: (row) => <span>{String(row.error || row.log || "-")}</span>,
		// },
	];

	const defaultColumns = allColumns
		.filter((column) => column.defaultShow)
		.map((column) => column.value);

	const { selectedColumns, saveColumns } = useTableColumns(
		"results",
		defaultColumns,
	);

	const baseColumns: IColumn[] = allColumns.map(
		({ render, defaultShow, ...col }) => col,
	);

	function renderCell(
		column: IColumn,
		row: IScenePreviewResult,
	): React.ReactNode {
		const spec = allColumns.find((c) => c.value === column.value);
		return spec ? spec.render(row) : null;
	}

	if (rows.length === 0) {
		return (
			<div className="text-muted text-center py-3">
				{loading ? "Loading..." : "No results found for this batch."}
			</div>
		);
	}

	return (
		<ListTable<IScenePreviewResult>
			tableName="results"
			className="mb-2"
			items={rows.map((r, i) => ({
				...r,
				id: String(
					r.id || `${r.scene_id || "scene"}-${r.created_at || "row"}-${i}`,
				),
			}))}
			columns={selectedColumns}
			setColumns={saveColumns}
			allColumns={baseColumns}
			selectedIds={selected}
			onSelectChange={(id, checked) => {
				const row = rows.find((r) => String(r.id || "") === id);
				if (!row || !canUndoRow(row)) {
					onSelectChange(id, false);
					return;
				}
				onSelectChange(id, checked);
			}}
			renderCell={renderCell}
		/>
	);
};
