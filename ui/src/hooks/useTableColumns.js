const PluginApi = window.PluginApi;
const { useConfigurationContext, useConfigureUI } = PluginApi.utils.StashService;
export const useTableColumns = (tableName, defaultColumns) => {
    var _a, _b;
    const Toast = PluginApi.hooks.useToast();
    const { configuration } = useConfigurationContext();
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
//# sourceMappingURL=useTableColumns.js.map