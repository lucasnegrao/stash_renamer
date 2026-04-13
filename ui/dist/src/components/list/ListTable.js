"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListTable = exports.ColumnSelector = void 0;
// import { CheckBoxSelect } from "../Shared/Select";
const classnames_1 = __importDefault(require("classnames"));
const PluginApi = window.PluginApi;
const { Table, Form } = PluginApi.libraries.Bootstrap;
const { CheckBoxSelect } = PluginApi.libraries.ReactSelect;
const React = PluginApi.React;
const useMemo = React.useMemo;
const ColumnSelector = ({ selected, allColumns, setSelected }) => {
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
    return (React.createElement("h1", null, " podrao")
    // <CheckBoxSelect
    //   options={disableOptions}
    //   selectedOptions={selectedColumns}
    //   onChange={(v) => {
    //     setSelected(v.map((col) => col.value));
    //   }}
    // />
    );
};
exports.ColumnSelector = ColumnSelector;
const ListTable = (props) => {
    const { className, items, columns, setColumns, allColumns, selectedIds, onSelectChange, renderCell, } = props;
    const visibleColumns = useMemo(() => {
        return allColumns.filter((col) => col.mandatory || columns.includes(col.value));
    }, [columns, allColumns]);
    const renderObjectRow = (item, index) => {
        let shiftKey = false;
        return (React.createElement("tr", { key: item.id },
            React.createElement("td", { className: "select-col" },
                React.createElement("label", null,
                    React.createElement(Form.Control, { type: "checkbox", checked: selectedIds.has(item.id), onChange: () => onSelectChange(item.id, !selectedIds.has(item.id), shiftKey), onClick: (event) => {
                            shiftKey = event.shiftKey;
                            event.stopPropagation();
                        } }))),
            visibleColumns.map((column) => (React.createElement("td", { key: column.value, className: `${column.value}-data` }, renderCell(column, item, index))))));
    };
    const columnHeaders = useMemo(() => {
        return visibleColumns.map((column) => (React.createElement("th", { key: column.value, className: `${column.value}-head` }, column.label)));
    }, [visibleColumns]);
    return (React.createElement("div", { className: (0, classnames_1.default)("table-list", className) },
        React.createElement(Table, { striped: true, bordered: true },
            React.createElement("thead", null,
                React.createElement("tr", null,
                    React.createElement("th", { className: "select-col" },
                        React.createElement("div", { className: "d-inline-block", "data-toggle": "popover", "data-trigger": "focus" },
                            React.createElement(exports.ColumnSelector, { allColumns: allColumns, selected: columns, setSelected: setColumns }))),
                    columnHeaders),
                React.createElement("tr", null,
                    React.createElement("th", { className: "border-row", colSpan: 100 }))),
            React.createElement("tbody", null, items.map(renderObjectRow)))));
};
exports.ListTable = ListTable;
//# sourceMappingURL=ListTable.js.map