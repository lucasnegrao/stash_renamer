import { useTableColumns } from "../../hooks/useTableColumns";
import type { IRenamerTemplate } from "../../api/sceneRenamerApi";
import { ListTable, type IColumn } from "../list/ListTable";
import { CrudActionsColumnCell } from "../list/cells/CrudActionsColumnCell";
import { SelectOptionColumnCell } from "../list/cells/SelectOptionColumnCell";

const PluginApi = window.PluginApi;
const React = PluginApi.React;
const { Icon } = PluginApi.components;
const { faExchange } = PluginApi.libraries.FontAwesomeSolid;

export interface IHookTemplateRow {
	id: string;
	templateId: string;
}

interface IHookSettingsTableProps {
	tableName: string;
	rows: IHookTemplateRow[];
	templates: IRenamerTemplate[];
	disabled?: boolean;
	onReorder: (rows: IHookTemplateRow[]) => void;
	onTemplateChange: (row: IHookTemplateRow, templateId: string) => void;
	onEdit: (row: IHookTemplateRow) => void;
	onRemove: (row: IHookTemplateRow) => void;
}

export const HookSettingsTable: React.FC<IHookSettingsTableProps> = ({
	tableName,
	rows,
	templates,
	disabled = false,
	onReorder,
	onTemplateChange,
	onEdit,
	onRemove,
}) => {
	const allColumns: IColumn[] = [
		{
			value: "template",
			label: "Template",
			mandatory: true,
			defaultWidth: 360,
			minWidth: 240,
		},
		{
			value: "actions",
			label: "Actions",
			mandatory: true,
			defaultWidth: 220,
			minWidth: 180,
		},
	];

	const defaultColumns = allColumns.map((column) => column.value);
	const { selectedColumns, saveColumns } = useTableColumns(
		tableName,
		defaultColumns,
	);
	const emptySelection = React.useMemo(() => new Set<string>(), []);
	const templateOptions = React.useMemo(
		() =>
			(templates || []).map((template) => ({
				value: String(template.id || ""),
				label: String(template.name || ""),
			})),
		[templates],
	);

	function renderCell(column: IColumn, row: IHookTemplateRow) {
		if (column.value === "template") {
			return (
				<SelectOptionColumnCell
					value={row.templateId}
					options={templateOptions}
					disabled={disabled}
					placeholder="Select template..."
					onChange={(nextValue) => onTemplateChange(row, nextValue)}
				/>
			);
		}
		if (column.value === "actions") {
			return (
				<CrudActionsColumnCell
					disabled={disabled}
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
			renderSelectHeader={() => <span className="text-muted">Drag</span>}
			renderSelectCell={() => (
				<span className="text-muted" title="Drag to reorder">
					<Icon icon={faExchange} />
				</span>
			)}
			renderCell={renderCell}
		/>
	);
};
