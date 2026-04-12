interface IPluginApi {
  React: typeof React;
  GQL: any;
  Event: {
    addEventListener: (event: string, callback: (e: CustomEvent) => void) => void;
  };
  libraries: {
    ReactRouterDOM: {
      Link: React.FC<any>;
      Route: React.FC<any>;
      NavLink: React.FC<any>;
    },
    Bootstrap: {
      Button: React.FC<any>;
      Nav: React.FC<any> & {
        Link: React.FC<any>;
        Item: React.FC<any>;
      };
      Tab: React.FC<any> & {
        Pane: React.FC<any>;
      }
    },
    FontAwesomeSolid: {
      faEthernet: any;
    },
    Intl: {
      FormattedMessage: React.FC<any>;
    }
  },
  loadableComponents: any;
  components: Record<string, React.FC<any>>;
  utils: {
    NavUtils: any;
    loadComponents: any;
  },
  hooks: any;
  patch: {
    before: (target: string, fn: Function) => void;
    instead: (target: string, fn: Function) => void;
    after: (target: string, fn: Function) => void;
  },
  register: {
    route: (path: string, component: React.FC<any>) => void;
  }
}

(function () {
  const PluginApi = (window as any).PluginApi as IPluginApi;
  const React = PluginApi.React;
  const GQL = PluginApi.GQL;

  const { Button, Nav, Tab } = PluginApi.libraries.Bootstrap;
  const { faEthernet } = PluginApi.libraries.FontAwesomeSolid;
  const {
    NavLink,
  } = PluginApi.libraries.ReactRouterDOM;

var CRITERIA = [] as any[];

PluginApi.patch.after("SceneList", (props: any,original:any,result:any) => {
    CRITERIA = props?.filter?.criteria || [];
  return result;
});

  const TestPage: React.FC = () => {
    const componentsToLoad = [
      PluginApi.loadableComponents.Scenes,
      PluginApi.loadableComponents.Scene,
      PluginApi.loadableComponents.SceneList,
      PluginApi.loadableComponents.SceneQueryModal,

    ];
    const componentsLoading = PluginApi.hooks.useLoadComponents(componentsToLoad);
    
    const {
      LoadingIndicator,
      FilteredSceneList
    } = PluginApi.components;

    const [template, setTemplate] = React.useState("$scene.studio.name - $scene.date - $scene.title");
    const [pathTemplate, setPathTemplate] = React.useState("");
    const [status, setStatus] = React.useState("");

    React.useEffect(() => {
      const styleId = "test-page-hide-controls";
      if (document.getElementById(styleId)) return;
      const style = document.createElement("style");
      style.id = styleId;
      style.textContent = `div.clearable-input-group.search-term-input, div.list-operations, th.select-col, td.select-col, 
    div.saved-filter-dropdown.dropdown.btn-group, 
    div.item-list-container.scene-list > div > div.sidebar-pane-content > div.filtered-list-toolbar.btn-toolbar > div:nth-child(6) > button:nth-child(4),
    div.item-list-container.scene-list > div > div.sidebar-pane-content > div.pagination-index-container > div
    { display: none !important; }`;
      document.head.appendChild(style);
    }, []);

    const submitRenameTask = async (dryRun = false) => {
      try {
        setStatus("Queueing task...");
        const resp = await fetch("/graphql", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            query: `mutation RunPluginTask($plugin_id: ID!, $task_name: String, $description: String, $args_map: Map) {
              runPluginTask(
                plugin_id: $plugin_id,
                task_name: $task_name,
                description: $description,
                args_map: $args_map
              )
            }`,
            variables: {
              plugin_id: "stash_renamer",
              task_name: dryRun ? "Rename Scenes (Dry Run)" : "Rename Scenes",
              description: dryRun ? "Test page dry run" : "Test page rename",
              args_map: {
                mode: dryRun ? "dry_run" : "rename",
                filename_template: template,
                path_template: pathTemplate,
                dry_run: String(dryRun),
                criteria: CRITERIA,
                findFilter: { per_page: 250, page: 1 }
              },
            },
          }),
        });
        const result = await resp.json();
        if (result.errors && result.errors.length) {
          throw new Error(result.errors.map((e: any) => e?.message || String(e)).join(" | "));
        }
        const jobId = result?.data?.runPluginTask;
        setStatus(jobId ? `Queued job ${jobId}` : "Queued (no job id returned)");
      } catch (e: any) {
        setStatus(`Error: ${e?.message || String(e)}`);
      }
    };

    if (componentsLoading) return (
      <LoadingIndicator />
    );

    return (
      <div>
        <div className="form-group row">
          <label className="col-sm-2 col-form-label">Filename Template:</label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              value={template}
              onChange={(e: any) => setTemplate(e.target.value)}
              placeholder="$scene.studio.name - $scene.date - $scene.title"
            />
            <small className="form-text text-muted">
              Use introspected tags like $scene.title, $scene.studio.name, $performer.name, $performer[0].name, $group.name.
            </small>
          </div>
        </div>

        <hr />
        <h4>Path Builder</h4>
        <div className="form-group row">
          <label className="col-sm-2 col-form-label">Path Template:</label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              value={pathTemplate}
              onChange={(e: any) => setPathTemplate(e.target.value)}
              placeholder="e.g., /Library/$scene.studio.name or $up/Archive/$scene.studio.name"
            />
            <small className="form-text text-muted">
              Build destination folder with the same tags. Starts with / or \ = absolute path; otherwise relative. $up is replaced by ..
            </small>
          </div>
        </div>

        <div className="d-flex gap-2 mb-2">
          <Button onClick={() => submitRenameTask(true)}>
            Dry run
          </Button>
          <Button onClick={() => submitRenameTask(false)}>
            Rename
          </Button>
       </div>
        {status ? <div className="mb-2">{status}</div> : null}
      <div>
        <FilteredSceneList  />
      </div>
      </div>
    );
  };


  PluginApi.register.route("/plugins/test-react", TestPage);

 

  PluginApi.patch.before("MainNavBar.UtilityItems", function (props: any) {
    const {
      Icon,
    } = PluginApi.components;

    return [
      {
        children: (
          <>
            {props.children}
            <NavLink
              className="nav-utility"
              exact
              to="/plugins/test-react"
            >
              <Button
                className="minimal d-flex align-items-center h-100"
                title="Test page"
              >
                <Icon icon={faEthernet} />
              </Button>
            </NavLink>
          </>
        )
      }
    ]
  });

  PluginApi.patch.before("ScenePage.Tabs", function (props: any) {
    return [
      {
        children: (
          <>
            {props.children}
            <Nav.Item>
              <Nav.Link eventKey="test-react-tab">
                Test React tab
              </Nav.Link>
            </Nav.Item>
          </>
        ),
      },
    ];
  });

 
})();
