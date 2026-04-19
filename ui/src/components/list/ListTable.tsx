import { CheckBoxSelect } from "../shared/CheckBoxSelect";
import cx from "classnames";
import {
	loadFromLocalStorage,
	saveToLocalStorage,
} from "../../services/browserStorage";
const PluginApi = window.PluginApi;
const { Table, Form } = PluginApi.libraries.Bootstrap;
const React = PluginApi.React;
const { useMemo, useState, useRef, useEffect, useLayoutEffect } = React;
export interface IColumn {
	label: string;
	value: string;
	mandatory?: boolean;
	resizable?: boolean;
	defaultWidth?: number;
	minWidth?: number;
	multiline?: boolean;
	maxLines?: number;
}

export const ColumnSelector: React.FC<{
	selected: string[];
	allColumns: IColumn[];
	setSelected: (selected: string[]) => void;
}> = ({ selected, allColumns, setSelected }) => {
	const disableOptions = useMemo(() => {
		return allColumns.map((col) => {
			return {
				...col,
				isDisabled: col.mandatory,
			};
		});
	}, [allColumns]);

	const selectedColumns = useMemo(() => {
		return disableOptions.filter((col) => selected.includes(col.value));
	}, [selected, disableOptions]);

	return (
		<CheckBoxSelect
			options={disableOptions}
			selectedOptions={selectedColumns}
			onChange={(v) => {
				setSelected(v.map((col: any) => col.value));
			}}
		/>
	);
};

interface IListTableProps<T> {
	tableName: string;
	className?: string;
	items: T[];
	columns: string[];
	setColumns: (columns: string[]) => void;
	allColumns: IColumn[];
	selectedIds: Set<string>;
	onSelectChange: (id: string, selected: boolean, shiftKey: boolean) => void;
	renderCell: (column: IColumn, item: T, index: number) => React.ReactNode;
	isRowSelectable?: (item: T, index: number) => boolean;
	renderSelectHeader?: () => React.ReactNode;
	renderSelectCell?: (
		item: T,
		index: number,
		ctx: {
			selected: boolean;
			rowSelectable: boolean;
			onToggle: (nextSelected: boolean, shiftKey: boolean) => void;
		},
	) => React.ReactNode;
}

export const ListTable = <T extends { id: string }>(
	props: IListTableProps<T>,
) => {
	const {
		tableName,
		className,
		items,
		columns,
		setColumns,
		allColumns,
		selectedIds,
		onSelectChange,
		renderCell,
		isRowSelectable,
		renderSelectHeader,
		renderSelectCell,
	} = props;

	const allColumnsByValue = useMemo(
		() => Object.fromEntries(allColumns.map((col) => [col.value, col])),
		[allColumns],
	);
	const visibleColumns = useMemo(() => {
		const selectedOrdered = columns
			.map((value) => allColumnsByValue[value])
			.filter((col): col is IColumn => Boolean(col));
		const selectedSet = new Set(selectedOrdered.map((col) => col.value));
		const mandatoryMissing = allColumns.filter(
			(col) => col.mandatory && !selectedSet.has(col.value),
		);
		return [...selectedOrdered, ...mandatoryMissing];
	}, [columns, allColumns, allColumnsByValue]);
	const widthStorageKey = `table_widths:${tableName}`;
	const initialWidths = useMemo(
		() => loadFromLocalStorage<Record<string, number>>(widthStorageKey, {}),
		[widthStorageKey],
	);
	const [columnWidths, setColumnWidths] =
		useState<Record<string, number>>(initialWidths);
	const [draggingColumnValue, setDraggingColumnValue] = useState<string | null>(
		null,
	);
	const resizeRef = useRef<{
		column: string;
		startX: number;
		startWidth: number;
	} | null>(null);
	const headerLabelRefs = useRef<Record<string, HTMLSpanElement | null>>({});
	const firstRowCellRefs = useRef<Record<string, HTMLTableCellElement | null>>(
		{},
	);

	const MIN_COL_WIDTH = 80;
	const SELECT_COL_WIDTH = 52;
	const DEFAULT_MULTILINE_LINES = 3;
	const visibleColumnByValue = useMemo(
		() => Object.fromEntries(visibleColumns.map((c) => [c.value, c])),
		[visibleColumns],
	);

	function getColumnMinWidth(column: IColumn | undefined): number {
		const customMin = column?.minWidth ?? 0;
		return Math.max(MIN_COL_WIDTH, customMin);
	}

	function getColumnWidth(column: IColumn): number {
		const min = getColumnMinWidth(column);
		const stored = columnWidths[column.value];
		if (typeof stored === "number") {
			return Math.max(min, stored);
		}
		if (typeof column.defaultWidth === "number") {
			return Math.max(min, column.defaultWidth);
		}
		return min;
	}

	function startResize(
		event: React.MouseEvent<HTMLDivElement, MouseEvent>,
		columnValue: string,
	) {
		event.preventDefault();
		event.stopPropagation();

		const th = (event.currentTarget as HTMLElement).closest(
			"th",
		) as HTMLElement | null;
		const currentWidth = th?.getBoundingClientRect().width ?? MIN_COL_WIDTH;

		resizeRef.current = {
			column: columnValue,
			startX: event.clientX,
			startWidth: currentWidth,
		};

		const onMouseMove = (e: MouseEvent) => {
			const active = resizeRef.current;
			if (!active) return;
			const delta = e.clientX - active.startX;
			const activeColumn = visibleColumnByValue[active.column];
			const min = getColumnMinWidth(activeColumn);
			const nextWidth = Math.max(min, Math.round(active.startWidth + delta));
			setColumnWidths((prev) => {
				if (prev[active.column] === nextWidth) return prev;
				return { ...prev, [active.column]: nextWidth };
			});
		};

		const onMouseUp = () => {
			resizeRef.current = null;
			window.removeEventListener("mousemove", onMouseMove);
			window.removeEventListener("mouseup", onMouseUp);
		};

		window.addEventListener("mousemove", onMouseMove);
		window.addEventListener("mouseup", onMouseUp);
	}

	function reorderSelectedColumns(sourceValue: string, targetValue: string) {
		if (sourceValue === targetValue) return;
		const sourceIndex = columns.indexOf(sourceValue);
		const targetIndex = columns.indexOf(targetValue);
		if (sourceIndex < 0 || targetIndex < 0) return;

		const next = [...columns];
		const [moved] = next.splice(sourceIndex, 1);
		next.splice(targetIndex, 0, moved);
		setColumns(next);
	}

	useEffect(() => {
		saveToLocalStorage(widthStorageKey, columnWidths);
	}, [columnWidths, widthStorageKey]);

	useLayoutEffect(() => {
		setColumnWidths((prev) => {
			const next = { ...prev };
			let changed = false;
			visibleColumns.forEach((column) => {
				const min = getColumnMinWidth(column);
				if (typeof next[column.value] === "number") {
					const clamped = Math.max(min, next[column.value]);
					if (clamped !== next[column.value]) {
						next[column.value] = clamped;
						changed = true;
					}
					return;
				}

				if (typeof column.defaultWidth === "number") {
					next[column.value] = Math.max(min, column.defaultWidth);
					changed = true;
					return;
				}

				const el = headerLabelRefs.current[column.value];
				const headerMeasured = el?.scrollWidth ?? 0;
				const firstCell = firstRowCellRefs.current[column.value];
				const firstCellMeasured = firstCell?.scrollWidth ?? 0;
				const measured =
					column.resizable === false
						? Math.max(headerMeasured, firstCellMeasured)
						: headerMeasured;
				const desired = Math.max(min, Math.ceil(measured + 44));
				next[column.value] = desired;
				changed = true;
			});
			return changed ? next : prev;
		});
	}, [visibleColumns, items]);

	const baseColumnWidths = useMemo(() => {
		const out: Record<string, number> = {};
		visibleColumns.forEach((column) => {
			out[column.value] = getColumnWidth(column);
		});
		return out;
	}, [visibleColumns, columnWidths]);

	const effectiveColumnWidths = useMemo(() => {
		return { ...baseColumnWidths };
	}, [baseColumnWidths]);

	const renderObjectRow = (item: T, index: number) => {
		let shiftKey = false;
		const rowSelectable = isRowSelectable ? isRowSelectable(item, index) : true;
		const selected = selectedIds.has(item.id);
		const onToggle = (nextSelected: boolean, nextShiftKey = false) =>
			onSelectChange(item.id, nextSelected, nextShiftKey);

		return (
			<tr key={item.id}>
				<td className="select-col">
					{renderSelectCell ? (
						renderSelectCell(item, index, {
							selected,
							rowSelectable,
							onToggle,
						})
					) : (
						<label>
							<Form.Control
								type="checkbox"
								checked={selected}
								disabled={!rowSelectable}
								onChange={() => onSelectChange(item.id, !selected, shiftKey)}
								onClick={(
									event: React.MouseEvent<HTMLInputElement, MouseEvent>,
								) => {
									shiftKey = event.shiftKey;
									event.stopPropagation();
								}}
							/>
						</label>
					)}
				</td>

				{visibleColumns.map((column) => (
					<td
						key={column.value}
						className={`${column.value}-data`}
						style={{
							width: `${effectiveColumnWidths[column.value] ?? MIN_COL_WIDTH}px`,
							minWidth: `${effectiveColumnWidths[column.value] ?? MIN_COL_WIDTH}px`,
						}}
						ref={
							index === 0
								? (el: HTMLTableCellElement | null) => {
										firstRowCellRefs.current[column.value] = el;
									}
								: undefined
						}
					>
						<div
							className="table-cell-content h-100"
							style={
								column.multiline === false
									? {
											overflow: "auto",
											whiteSpace: "nowrap",
											minWidth: 0,
										}
									: {
											overflow: "auto",
											whiteSpace: "normal",
											overflowWrap: "break-word",
											display: "-webkit-box",
											WebkitBoxOrient: "vertical",
											height: "100%",
											// WebkitLineClamp:
											// 	column.maxLines ?? DEFAULT_MULTILINE_LINES,
											minWidth: 0,
										}
							}
						>
							{renderCell(column, item, index)}
						</div>
					</td>
				))}
				<td className="phantom-col"></td>
			</tr>
		);
	};

	const columnHeaders = useMemo(() => {
		return visibleColumns.map((column) => (
			<th
				key={column.value}
				className={`${column.value}-head`}
				draggable={columns.includes(column.value)}
				onDragStart={(event) => {
					if (!columns.includes(column.value)) return;
					setDraggingColumnValue(column.value);
					event.dataTransfer.effectAllowed = "move";
					event.dataTransfer.setData("text/plain", column.value);
				}}
				onDragEnd={() => {
					setDraggingColumnValue(null);
				}}
				onDragOver={(event) => {
					if (!draggingColumnValue || draggingColumnValue === column.value)
						return;
					event.preventDefault();
					event.dataTransfer.dropEffect = "move";
				}}
				onDrop={(event) => {
					event.preventDefault();
					const source =
						draggingColumnValue || event.dataTransfer.getData("text/plain");
					setDraggingColumnValue(null);
					if (!source) return;
					reorderSelectedColumns(source, column.value);
				}}
				style={{
					width: `${effectiveColumnWidths[column.value] ?? MIN_COL_WIDTH}px`,
					minWidth: `${effectiveColumnWidths[column.value] ?? MIN_COL_WIDTH}px`,
					position: "relative",
					cursor: columns.includes(column.value) ? "grab" : undefined,
					opacity:
						draggingColumnValue && draggingColumnValue === column.value
							? 0.65
							: 1,
				}}
			>
				<span
					ref={(el: HTMLSpanElement | null) => {
						headerLabelRefs.current[column.value] = el;
					}}
				>
					{column.label}
				</span>
				{column.resizable === false ? null : (
					<div
						onMouseDown={(e) => startResize(e, column.value)}
						style={{
							position: "absolute",
							top: 0,
							right: 0,
							width: "8px",
							height: "100%",
							cursor: "col-resize",
							userSelect: "none",
						}}
					/>
				)}
			</th>
		));
	}, [visibleColumns, effectiveColumnWidths, columns, draggingColumnValue]);

	return (
		<div
			style={{
				width: "100%",
				maxWidth: "100%",
				height: "100%",
				overflow: "auto",
				minWidth: 0,
			}}
		>
			<Table
				striped
				bordered
				style={{
					tableLayout: "fixed",
					width: "max-content",
					minWidth: "100%",
				}}
				className="stash-renamer-table"
			>
				<colgroup>
					<col
						style={{
							width: `${SELECT_COL_WIDTH}px`,
							minWidth: `${SELECT_COL_WIDTH}px`,
						}}
					/>
					{visibleColumns.map((column) => (
						<col
							key={column.value}
							style={{
								width: `${effectiveColumnWidths[column.value] ?? MIN_COL_WIDTH}px`,
								minWidth: `${effectiveColumnWidths[column.value] ?? MIN_COL_WIDTH}px`,
							}}
						/>
					))}
					<col style={{ width: "auto" }} />
				</colgroup>
				<thead>
					<tr>
						<th
							className="select-col"
							style={{
								width: `${SELECT_COL_WIDTH}px`,
								minWidth: `${SELECT_COL_WIDTH}px`,
							}}
						>
							{renderSelectHeader ? (
								renderSelectHeader()
							) : (
								<div
									className="d-inline-block"
									data-toggle="popover"
									data-trigger="focus"
								>
									<ColumnSelector
										allColumns={allColumns}
										selected={columns}
										setSelected={setColumns}
									/>
								</div>
							)}
						</th>

						{columnHeaders}
						<th
							className="phantom-col"
							style={{ width: "auto", padding: 0, border: "none" }}
						></th>
					</tr>
					<tr>
						<th className="border-row" colSpan={100}></th>
					</tr>
				</thead>
				<tbody>{items.map(renderObjectRow)}</tbody>
			</Table>
		</div>
	);
};
