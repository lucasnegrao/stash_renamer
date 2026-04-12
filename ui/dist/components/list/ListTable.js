"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListTable = exports.ColumnSelector = void 0;
const react_1 = __importStar(require("react"));
// import { CheckBoxSelect } from "../Shared/Select";
const classnames_1 = __importDefault(require("classnames"));
const PluginApi = window.PluginApi;
const { Table, Form } = PluginApi.libraries.Bootstrap;
const { CheckBoxSelect } = PluginApi.libraries.ReactSelect;
const ColumnSelector = ({ selected, allColumns, setSelected }) => {
    const disableOptions = (0, react_1.useMemo)(() => {
        return allColumns.map((col) => {
            return {
                ...col,
                isDisabled: col.mandatory,
            };
        });
    }, [allColumns]);
    const selectedColumns = (0, react_1.useMemo)(() => {
        return disableOptions.filter((col) => selected.includes(col.value));
    }, [selected, disableOptions]);
    return (react_1.default.createElement("h1", null, " podrao")
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
    const visibleColumns = (0, react_1.useMemo)(() => {
        return allColumns.filter((col) => col.mandatory || columns.includes(col.value));
    }, [columns, allColumns]);
    const renderObjectRow = (item, index) => {
        let shiftKey = false;
        return (react_1.default.createElement("tr", { key: item.id },
            react_1.default.createElement("td", { className: "select-col" },
                react_1.default.createElement("label", null,
                    react_1.default.createElement(Form.Control, { type: "checkbox", checked: selectedIds.has(item.id), onChange: () => onSelectChange(item.id, !selectedIds.has(item.id), shiftKey), onClick: (event) => {
                            shiftKey = event.shiftKey;
                            event.stopPropagation();
                        } }))),
            visibleColumns.map((column) => (react_1.default.createElement("td", { key: column.value, className: `${column.value}-data` }, renderCell(column, item, index))))));
    };
    const columnHeaders = (0, react_1.useMemo)(() => {
        return visibleColumns.map((column) => (react_1.default.createElement("th", { key: column.value, className: `${column.value}-head` }, column.label)));
    }, [visibleColumns]);
    return (react_1.default.createElement("div", { className: (0, classnames_1.default)("table-list", className) },
        react_1.default.createElement(Table, { striped: true, bordered: true },
            react_1.default.createElement("thead", null,
                react_1.default.createElement("tr", null,
                    react_1.default.createElement("th", { className: "select-col" },
                        react_1.default.createElement("div", { className: "d-inline-block", "data-toggle": "popover", "data-trigger": "focus" },
                            react_1.default.createElement(exports.ColumnSelector, { allColumns: allColumns, selected: columns, setSelected: setColumns }))),
                    columnHeaders),
                react_1.default.createElement("tr", null,
                    react_1.default.createElement("th", { className: "border-row", colSpan: 100 }))),
            react_1.default.createElement("tbody", null, items.map(renderObjectRow)))));
};
exports.ListTable = ListTable;
//# sourceMappingURL=ListTable.js.map