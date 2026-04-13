import {
  deleteTemplateFromDatabase,
  fetchJobById,
  fetchOperationBatches,
  subscribeJobUpdates,
  fetchSavedTemplates,
  previewRenameScenes,
  queueRenameTask,
  runDryRunForFilteredScenes,
  saveTemplateToDatabase,
  updateTemplateInDatabase,
  type IRenamerTemplate,
  type IScenePreviewResult,
} from "../services/sceneRenamerApi";
import { faCopy, faSave, faTrash } from "@fortawesome/free-solid-svg-icons";
import {
  loadFromLocalStorage,
  saveToLocalStorage,
} from "../services/browserStorage";
import {
  getCriteriaState,
  getSceneListForPreviewState,
  getScenePreviewByIdState,
  getSelectedSceneIdsState,
  requestResultsFocus,
  setActiveTabState,
  setScenePreviewByIdState,
  subscribeSceneRuntimeState,
} from "../services/renamerRuntimeState";
import { TemplateSaveAsModal } from "../components/TemplateSaveAsModal";
import Input from "react-select/dist/declarations/src/components/Input";

const PluginApi = window.PluginApi;
const React = PluginApi.React;
const ReactDOM = PluginApi.ReactDOM;
const { Button, ButtonGroup, Dropdown, Form, Spinner, Modal, FormControl, InputGroup } = PluginApi.libraries.Bootstrap;
const { Icon } = PluginApi.components;
const TEMPLATE_STORAGE_KEY = "editor:filename_template";
const PATH_TEMPLATE_STORAGE_KEY = "editor:path_template";

export const RenamerEditor: React.FC = () => {
  const componentsToLoad = [
    PluginApi.loadableComponents.Scenes,
    PluginApi.loadableComponents.Scene,
    PluginApi.loadableComponents.SceneList,
    PluginApi.loadableComponents.SceneQueryModal,
  ];
  const componentsLoading = PluginApi.hooks.useLoadComponents(componentsToLoad);

  const { LoadingIndicator, FilteredSceneList } = PluginApi.components;

  const [template, setTemplate] = React.useState(() =>
    loadFromLocalStorage<string>(
      TEMPLATE_STORAGE_KEY,
      "$scene.studio.name - $scene.date - $scene.title",
    ),
  );
  const [pathTemplate, setPathTemplate] = React.useState(() =>
    loadFromLocalStorage<string>(PATH_TEMPLATE_STORAGE_KEY, ""),
  );
  const [savedTemplates, setSavedTemplates] = React.useState<IRenamerTemplate[]>([]);
  const [selectedSavedTemplateId, setSelectedSavedTemplateId] = React.useState("");
  const [showSaveAsModal, setShowSaveAsModal] = React.useState(false);
  const [isSavingTemplate, setIsSavingTemplate] = React.useState(false);
  const [isDeletingTemplate, setIsDeletingTemplate] = React.useState(false);
  const [livePreview, setLivePreview] = React.useState(false);
  const [status, setStatus] = React.useState("");
  const [isActionBusy, setIsActionBusy] = React.useState(false);
  const [activeAction, setActiveAction] = React.useState<"" | "dry_run" | "rename">("");
  const [isDryRunReady, setIsDryRunReady] = React.useState(false);
  const [showRenameConfirm, setShowRenameConfirm] = React.useState(false);
  const [taskProgress, setTaskProgress] = React.useState(0);
  const [taskProgressText, setTaskProgressText] = React.useState("");
  const [previewBusyCount, setPreviewBusyCount] = React.useState(0);
  const [debouncedTemplate, setDebouncedTemplate] = React.useState(template);
  const [debouncedPathTemplate, setDebouncedPathTemplate] = React.useState(pathTemplate);
  const previewRequestRef = React.useRef(0);
  const activeTaskCleanupRef = React.useRef<(() => void) | null>(null);
  const templateInputRef = React.useRef<HTMLInputElement | null>(null);
  const pathTemplateInputRef = React.useRef<HTMLInputElement | null>(null);

  React.useEffect(() => {
    const timeout = window.setTimeout(() => setDebouncedTemplate(template), 350);
    return () => window.clearTimeout(timeout);
  }, [template]);

  React.useEffect(() => {
    const timeout = window.setTimeout(() => setDebouncedPathTemplate(pathTemplate), 350);
    return () => window.clearTimeout(timeout);
  }, [pathTemplate]);

  React.useEffect(() => {
    saveToLocalStorage(TEMPLATE_STORAGE_KEY, template);
    setIsDryRunReady(false);
  }, [template]);

  React.useEffect(() => {
    saveToLocalStorage(PATH_TEMPLATE_STORAGE_KEY, pathTemplate);
    setIsDryRunReady(false);
  }, [pathTemplate]);

  const getExcludedSceneIds = () => Array.from(getSelectedSceneIdsState());

  const buildExcludedPreviewEntries = () => {
    const out: Record<string, { status: "success" | "warn" | "fail"; statusText: string; newPath: string }> = {};
    getExcludedSceneIds().forEach((id) => {
      out[String(id)] = {
        status: "fail",
        statusText: "Excluded from batch by selection",
        newPath: "-",
      };
    });
    return out;
  };

  async function loadSavedTemplates(selectFirst = false, preferredId?: string) {
    try {
      const rows = await fetchSavedTemplates();
      setSavedTemplates(rows);
      const keepId = String(preferredId || selectedSavedTemplateId || "");
      const kept = keepId ? rows.find((row) => String(row.id) === keepId) : null;
      if (kept) {
        setSelectedSavedTemplateId(String(kept.id));
        return;
      }
      if (selectFirst && rows.length > 0) {
        setSelectedSavedTemplateId(String(rows[0].id));
        return;
      }
      if (rows.length === 0) {
        setSelectedSavedTemplateId("");
      }
    } catch (e: any) {
      setStatus(`Error loading saved templates: ${e?.message || String(e)}`);
    }
  }

  React.useEffect(() => {
    loadSavedTemplates(true);
  }, []);

  const applyTemplateById = (templateId: string) => {
    const selected = savedTemplates.find((t) => String(t.id) === String(templateId));
    if (!selected) return;
    setTemplate(String(selected.filename_template || ""));
    setPathTemplate(String(selected.path_template || ""));
    setSelectedSavedTemplateId(String(selected.id));
    setStatus(`Loaded template "${selected.name}"`);
  };

  const saveAsCurrentTemplateToDatabase = async (name: string) => {
    const trimmedName = String(name || "").trim();
    if (!trimmedName) {
      setStatus("Template name is required.");
      return;
    }
    setIsSavingTemplate(true);
    try {
      const saved = await saveTemplateToDatabase({
        name: trimmedName,
        filenameTemplate: template,
        pathTemplate,
      });
      await loadSavedTemplates(false, String(saved?.id || ""));
      if (saved?.id) setSelectedSavedTemplateId(String(saved.id));
      setShowSaveAsModal(false);
      setStatus(saved ? `Saved template "${saved.name}"` : "Template saved.");
    } catch (e: any) {
      setStatus(`Error saving template: ${e?.message || String(e)}`);
    } finally {
      setIsSavingTemplate(false);
    }
  };

  const saveSelectedTemplateToDatabase = async () => {
    const selected = savedTemplates.find((t) => String(t.id) === String(selectedSavedTemplateId));
    if (!selected) {
      setStatus("Select a saved template first.");
      return;
    }
    setIsSavingTemplate(true);
    try {
      const updated = await updateTemplateInDatabase({
        id: String(selected.id),
        name: String(selected.name || ""),
        filenameTemplate: template,
        pathTemplate,
      });
      await loadSavedTemplates(false, String(updated?.id || selected.id));
      setStatus(updated ? `Updated template "${updated.name}"` : "Template updated.");
    } catch (e: any) {
      setStatus(`Error updating template: ${e?.message || String(e)}`);
    } finally {
      setIsSavingTemplate(false);
    }
  };

  const deleteSelectedTemplate = async () => {
    const selected = savedTemplates.find((t) => String(t.id) === String(selectedSavedTemplateId));
    if (!selected) {
      setStatus("Select a saved template first.");
      return;
    }
    setIsDeletingTemplate(true);
    try {
      const deleted = await deleteTemplateFromDatabase(String(selected.id));
      if (!deleted) {
        setStatus(`Template "${selected.name}" could not be deleted.`);
        return;
      }
      await loadSavedTemplates(false);
      setSelectedSavedTemplateId("");
      setStatus(`Deleted template "${selected.name}".`);
    } catch (e: any) {
      setStatus(`Error deleting template: ${e?.message || String(e)}`);
    } finally {
      setIsDeletingTemplate(false);
    }
  };

  React.useEffect(() => {
    const styleId = "test-page-hide-controls";
    if (document.getElementById(styleId)) return;
    const style = document.createElement("style");
    style.id = styleId;
    style.textContent = `div.clearable-input-group.search-term-input, div.list-operations,
div.saved-filter-dropdown.dropdown.btn-group,
#root > div.main.container-fluid.apple > div > div:nth-child(2) > div:nth-child(3) > div > div > div.sidebar-pane-content > div.filtered-list-toolbar.btn-toolbar > div:nth-child(6),
div.item-list-container.scene-list > div > div.sidebar-pane-content > div.filtered-list-toolbar.btn-toolbar > div:nth-child(6) > button:nth-child(4),
#root > div.main.container-fluid.apple > div > div:nth-child(2) > div:nth-child(3) > div > div > div.sidebar-pane-content > div.filtered-list-toolbar.btn-toolbar > div.zoom-slider-container,
div.item-list-container.scene-list > div > div.sidebar-pane-content > div.pagination-index-container > div
{ display: none !important; }`;
    document.head.appendChild(style);
  }, []);

  const joinPath = (dir?: string, file?: string) => {
    const safeDir = String(dir || "").trim();
    const safeFile = String(file || "").trim();
    if (!safeDir) return safeFile;
    if (!safeFile) return safeDir;
    const normalizedDir = safeDir.replace(/[\\/]+$/, "");
    const normalizedFile = safeFile.replace(/[\\/]+$/, "");
    const pathParts = normalizedDir.split(/[\\/]/).filter(Boolean);
    const tail = pathParts.length > 0 ? pathParts[pathParts.length - 1] : "";
    if (tail.toLowerCase() === normalizedFile.toLowerCase()) {
      return normalizedDir;
    }
    const sep = normalizedDir.includes("\\") ? "\\" : "/";
    return `${normalizedDir}${sep}${normalizedFile}`;
  };

  const runPreview = async (
    templateValue: string,
    pathTemplateValue: string,
    showProgress = true,
  ) => {
    const requestId = ++previewRequestRef.current;
    setPreviewBusyCount((count) => count + 1);
    try {
      if (showProgress) setStatus("Generating preview...");
      const previewRows = await previewRenameScenes({
        template: templateValue,
        pathTemplate: pathTemplateValue,
        scenes: getSceneListForPreviewState(),
      });
      if (requestId !== previewRequestRef.current) return;

      const next: Record<string, { status: "success" | "warn" | "fail"; statusText: string; newPath: string }> = {};
      (previewRows || []).forEach((row: IScenePreviewResult) => {
        const id = String(row?.scene_id || "");
        if (!id) return;
        const rawStatus = String(row?.status || "").toLowerCase();
        const mappedStatus =
          rawStatus === "success"
            ? "success"
            : rawStatus === "warn" || rawStatus === "warning"
              ? "warn"
              : "fail";
        next[id] = {
          status: mappedStatus,
          statusText: String(row?.log || row?.error || ""),
          newPath: joinPath(row?.new_path, row?.new_filename || row?.new_name),
        };
      });
      const excluded = buildExcludedPreviewEntries();
      Object.keys(excluded).forEach((id) => {
        next[id] = excluded[id];
      });

      setScenePreviewByIdState(next);
      setStatus(`Preview ready for ${previewRows.length} scene(s) at ${new Date().toLocaleTimeString()}`);
    } catch (e: any) {
      if (requestId !== previewRequestRef.current) return;
      setStatus(`Error: ${e?.message || String(e)}`);
    } finally {
      setPreviewBusyCount((count) => Math.max(0, count - 1));
    }
  };

  const submitRenameTask = async (dryRun = false) => {
    if (activeTaskCleanupRef.current) {
      activeTaskCleanupRef.current();
      activeTaskCleanupRef.current = null;
    }
    setIsActionBusy(true);
    setActiveAction(dryRun ? "dry_run" : "rename");
    try {
      if (dryRun) {
        if (livePreview) setLivePreview(false);
        setStatus("Running dry run for all filtered scenes...");
        const previewRows = await runDryRunForFilteredScenes({
          template,
          pathTemplate,
          criteria: getCriteriaState(),
          excludedSceneIds: getExcludedSceneIds(),
        });
        const next = { ...getScenePreviewByIdState() } as Record<
          string,
          { status: "success" | "warn" | "fail"; statusText: string; newPath: string }
        >;
        (previewRows || []).forEach((row: IScenePreviewResult) => {
          const id = String((row as any)?.scene_id || "");
          if (!id) return;
          const rawStatus = String((row as any)?.status || "").toLowerCase();
          const mappedStatus =
            rawStatus === "success" || rawStatus === "pending"
              ? "success"
              : rawStatus === "warn" || rawStatus === "warning" || rawStatus === "skipped"
                ? "warn"
                : "fail";
          next[id] = {
            status: mappedStatus,
            statusText: String((row as any)?.log || (row as any)?.error || ""),
            newPath: joinPath((row as any)?.new_path, (row as any)?.new_filename || (row as any)?.new_name),
          };
        });
        const excluded = buildExcludedPreviewEntries();
        Object.keys(excluded).forEach((id) => {
          next[id] = excluded[id];
        });
        setScenePreviewByIdState(next);
        setStatus(`Dry run ready for ${previewRows.length} scene(s)`);
        setIsDryRunReady(true);
        return;
      }

      setStatus("Queueing task...");
      const jobId = await queueRenameTask({
        dryRun,
        template,
        pathTemplate,
        criteria: getCriteriaState(),
        excludedSceneIds: getExcludedSceneIds(),
      });
      if (!jobId) {
        setStatus("Queued (no job id returned)");
        return;
      }

      const toPercent = (value: any): number => {
        const n = Number(value);
        if (!Number.isFinite(n)) return 0;
        if (n <= 1) return Math.max(0, Math.min(100, Math.round(n * 100)));
        return Math.max(0, Math.min(100, Math.round(n)));
      };
      const isTerminal = (statusValue?: string | null): boolean => {
        const s = String(statusValue || "").toUpperCase();
        return s === "FINISHED" || s === "FAILED" || s === "CANCELLED";
      };

      setTaskProgress(0);
      setTaskProgressText("Starting task...");
      setStatus(`Task queued (${jobId})`);

      let done = false;
      let stopSocket: (() => void) | null = null;
      let pollTimer: number | null = null;

      const finalizeTask = async (finalStatus: string, finalError?: string | null) => {
        if (done) return;
        done = true;
        if (pollTimer != null) {
          window.clearInterval(pollTimer);
          pollTimer = null;
        }
        if (stopSocket) {
          stopSocket();
          stopSocket = null;
        }
        activeTaskCleanupRef.current = null;

        if (String(finalStatus).toUpperCase() === "FINISHED") {
          try {
            const batches = await fetchOperationBatches();
            const latestBatchId = batches.length > 0 ? String(batches[0].id) : "";
            requestResultsFocus(latestBatchId || null);
            setActiveTabState("results");
            setStatus(`Task ${jobId} finished.`);
          } catch {
            requestResultsFocus(null);
            setActiveTabState("results");
            setStatus(`Task ${jobId} finished.`);
          }
        } else {
          setStatus(
            `Task ${jobId} ended with status ${finalStatus}${finalError ? `: ${finalError}` : ""}.`,
          );
        }
        setIsActionBusy(false);
        setActiveAction("");
      };

      // Fast tasks can finish before subscription starts.
      // Preflight with findJob, and only subscribe when still non-terminal.
      try {
        const firstSnapshot = await fetchJobById(jobId);
        if (firstSnapshot) {
          const firstStatus = String(firstSnapshot.status || "RUNNING");
          const firstProgress = toPercent(firstSnapshot.progress);
          console.log("[Scene Renamer][TaskProgress][preflight]", {
            jobId,
            status: firstStatus,
            progress: firstProgress,
            error: firstSnapshot.error || null,
          });
          setTaskProgress(firstProgress);
          setTaskProgressText(
            `${firstStatus}${firstSnapshot.error ? ` - ${firstSnapshot.error}` : ""}`,
          );
          if (isTerminal(firstStatus)) {
            await finalizeTask(firstStatus, firstSnapshot.error);
            return;
          }
        }
      } catch {
        // Ignore preflight failures and continue with realtime subscription.
      }

      stopSocket = subscribeJobUpdates(jobId, {
        onUpdate: async (job) => {
          const statusText = String(job?.status || "");
          const progress = toPercent(job?.progress);
          console.log("[Scene Renamer][TaskProgress][ws]", {
            jobId,
            status: statusText,
            progress,
            error: job?.error || null,
          });
          setTaskProgress(progress);
          setTaskProgressText(`${statusText || "RUNNING"}${job?.error ? ` - ${job.error}` : ""}`);

          if (!isTerminal(statusText) || done) return;
          await finalizeTask(statusText, job?.error);
        },
        onError: async () => {
          console.warn("[Scene Renamer][TaskProgress][ws-error]", { jobId });
          if (done) return;
          try {
            const snapshot = await fetchJobById(jobId);
            const statusText = String(snapshot?.status || "RUNNING");
            setTaskProgress(toPercent(snapshot?.progress));
            setTaskProgressText(`${statusText}${snapshot?.error ? ` - ${snapshot.error}` : ""}`);
            if (!isTerminal(statusText)) return;
            await finalizeTask(statusText, snapshot?.error);
          } catch {
            // Keep waiting for websocket updates if snapshot is unavailable.
          }
        },
      });

      const pollOnce = async () => {
        if (done) return;
        try {
          const snapshot = await fetchJobById(jobId);
          if (!snapshot) return;
          const statusText = String(snapshot.status || "RUNNING");
          const progress = toPercent(snapshot.progress);
          console.log("[Scene Renamer][TaskProgress][poll]", {
            jobId,
            status: statusText,
            progress,
            error: snapshot.error || null,
          });
          setTaskProgress(progress);
          setTaskProgressText(`${statusText}${snapshot.error ? ` - ${snapshot.error}` : ""}`);
          if (isTerminal(statusText)) {
            await finalizeTask(statusText, snapshot.error);
          }
        } catch {
          // Ignore polling errors, websocket may still deliver events.
        }
      };

      pollTimer = window.setInterval(() => {
        pollOnce();
      }, 1500);

      activeTaskCleanupRef.current = () => {
        if (pollTimer != null) {
          window.clearInterval(pollTimer);
          pollTimer = null;
        }
        if (stopSocket) {
          stopSocket();
          stopSocket = null;
        }
      };

      pollOnce();
      return;
    } catch (e: any) {
      setStatus(`Error: ${e?.message || String(e)}`);
      setIsActionBusy(false);
      setActiveAction("");
    } finally {
      if (dryRun) {
        setIsActionBusy(false);
        setActiveAction("");
      }
    }
  };

  React.useEffect(() => {
    if (isActionBusy) return;
    if (!livePreview) return;
    runPreview(debouncedTemplate, debouncedPathTemplate, false);
  }, [livePreview, debouncedTemplate, debouncedPathTemplate, isActionBusy]);

  React.useEffect(() => {
    const unsub = subscribeSceneRuntimeState(() => {
      if (isActionBusy || !livePreview) return;
      runPreview(debouncedTemplate, debouncedPathTemplate, false);
    });
    return () => unsub();
  }, [livePreview, isActionBusy, debouncedTemplate, debouncedPathTemplate]);

  React.useEffect(() => {
    return () => {
      if (activeTaskCleanupRef.current) {
        activeTaskCleanupRef.current();
        activeTaskCleanupRef.current = null;
      }
    };
  }, []);

  const insertTokenInInput = (
    ref: React.RefObject<HTMLInputElement | null>,
    value: string,
    setValue: (next: string) => void,
    token: string,
  ) => {
    const input = ref.current;
    if (!input) {
      setValue(`${value}${token}`);
      return;
    }
    const start = input.selectionStart ?? value.length;
    const end = input.selectionEnd ?? start;
    const nextValue = `${value.slice(0, start)}${token}${value.slice(end)}`;
    setValue(nextValue);
    const cursor = start + token.length;
    window.requestAnimationFrame(() => {
      input.focus();
      input.setSelectionRange(cursor, cursor);
    });
  };

  const handleDropOnInput =
    (field: "filename" | "path") => (event: React.DragEvent<HTMLInputElement>) => {
      event.preventDefault();
      const token = event.dataTransfer.getData("text/plain");
      if (!token) return;
      if (field === "path") {
        insertTokenInInput(pathTemplateInputRef, pathTemplate, setPathTemplate, token);
      } else {
        insertTokenInInput(templateInputRef, template, setTemplate, token);
      }
    };

  if (componentsLoading) return <LoadingIndicator />;
  const isPreviewLoading = previewBusyCount > 0;
  const isDryRunBusy = isActionBusy && activeAction === "dry_run";
  const isRenameBusy = isActionBusy && activeAction === "rename";
  const selectedTemplate = savedTemplates.find(
    (row) => String(row.id) === String(selectedSavedTemplateId),
  );

    // const [toggleSidebarBtn, setToggleSidebarBtn] =
    //   React.useState<HTMLButtonElement | null>(null);
    // const targetRef = React.useRef<HTMLElement | null>(null);
    // const toggleBtnRef = React.useRef<HTMLButtonElement | null>(null);

    // React.useEffect(() => {
    //   const findToggleBtn = () =>
    //     document.querySelector('button[title="Toggle sidebar"]') as HTMLButtonElement | null;
    //   const apply = () => {
    //     const next = findToggleBtn();
    //     if (next !== toggleBtnRef.current) {
    //       toggleBtnRef.current = next;
    //       setToggleSidebarBtn(next);
    //     }
    //   };
    //   apply();

    //   const obs = new MutationObserver(() => apply());
    //   obs.observe(document.body, { childList: true, subtree: true });
    //   return () => obs.disconnect();
    // }, []);

    // React.useEffect(() => {
    //   if (!toggleSidebarBtn) return;
    //   const previousDisplay = toggleSidebarBtn.style.display;
    //   toggleSidebarBtn.style.display = "none";
    //   return () => {
    //     toggleSidebarBtn.style.display = previousDisplay;
    //   };
    // }, [toggleSidebarBtn]);

   
  

  return (
    <div className="position-relative">
      {isRenameBusy ? (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(0, 0, 0, 0.55)",
            zIndex: 1200,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div className="bg-dark text-light p-3 rounded" style={{ minWidth: "360px", maxWidth: "520px", width: "80%" }}>
            <div className="mb-2">Task Running</div>
            <div className="progress mb-2" style={{ height: "18px" }}>
              <div
                className="progress-bar progress-bar-striped progress-bar-animated"
                role="progressbar"
                style={{ width: `${taskProgress}%` }}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={taskProgress}
              >
                {taskProgress}%
              </div>
            </div>
            <div className="small text-muted">{taskProgressText || "Running..."}</div>
          </div>
        </div>
      ) : null}
      <Modal show={showRenameConfirm} onHide={() => setShowRenameConfirm(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Rename</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Rename will run for the current filter minus selected scenes ({getExcludedSceneIds().length} excluded).
          Continue?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowRenameConfirm(false)}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              setShowRenameConfirm(false);
              submitRenameTask(false);
            }}
          >
            Confirm Rename
          </Button>
        </Modal.Footer>
      </Modal>
      <TemplateSaveAsModal
        show={showSaveAsModal}
        initialName={
          savedTemplates.find((t) => String(t.id) === String(selectedSavedTemplateId))?.name || ""
        }
        saving={isSavingTemplate}
        onCancel={() => {
          if (isSavingTemplate) return;
          setShowSaveAsModal(false);
        }}
        onSave={saveAsCurrentTemplateToDatabase}
      />
      <div className="d-flex w-100 justify-content-end gap-2">
        <div className="w-50"></div>
        <div className="flex-grow-1 justify-content-end flex-row gap-2">

          <InputGroup className="mb-3 justify-content-end align-items-center flex-grow-1">

          <Dropdown as={ButtonGroup}>
                        <Button
              className="minimal"
              variant="secondaryr"
              title="Delete selected template"
              disabled={
                isActionBusy ||
                isSavingTemplate ||
                isDeletingTemplate ||
                !selectedSavedTemplateId
              }
              onClick={deleteSelectedTemplate}
            >
              <Icon icon={faTrash} fixedWidth />
            </Button>
            <Button
              variant="secondary"
              className="minimal"
              title="Save to selected template"
              disabled={
                isActionBusy ||
                isSavingTemplate ||
                isDeletingTemplate ||
                !selectedSavedTemplateId
              }
              onClick={saveSelectedTemplateToDatabase}
            >
              {isSavingTemplate ? (
                <Spinner animation="border" size="sm" role="status" />
              ) : (
                <Icon icon={faSave} fixedWidth />
              )}
            </Button>
            <Button
              className="minimal"
              title="Save as new template"
              disabled={isActionBusy || isSavingTemplate || isDeletingTemplate}
              onClick={() => setShowSaveAsModal(true)}
            >
              <Icon icon={faCopy} fixedWidth />
            </Button>
            <Dropdown.Toggle
              variant="secondary"
              className="text-right flex-grow-0"
              disabled={isActionBusy || isSavingTemplate || isDeletingTemplate}
            >
              {selectedTemplate
                ? `${selectedTemplate.name} (${new Date(selectedTemplate.created_at).toLocaleString()})`
                : "Select saved template..."}
            </Dropdown.Toggle>
            <Dropdown.Menu className="w-100" style={{ maxHeight: "340px", overflowY: "auto" }}>
              {savedTemplates.length === 0 ? (
                <Dropdown.Item disabled>No saved templates</Dropdown.Item>
              ) : (
                savedTemplates.map((t) => (
                  <Dropdown.Item
                    key={String(t.id)}
                    eventKey={String(t.id)}
                    active={String(t.id) === String(selectedSavedTemplateId)}
                    onSelect={(eventKey: string | null) => {
                      const selectedId = String(eventKey || "");
                      if (!selectedId) return;
                      applyTemplateById(selectedId);
                    }}
                  >
                    {`${t.name} (${new Date(t.created_at).toLocaleString()})`}
                  </Dropdown.Item>
                ))
              )}
            </Dropdown.Menu>

          </Dropdown>
</InputGroup>
<InputGroup className="mb-3">

          <FormControl
            ref={templateInputRef}
            type="text"
            className="clearable-text-field"
            value={template}
            disabled={isActionBusy}
            onChange={(e: any) => setTemplate(e.target.value)}
            onDragOver={(e: React.DragEvent<HTMLInputElement>) => e.preventDefault()}
            onDrop={handleDropOnInput("filename")}
            placeholder="$scene.studio.name - $scene.date - $scene.title"
          />
                    <InputGroup.Text             className="clearable-text-field"
>File Template</InputGroup.Text>

</InputGroup>
<InputGroup className="mb-3">

          <FormControl
            ref={pathTemplateInputRef}
            type="text"
            disabled={isActionBusy}
            placeholder="e.g., /Library/$scene.studio.name or $up/Archive/$scene.studio.name"
            value={pathTemplate}
            onInput={(e: any) => setPathTemplate(e.target.value)}
            onDragOver={(e: React.DragEvent<HTMLInputElement>) => e.preventDefault()}
            onDrop={handleDropOnInput("path")}
            className="clearable-text-field"
          />
                    <InputGroup.Text             className="clearable-text-field"
>Path Template</InputGroup.Text>

</InputGroup>
          <InputGroup className="mb-3 align-items-center w-100 d-flex justify-content-end gap-2">
                    {status ? <div className="justify-content-start flex-grow-1"><div className="w-100 h-100">{status}</div></div> : null}

                                 <Form.Check
            id="scene-renamer-live-preview"
            type="checkbox"
            label="Live preview while typing"
            checked={livePreview}
            disabled={isActionBusy}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLivePreview(e.target.checked)}
          />
           <ButtonGroup>
        {/* {toggleSidebarBtn ? (
          <button
            type="button"
            className={toggleSidebarBtn.className}
            title={toggleSidebarBtn.title || "Toggle sidebar"}
            disabled={toggleSidebarBtn.disabled || isActionBusy}
            onClick={() => toggleSidebarBtn.click()}
            dangerouslySetInnerHTML={{ __html: toggleSidebarBtn.innerHTML }}
          />
        ) : null} */}
        <Button
          variant="secondary"
          onClick={() => submitRenameTask(true)}
          disabled={isActionBusy || isPreviewLoading}
        >
          {isDryRunBusy || isPreviewLoading ? (
            <>
              <Spinner animation="border" size="sm" role="status" className="mr-1" />
              Dry run
            </>
          ) : (
            "Dry run"
          )}
        </Button>

        <Button
          variant="primary"
          onClick={() => setShowRenameConfirm(true)}
          disabled={isActionBusy || !isDryRunReady}
        >
          {isRenameBusy ? (
            <>
              <Spinner animation="border" size="sm" role="status" className="mr-1" />
              Rename
            </>
          ) : (
            "Rename"
          )}
        </Button>
      </ButtonGroup>

</InputGroup>


        </div>
      </div>
      <div style={{ width: "100%", maxWidth: "100%", minWidth: 0 }}>
        <FilteredSceneList />
      </div>
    </div>
  );
};
