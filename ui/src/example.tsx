import { SceneListTreeble } from "./components/SceneListTable";
import { SceneTokenSelector } from "./components/SceneTokenSelector";
import {
  extractSceneTokenTree,
  fetchSelectorsCatalogCached,
  previewRenameScenes,
  queueRenameTask,
  runDryRunForFilteredScenes,
  type IScenePreviewResult,
  type ITokenTreeNode,
} from "./services/sceneRenamerApi";
(function () {

  const PluginApi = window.PluginApi;
  const React = PluginApi.React;
  const ReactDOM = PluginApi.ReactDOM;

  const { Button, ButtonGroup, Form, Spinner } = PluginApi.libraries.Bootstrap;
  const { faEthernet } = PluginApi.libraries.FontAwesomeSolid;
  const { NavLink } = PluginApi.libraries.ReactRouterDOM;

  var CRITERIA = [] as any[];
  let SCENE_LIST_FOR_PREVIEW = [] as any[];
  let SCENE_PREVIEW_BY_ID = {} as Record<
    string,
    { status: "success" | "warn" | "fail"; statusText: string; newPath: string }
  >;



  PluginApi.patch.instead("SceneList", function (props: any) {
       CRITERIA = props?.filter?.criteria || [];
      SCENE_LIST_FOR_PREVIEW = Array.isArray(props?.scenes) ? props.scenes : [];
    return (
      <div
        className="scene-list-table-root"
        style={{ width: "100%", maxWidth: "100%", minWidth: 0 }}
      >
        <SceneListTreeble {...props} sceneOperationById={SCENE_PREVIEW_BY_ID} />
      </div>
    );
  });

  const SidebarSceneTokenSelector: React.FC = () => {
    const [tree, setTree] = React.useState<ITokenTreeNode[]>([]);
    const [loading, setLoading] = React.useState(false);

    const reload = async () => {
      try {
        setLoading(true);
        const output = await fetchSelectorsCatalogCached();
        console.log("[Scene Renamer] Selectors catalog:", output);
        setTree(extractSceneTokenTree(output));
      } catch (e) {
        console.error("[Scene Renamer] Failed to load selectors", e);
      } finally {
        setLoading(false);
      }
    };

    React.useEffect(() => {
      fetchSelectorsCatalogCached().catch(() => undefined);
    }, []);

    React.useEffect(() => {
      reload();
    }, []);

    return (
      <div className="px-2">
        <SceneTokenSelector
          tree={tree}
          loading={loading}
          onReload={reload}
        />
      </div>
    );
  };

  const TestPage: React.FC = () => {
    const componentsToLoad = [
      PluginApi.loadableComponents.Scenes,
      PluginApi.loadableComponents.Scene,
      PluginApi.loadableComponents.SceneList,
      PluginApi.loadableComponents.SceneQueryModal,
    ];
    const componentsLoading =
      PluginApi.hooks.useLoadComponents(componentsToLoad);

    const { LoadingIndicator, FilteredSceneList } = PluginApi.components;

    const [template, setTemplate] = React.useState(
      "$scene.studio.name - $scene.date - $scene.title",
    );
    const [pathTemplate, setPathTemplate] = React.useState("");
    const [livePreview, setLivePreview] = React.useState(false);
    const [status, setStatus] = React.useState("");
    const [isActionBusy, setIsActionBusy] = React.useState(false);
    const [activeAction, setActiveAction] = React.useState<"" | "dry_run" | "rename">("");
    const [previewBusyCount, setPreviewBusyCount] = React.useState(0);
    const [previewRevision, setPreviewRevision] = React.useState(0);
    const [debouncedTemplate, setDebouncedTemplate] = React.useState(template);
    const [debouncedPathTemplate, setDebouncedPathTemplate] =
      React.useState(pathTemplate);
    const previewRequestRef = React.useRef(0);
    const templateInputRef = React.useRef<HTMLInputElement | null>(null);
    const pathTemplateInputRef = React.useRef<HTMLInputElement | null>(null);

    React.useEffect(() => {
      const timeout = window.setTimeout(() => setDebouncedTemplate(template), 350);
      return () => window.clearTimeout(timeout);
    }, [template]);

    React.useEffect(() => {
      const timeout = window.setTimeout(
        () => setDebouncedPathTemplate(pathTemplate),
        350,
      );
      return () => window.clearTimeout(timeout);
    }, [pathTemplate]);

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

    const runPreview = async (
      templateValue: string,
      pathTemplateValue: string,
      showProgress = true,
    ) => {
      const requestId = ++previewRequestRef.current;
      setPreviewBusyCount((count) => count + 1);
      try {
        if (showProgress) {
          setStatus("Generating preview...");
        }
        const previewRows = await previewRenameScenes({
          template: templateValue,
          pathTemplate: pathTemplateValue,
          scenes: SCENE_LIST_FOR_PREVIEW,
        });
        if (requestId !== previewRequestRef.current) return;

        const joinPath = (dir?: string, file?: string) => {
          const safeDir = String(dir || "").trim();
          const safeFile = String(file || "").trim();
          if (!safeDir) return safeFile;
          if (!safeFile) return safeDir;
          const sep = safeDir.includes("\\") ? "\\" : "/";
          return `${safeDir.replace(/[\\/]+$/, "")}${sep}${safeFile}`;
        };

        const next = {} as Record<
          string,
          { status: "success" | "warn" | "fail"; statusText: string; newPath: string }
        >;
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
            statusText: String(row?.log || ""),
            newPath: joinPath(row?.new_path, row?.new_filename || row?.new_name),
          };
        });

        SCENE_PREVIEW_BY_ID = next;
        setPreviewRevision((v) => v + 1);
        setStatus(
          `Preview ready for ${previewRows.length} scene(s) at ${new Date().toLocaleTimeString()}`,
        );
      } catch (e: any) {
        if (requestId !== previewRequestRef.current) return;
        setStatus(`Error: ${e?.message || String(e)}`);
      } finally {
        setPreviewBusyCount((count) => Math.max(0, count - 1));
      }
    };

    const submitRenameTask = async (dryRun = false) => {
      setIsActionBusy(true);
      setActiveAction(dryRun ? "dry_run" : "rename");
      try {
        if (dryRun) {
          if (livePreview) {
            setLivePreview(false);
          }
          setStatus("Running dry run for all filtered scenes...");
          const previewRows = await runDryRunForFilteredScenes({
            template,
            pathTemplate,
            criteria: CRITERIA,
          });
          const next = { ...SCENE_PREVIEW_BY_ID } as Record<
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
              newPath: String((row as any)?.new_path || ""),
            };
          });
          SCENE_PREVIEW_BY_ID = next;
          setPreviewRevision((v) => v + 1);
          setStatus(`Dry run ready for ${previewRows.length} scene(s)`);
          return;
        }

        setStatus("Queueing task...");
        const jobId = await queueRenameTask({
          dryRun,
          template,
          pathTemplate,
          criteria: CRITERIA,
        });
        setStatus(
          jobId ? `Queued job ${jobId}` : "Queued (no job id returned)",
        );
      } catch (e: any) {
        setStatus(`Error: ${e?.message || String(e)}`);
      } finally {
        setIsActionBusy(false);
        setActiveAction("");
      }
    };

    React.useEffect(() => {
      if (isActionBusy) return;
      if (!livePreview) return;
      runPreview(debouncedTemplate, debouncedPathTemplate, false);
    }, [livePreview, debouncedTemplate, debouncedPathTemplate, isActionBusy]);

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

    function DeferredPortal() {
      const [target, setTarget] = React.useState<HTMLElement | null>(null);

      React.useEffect(() => {
        const selector = ".filtered-list-toolbar";
        const findTarget = () =>
          document.querySelector(selector) as HTMLElement | null;

        const existing = findTarget();
        if (existing) {
          setTarget(existing);
          return;
        }

        const obs = new MutationObserver(() => {
          const el = findTarget();
          if (el) {
            setTarget(el);
            obs.disconnect();
          }
        });

        obs.observe(document.body, { childList: true, subtree: true });
        return () => obs.disconnect();
      }, []);

      if (!target || !ReactDOM?.createPortal) return null;
      return ReactDOM.createPortal(
        <ButtonGroup>
          <Button
            variant="secondary"
            onClick={() => submitRenameTask(true)}
            disabled={isActionBusy || isPreviewLoading}
          >
            {isDryRunBusy || isPreviewLoading ? (
              <>
                <Spinner
                  animation="border"
                  size="sm"
                  role="status"
                  className="mr-1"
                />
                Dry run
              </>
            ) : (
              "Dry run"
            )}
          </Button>

          <Button
            variant="primary"
            onClick={() => submitRenameTask(false)}
            disabled={isActionBusy}
          >
            {isRenameBusy ? (
              <>
                <Spinner
                  animation="border"
                  size="sm"
                  role="status"
                  className="mr-1"
                />
                Rename
              </>
            ) : (
              "Rename"
            )}
          </Button>
        </ButtonGroup>,
        target,
      );
    }

    return (
      <div>
        <div className="form-group row">
          <label className="col-sm-2 col-form-label">Filename Template:</label>
          <div className="col-sm-10">
            <input
              ref={templateInputRef}
              type="text"
              className="form-control"
              value={template}
              disabled={isActionBusy}
              onChange={(e: any) => setTemplate(e.target.value)}
              onDragOver={(e: React.DragEvent<HTMLInputElement>) => e.preventDefault()}
              onDrop={handleDropOnInput("filename")}
              placeholder="$scene.studio.name - $scene.date - $scene.title"
            />
          </div>
        </div>
        <div className="form-group row">
          <label className="col-sm-2 col-form-label">Path Template:</label>
          <div className="col-sm-10">
            <input
              ref={pathTemplateInputRef}
              type="text"
              className="form-control"
              value={pathTemplate}
              disabled={isActionBusy}
              onChange={(e: any) => setPathTemplate(e.target.value)}
              onDragOver={(e: React.DragEvent<HTMLInputElement>) => e.preventDefault()}
              onDrop={handleDropOnInput("path")}
              placeholder="e.g., /Library/$scene.studio.name or $up/Archive/$scene.studio.name"
            />
            <div className="mt-2">
              <Form.Check
                id="scene-renamer-live-preview"
                type="checkbox"
                label="Live preview while typing"
                checked={livePreview}
                disabled={isActionBusy}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setLivePreview(e.target.checked)
                }
              />
            </div>
          </div>
          {status ? <div className="mb-2">{status}</div> : null}
          <div
            key={`preview-${previewRevision}`}
            style={{ width: "100%", maxWidth: "100%", minWidth: 0 }}
          >
            <FilteredSceneList />
          </div>
          <DeferredPortal />
            {}
        </div>
      </div>
    );
  };


  PluginApi.register.route("/plugins/test-React", TestPage);

  PluginApi.patch.instead("FilteredSceneList.SidebarSections", function () {
    return [<SidebarSceneTokenSelector />];
  });

  PluginApi.patch.before("MainNavBar.UtilityItems", function (props: any) {
    const { Icon } = PluginApi.components;

    return [
      {
        children: (
          <>
            {props.children}
            <NavLink className="nav-utility" exact to="/plugins/test-React">
              <Button
                className="minimal d-flex align-items-center h-100"
                title="Test page">
                <Icon icon={faEthernet} />
              </Button>
            </NavLink>
          </>
        ),
      },
    ];
  });

})();
