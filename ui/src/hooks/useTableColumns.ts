  const PluginApi = (window as any).PluginApi;

const { useConfigurationContext, useConfigureUI } = PluginApi.utils.StashService; 

export const useTableColumns = (
  tableName: string,
  defaultColumns: string[]
) => {
  const Toast = PluginApi.hooks.useToast();

  const { configuration } = useConfigurationContext();
  const [saveUI] = useConfigureUI();

  const ui = configuration?.ui;

  const selectedColumns = ui?.tableColumns?.[tableName] ?? defaultColumns;

  async function saveColumns(updatedColumns: string[]) {
    try {
      await saveUI({
        variables: {
          input: {
            ...ui,
            tableColumns: {
              ...ui?.tableColumns,
              [tableName]: updatedColumns,
            },
          },
        },
      });
    } catch (e) {
      Toast.error(e);
    }
  }

  return { selectedColumns, saveColumns };
};
