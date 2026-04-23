import { useTableColumns } from "../../hooks/useTableColumns";
import type { IWatchdogConfig } from "../../api/sceneRenamerApi";
import { ListTable, type IColumn } from "../list/ListTable";
import { CrudActionsColumnCell } from "../list/cells/CrudActionsColumnCell";
import { TextColumnCell } from "../list/cells/TextColumnCell";

const PluginApi = window.PluginApi;
const React = PluginApi.React;
const { Icon } = PluginApi.components;
const { faExchange } = PluginApi.libraries.FontAwesomeSolid;

interface IWatchdogListTableProps {
	tableName: string;
	rows: IWatchdogConfig[];
	disabled?: boolean;
	onReorder: (rows: IWatchdogConfig[]) => void;
	onToggleEnabled: (row: IWatchdogConfig, enabled: boolean) => void;
	onEdit: (row: IWatchdogConfig) => void;
	onRemove: (row: IWatchdogConfig) => void;
}

function toEnabled(value: unknown): boolean {
	return (
		value === true ||
		value === 1 ||
		value === "1" ||
		String(value || "").toLowerCase() === "true"
	);
}

function operationLabel(operation: string): string {
	const raw = String(operation || "").trim();
	if (!raw) return "-";
	if (raw.includes("metadataIdentify")) return "Identify";
	if (raw.includes("metadataScan")) return "Scan";
	return raw;
}

export const WatchdogListTable: React.FC<IWatchdogListTableProps> = ({
	tableName,
	rows,
	disabled = false,
	onReorder,
	onToggleEnabled,
	onEdit,
	onRemove,
}) => {
	const allColumns: IColumn[] = [
		{
			value: "operation",
			label: "Operation",
			mandatory: true,
			defaultWidth: 260,
			minWidth: 180,
			multiline: true,
			maxLines: 2,
		},
		{
			value: "actions",
			label: "Actions",
			mandatory: true,
			defaultWidth: 280,
			minWidth: 240,
			multiline: false,
		},
	];

	const defaultColumns = allColumns.map((column) => column.value);
	const { selectedColumns, saveColumns } = useTableColumns(
		tableName,
		defaultColumns,
	);
	const emptySelection = React.useMemo(() => new Set<string>(), []);

	function renderCell(column: IColumn, row: IWatchdogConfig) {
		if (column.value === "operation") {
			return <TextColumnCell value={operationLabel(row.operation)} />;
		}
		if (column.value === "actions") {
			return (
				<CrudActionsColumnCell
					disabled={disabled}
					enabled={toEnabled((row as any)?.enabled)}
					onToggleEnabled={(nextValue) => onToggleEnabled(row, nextValue)}
					onEdit={() => onEdit(row)}
					onRemove={() => onRemove(row)}
				/>
			);
		}
		return null;
	}

	return (
		<ListTable
			tableName={tableName}
			items={rows}
			columns={selectedColumns}
			setColumns={saveColumns}
			allColumns={allColumns}
			selectedIds={emptySelection}
			onSelectChange={() => {}}
			rowReorderEnabled={!disabled}
			onRowReorder={onReorder}
			renderSelectHeader={() => <span className="text-muted"></span>}
			renderSelectCell={() => (
				<span className="text-muted" title="Drag to reorder">
					<Icon icon={faExchange} />
				</span>
			)}
			renderCell={renderCell}
		/>
	);
};
