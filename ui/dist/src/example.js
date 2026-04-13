"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SceneListTable_1 = require("./components/SceneListTable");
const SceneTokenSelector_1 = require("./components/SceneTokenSelector");
const sceneRenamerApi_1 = require("./services/sceneRenamerApi");
(function () {
    const PluginApi = window.PluginApi;
    const React = PluginApi.React;
    const ReactDOM = PluginApi.ReactDOM;
    const { Button, ButtonGroup } = PluginApi.libraries.Bootstrap;
    const { faEthernet } = PluginApi.libraries.FontAwesomeSolid;
    const { NavLink } = PluginApi.libraries.ReactRouterDOM;
    var CRITERIA = [];
    PluginApi.patch.after("SceneList", (props, original, result) => {
        var _a;
        CRITERIA = ((_a = props === null || props === void 0 ? void 0 : props.filter) === null || _a === void 0 ? void 0 : _a.criteria) || [];
        return result;
    });
    PluginApi.patch.instead("SceneList", function (props) {
        return [React.createElement(SceneListTable_1.SceneListTreeble, { ...props })];
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
        const [sceneTokenTree, setSceneTokenTree] = React.useState([]);
        const [tokensLoading, setTokensLoading] = React.useState(false);
        const [focusedField, setFocusedField] = React.useState("filename");
        const templateInputRef = React.useRef(null);
        const pathTemplateInputRef = React.useRef(null);
        React.useEffect(() => {
            const styleId = "test-page-hide-controls";
            if (document.getElementById(styleId))
                return;
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
                const jobId = await (0, sceneRenamerApi_1.queueRenameTask)({
                    dryRun,
                    template,
                    pathTemplate,
                    criteria: CRITERIA,
                });
                setStatus(jobId ? `Queued job ${jobId}` : "Queued (no job id returned)");
            }
            catch (e) {
                setStatus(`Error: ${(e === null || e === void 0 ? void 0 : e.message) || String(e)}`);
            }
        };
        const fetchSelectors = async () => {
            try {
                setTokensLoading(true);
                setStatus("Loading selectors...");
                const output = await (0, sceneRenamerApi_1.fetchSelectorsCatalog)();
                console.log("[Scene Renamer] Selectors catalog:", output);
                setSceneTokenTree((0, sceneRenamerApi_1.extractSceneTokenTree)(output));
                setStatus("Selectors loaded. Check browser console.");
            }
            catch (e) {
                setStatus(`Error loading selectors: ${(e === null || e === void 0 ? void 0 : e.message) || String(e)}`);
            }
            finally {
                setTokensLoading(false);
            }
        };
        React.useEffect(() => {
            fetchSelectors();
        }, []);
        const insertTokenInInput = (ref, value, setValue, token) => {
            var _a, _b;
            const input = ref.current;
            if (!input) {
                setValue(`${value}${token}`);
                return;
            }
            const start = (_a = input.selectionStart) !== null && _a !== void 0 ? _a : value.length;
            const end = (_b = input.selectionEnd) !== null && _b !== void 0 ? _b : start;
            const nextValue = `${value.slice(0, start)}${token}${value.slice(end)}`;
            setValue(nextValue);
            const cursor = start + token.length;
            window.requestAnimationFrame(() => {
                input.focus();
                input.setSelectionRange(cursor, cursor);
            });
        };
        const handleInsertToken = (token) => {
            if (focusedField === "path") {
                insertTokenInInput(pathTemplateInputRef, pathTemplate, setPathTemplate, token);
            }
            else {
                insertTokenInInput(templateInputRef, template, setTemplate, token);
            }
        };
        const handleDropOnInput = (field) => (event) => {
            event.preventDefault();
            const token = event.dataTransfer.getData("text/plain");
            if (!token)
                return;
            if (field === "path") {
                insertTokenInInput(pathTemplateInputRef, pathTemplate, setPathTemplate, token);
                setFocusedField("path");
            }
            else {
                insertTokenInInput(templateInputRef, template, setTemplate, token);
                setFocusedField("filename");
            }
        };
        if (componentsLoading)
            return React.createElement(LoadingIndicator, null);
        function DeferredPortal() {
            const [target, setTarget] = React.useState(null);
            React.useEffect(() => {
                const selector = ".filtered-list-toolbar";
                const findTarget = () => document.querySelector(selector);
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
            if (!target || !(ReactDOM === null || ReactDOM === void 0 ? void 0 : ReactDOM.createPortal))
                return null;
            return ReactDOM.createPortal(React.createElement(ButtonGroup, null,
                React.createElement(Button, { variant: "secondary", onClick: () => submitRenameTask(true) }, "Dry run"),
                React.createElement(Button, { variant: "primary", onClick: () => submitRenameTask(false) }, "Rename"),
                React.createElement(Button, { variant: "info", onClick: () => fetchSelectors() }, "Selectors")), target);
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
        return (React.createElement("div", null,
            React.createElement("div", { className: "form-group row" },
                React.createElement("label", { className: "col-sm-2 col-form-label" }, "Filename Template:"),
                React.createElement("div", { className: "col-sm-10" },
                    React.createElement("input", { ref: templateInputRef, type: "text", className: "form-control", value: template, onChange: (e) => setTemplate(e.target.value), onFocus: () => setFocusedField("filename"), onDragOver: (e) => e.preventDefault(), onDrop: handleDropOnInput("filename"), placeholder: "$scene.studio.name - $scene.date - $scene.title" }))),
            React.createElement("div", { className: "form-group row" },
                React.createElement("label", { className: "col-sm-2 col-form-label" }, "Path Template:"),
                React.createElement("div", { className: "col-sm-10" },
                    React.createElement("input", { ref: pathTemplateInputRef, type: "text", className: "form-control", value: pathTemplate, onChange: (e) => setPathTemplate(e.target.value), onFocus: () => setFocusedField("path"), onDragOver: (e) => e.preventDefault(), onDrop: handleDropOnInput("path"), placeholder: "e.g., /Library/$scene.studio.name or $up/Archive/$scene.studio.name" })),
                status ? React.createElement("div", { className: "mb-2" }, status) : null,
                React.createElement(SceneTokenSelector_1.SceneTokenSelector, { tree: sceneTokenTree, loading: tokensLoading, onReload: fetchSelectors, onInsertToken: handleInsertToken }),
                React.createElement("div", null,
                    React.createElement(FilteredSceneList, null)),
                React.createElement(DeferredPortal, null))));
    };
    PluginApi.register.route("/plugins/test-React", TestPage);
    PluginApi.patch.before("MainNavBar.UtilityItems", function (props) {
        const { Icon } = PluginApi.components;
        return [
            {
                children: (React.createElement(React.Fragment, null,
                    props.children,
                    React.createElement(NavLink, { className: "nav-utility", exact: true, to: "/plugins/test-React" },
                        React.createElement(Button, { className: "minimal d-flex align-items-center h-100", title: "Test page" },
                            React.createElement(Icon, { icon: faEthernet }))))),
            },
        ];
    });
})();
//# sourceMappingURL=example.js.map