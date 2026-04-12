"use strict";
(function () {
    const PluginApi = window.PluginApi;
    const React = PluginApi.React;
    const GQL = PluginApi.GQL;
    const { Button, Nav, Tab } = PluginApi.libraries.Bootstrap;
    const { faEthernet } = PluginApi.libraries.FontAwesomeSolid;
    const { NavLink, } = PluginApi.libraries.ReactRouterDOM;
    var CRITERIA = [];
    PluginApi.patch.after("SceneList", (props, original, result) => {
        var _a;
        CRITERIA = ((_a = props === null || props === void 0 ? void 0 : props.filter) === null || _a === void 0 ? void 0 : _a.criteria) || [];
        return result;
    });
    const TestPage = () => {
        const componentsToLoad = [
            PluginApi.loadableComponents.Scenes,
            PluginApi.loadableComponents.Scene,
            PluginApi.loadableComponents.SceneList,
            PluginApi.loadableComponents.SceneQueryModal,
        ];
        const componentsLoading = PluginApi.hooks.useLoadComponents(componentsToLoad);
        const { LoadingIndicator, FilteredSceneList } = PluginApi.components;
        const [template, setTemplate] = React.useState("$scene.studio.name - $scene.date - $scene.title");
        const [pathTemplate, setPathTemplate] = React.useState("");
        const [status, setStatus] = React.useState("");
        React.useEffect(() => {
            const styleId = "test-page-hide-controls";
            if (document.getElementById(styleId))
                return;
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
            var _a;
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
                    throw new Error(result.errors.map((e) => (e === null || e === void 0 ? void 0 : e.message) || String(e)).join(" | "));
                }
                const jobId = (_a = result === null || result === void 0 ? void 0 : result.data) === null || _a === void 0 ? void 0 : _a.runPluginTask;
                setStatus(jobId ? `Queued job ${jobId}` : "Queued (no job id returned)");
            }
            catch (e) {
                setStatus(`Error: ${(e === null || e === void 0 ? void 0 : e.message) || String(e)}`);
            }
        };
        if (componentsLoading)
            return (React.createElement(LoadingIndicator, null));
        return (React.createElement("div", null,
            React.createElement("div", { className: "form-group row" },
                React.createElement("label", { className: "col-sm-2 col-form-label" }, "Filename Template:"),
                React.createElement("div", { className: "col-sm-10" },
                    React.createElement("input", { type: "text", className: "form-control", value: template, onChange: (e) => setTemplate(e.target.value), placeholder: "$scene.studio.name - $scene.date - $scene.title" }),
                    React.createElement("small", { className: "form-text text-muted" }, "Use introspected tags like $scene.title, $scene.studio.name, $performer.name, $performer[0].name, $group.name."))),
            React.createElement("hr", null),
            React.createElement("h4", null, "Path Builder"),
            React.createElement("div", { className: "form-group row" },
                React.createElement("label", { className: "col-sm-2 col-form-label" }, "Path Template:"),
                React.createElement("div", { className: "col-sm-10" },
                    React.createElement("input", { type: "text", className: "form-control", value: pathTemplate, onChange: (e) => setPathTemplate(e.target.value), placeholder: "e.g., /Library/$scene.studio.name or $up/Archive/$scene.studio.name" }),
                    React.createElement("small", { className: "form-text text-muted" }, "Build destination folder with the same tags. Starts with / or \\ = absolute path; otherwise relative. $up is replaced by .."))),
            React.createElement("div", { className: "d-flex gap-2 mb-2" },
                React.createElement(Button, { onClick: () => submitRenameTask(true) }, "Dry run"),
                React.createElement(Button, { onClick: () => submitRenameTask(false) }, "Rename")),
            status ? React.createElement("div", { className: "mb-2" }, status) : null,
            React.createElement("div", null,
                React.createElement(FilteredSceneList, null))));
    };
    PluginApi.register.route("/plugins/test-react", TestPage);
    PluginApi.patch.before("MainNavBar.UtilityItems", function (props) {
        const { Icon, } = PluginApi.components;
        return [
            {
                children: (React.createElement(React.Fragment, null,
                    props.children,
                    React.createElement(NavLink, { className: "nav-utility", exact: true, to: "/plugins/test-react" },
                        React.createElement(Button, { className: "minimal d-flex align-items-center h-100", title: "Test page" },
                            React.createElement(Icon, { icon: faEthernet })))))
            }
        ];
    });
    PluginApi.patch.before("ScenePage.Tabs", function (props) {
        return [
            {
                children: (React.createElement(React.Fragment, null,
                    props.children,
                    React.createElement(Nav.Item, null,
                        React.createElement(Nav.Link, { eventKey: "test-react-tab" }, "Test React tab")))),
            },
        ];
    });
})();
//# sourceMappingURL=example.js.map