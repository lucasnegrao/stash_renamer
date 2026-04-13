import {
  loadFromLocalStorage,
  saveToLocalStorage,
} from "../services/browserStorage";
const PluginApi = window.PluginApi;
const React = PluginApi.React;
const { useMemo, useState } = React;

const STORAGE_PREFIX = "stash_renamer_table_columns";

export const useTableColumns = (
  tableName: string,
  defaultColumns: string[]
) => {
  const storageKey = `${STORAGE_PREFIX}:${tableName}`;

  const initialColumns = useMemo(() => {
    const parsed = loadFromLocalStorage<unknown>(storageKey, defaultColumns);
    if (!Array.isArray(parsed)) return defaultColumns;
    const cols = parsed.map((v) => String(v)).filter((v) => v.trim().length > 0);
    return cols.length > 0 ? cols : defaultColumns;
  }, [defaultColumns, storageKey]);

  const [selectedColumns, setSelectedColumns] = useState<string[]>(initialColumns);

  function saveColumns(updatedColumns: string[]) {
    const normalized = updatedColumns
      .map((v) => String(v))
      .filter((v) => v.trim().length > 0);
    const next = normalized.length > 0 ? normalized : defaultColumns;
    setSelectedColumns(next);
    saveToLocalStorage(storageKey, next);
  }

  return { selectedColumns, saveColumns };
};
