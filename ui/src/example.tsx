import { SceneListTreeble } from "./components/SceneListTable";
import { SceneTokenSelector } from "./components/SceneTokenSelector";
import {
  extractSceneTokenTree,
  fetchSelectorsCatalog,
  queueRenameTask,
  type ITokenTreeNode,
} from "./services/sceneRenamerApi";
(function () {

  const PluginApi = (window as any).PluginApi;
  const React = PluginApi.React;
  const ReactDOM = PluginApi.ReactDOM;

  const { Button, ButtonGroup } = PluginApi.libraries.Bootstrap;
  const { faEthernet } = PluginApi.libraries.FontAwesomeSolid;
  const { NavLink } = PluginApi.libraries.ReactRouterDOM;

  var CRITERIA = [] as any[];

  PluginApi.patch.after(
    "SceneList",
    (props: any, original: any, result: any) => {
      CRITERIA = props?.filter?.criteria || [];
      return result;
    },
  );

  PluginApi.patch.instead("SceneList", function (props: any) {
    return [<SceneListTreeble {...props} />];
  });

  const SidebarSceneTokenSelector: React.FC = () => {
    const [tree, setTree] = React.useState<ITokenTreeNode[]>([]);
    const [loading, setLoading] = React.useState(false);

    const reload = async () => {
      try {
        setLoading(true);
        const output = await fetchSelectorsCatalog();
        console.log("[Scene Renamer] Selectors catalog:", output);
        setTree(extractSceneTokenTree(output));
      } catch (e) {
        console.error("[Scene Renamer] Failed to load selectors", e);
      } finally {
        setLoading(false);
      }
    };

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
    const [status, setStatus] = React.useState("");
    const templateInputRef = React.useRef<HTMLInputElement | null>(null);
    const pathTemplateInputRef = React.useRef<HTMLInputElement | null>(null);

    React.useEffect(() => {
      const styleId = "test-page-hide-controls";
      if (document.getElementById(styleId)) return;
      const style = document.createElement("style");
      style.id = styleId;
      style.textContent = `div.clearable-input-group.search-term-input, div.list-operations, th.select-col, td.select-col, 
    div.saved-filter-dropdown.dropdown.btn-group,
    #root > div.main.container-fluid.apple > div > div:nth-child(2) > div:nth-child(3) > div > div > div.sidebar-pane-content > div.filtered-list-toolbar.btn-toolbar > div:nth-child(6),
    div.item-list-container.scene-list > div > div.sidebar-pane-content > div.filtered-list-toolbar.btn-toolbar > div:nth-child(6) > button:nth-child(4),
    #root > div.main.container-fluid.apple > div > div:nth-child(2) > div:nth-child(3) > div > div > div.sidebar-pane-content > div.filtered-list-toolbar.btn-toolbar > div.zoom-slider-container,
    div.item-list-container.scene-list > div > div.sidebar-pane-content > div.pagination-index-container > div
    { display: none !important; }`;
      document.head.appendChild(style);
                        
    }, []);

    const submitRenameTask = async (dryRun = false) => {
      try {
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
      }
    };

    const insertTokenInInput = (
      ref: React.RefObject<HTMLInputElement>,
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
          <Button variant="secondary" onClick={() => submitRenameTask(true)}>
            Dry run
          </Button>

          <Button variant="primary" onClick={() => submitRenameTask(false)}>
            Rename
          </Button>
        </ButtonGroup>,
        target,
      );
    }

  // PluginApi.patch.after("FilteredSceneList", function (props: any, original: any, result: any) {
  //      const filteredListToolbarEl = document.querySelector(
  //     "div.filtered-list-toolbar.btn-toolbar"
  //   ) as HTMLElement;

    
  //       ReactDOM.createPortal(
  //           <div>
  //             <Button
  //               variant="secondary"
  //               onClick={() => submitRenameTask(true)}>Dry run</Button>

  //             <Button
  //               variant="primary"

  //               onClick={() => submitRenameTask(false)}>Rename</Button>
  //           </div>
  //           ,
  //           filteredListToolbarEl);
  //           return result;
  // });

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
              onChange={(e: any) => setPathTemplate(e.target.value)}
              onDragOver={(e: React.DragEvent<HTMLInputElement>) => e.preventDefault()}
              onDrop={handleDropOnInput("path")}
              placeholder="e.g., /Library/$scene.studio.name or $up/Archive/$scene.studio.name"
            />
          </div>
          {status ? <div className="mb-2">{status}</div> : null}
          <div>
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
