import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMemo } from "react";
// import { CheckBoxSelect } from "../Shared/Select";
import cx from "classnames";
const PluginApi = window.PluginApi;
const { Table, Form } = PluginApi.libraries.Bootstrap;
const { CheckBoxSelect } = PluginApi.libraries.ReactSelect;
export const ColumnSelector = ({ selected, allColumns, setSelected }) => {
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
    return (_jsx("h1", { children: " podrao" })
    // <CheckBoxSelect
    //   options={disableOptions}
    //   selectedOptions={selectedColumns}
    //   onChange={(v) => {
    //     setSelected(v.map((col) => col.value));
    //   }}
    // />
    );
};
export const ListTable = (props) => {
    const { className, items, columns, setColumns, allColumns, selectedIds, onSelectChange, renderCell, } = props;
    const visibleColumns = useMemo(() => {
        return allColumns.filter((col) => col.mandatory || columns.includes(col.value));
    }, [columns, allColumns]);
    const renderObjectRow = (item, index) => {
        let shiftKey = false;
        return (_jsxs("tr", { children: [_jsx("td", { className: "select-col", children: _jsx("label", { children: _jsx(Form.Control, { type: "checkbox", checked: selectedIds.has(item.id), onChange: () => onSelectChange(item.id, !selectedIds.has(item.id), shiftKey), onClick: (event) => {
                                shiftKey = event.shiftKey;
                                event.stopPropagation();
                            } }) }) }), visibleColumns.map((column) => (_jsx("td", { className: `${column.value}-data`, children: renderCell(column, item, index) }, column.value)))] }, item.id));
    };
    const columnHeaders = useMemo(() => {
        return visibleColumns.map((column) => (_jsx("th", { className: `${column.value}-head`, children: column.label }, column.value)));
    }, [visibleColumns]);
    return (_jsx("div", { className: cx("table-list", className), children: _jsxs(Table, { striped: true, bordered: true, children: [_jsxs("thead", { children: [_jsxs("tr", { children: [_jsx("th", { className: "select-col", children: _jsx("div", { className: "d-inline-block", "data-toggle": "popover", "data-trigger": "focus", children: _jsx(ColumnSelector, { allColumns: allColumns, selected: columns, setSelected: setColumns }) }) }), columnHeaders] }), _jsx("tr", { children: _jsx("th", { className: "border-row", colSpan: 100 }) })] }), _jsx("tbody", { children: items.map(renderObjectRow) })] }) }));
};
//# sourceMappingURL=ListTable.js.map