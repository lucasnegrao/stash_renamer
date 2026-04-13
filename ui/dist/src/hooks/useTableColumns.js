"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useTableColumns = void 0;
const PluginApi = window.PluginApi;
const { useConfiguration, useConfigureUI } = PluginApi.utils.StashService;
const useTableColumns = (tableName, defaultColumns) => {
    var _a, _b;
    const Toast = PluginApi.hooks.useToast();
    const { configuration } = useConfiguration();
    const [saveUI] = useConfigureUI();
    const ui = configuration === null || configuration === void 0 ? void 0 : configuration.ui;
    const selectedColumns = (_b = (_a = ui === null || ui === void 0 ? void 0 : ui.tableColumns) === null || _a === void 0 ? void 0 : _a[tableName]) !== null && _b !== void 0 ? _b : defaultColumns;
    async function saveColumns(updatedColumns) {
        try {
            await saveUI({
                variables: {
                    input: {
                        ...ui,
                        tableColumns: {
                            ...ui === null || ui === void 0 ? void 0 : ui.tableColumns,
                            [tableName]: updatedColumns,
                        },
                    },
                },
            });
        }
        catch (e) {
            Toast.error(e);
        }
    }
    return { selectedColumns, saveColumns };
};
exports.useTableColumns = useTableColumns;
//# sourceMappingURL=useTableColumns.js.map