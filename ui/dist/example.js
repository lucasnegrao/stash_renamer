"use strict";
(function () {
    const PluginApi = window.PluginApi;
    const React = PluginApi.React;
    const GQL = PluginApi.GQL;
    const { Button, Nav, Tab } = PluginApi.libraries.Bootstrap;
    const { faEthernet } = PluginApi.libraries.FontAwesomeSolid;
    const { Link, NavLink, } = PluginApi.libraries.ReactRouterDOM;
    const { NavUtils } = PluginApi.utils;
    PluginApi.Event.addEventListener("stash:location", (e) => console.log("Page Changed", e.detail.data.location.pathname, e.detail.data.location.search));
    const ScenePerformer = ({ performer }) => {
        // PluginApi.components may not be registered when the outside function is run
        // need to initialise these inside the function component
        const { HoverPopover, } = PluginApi.components;
        const popoverContent = React.useMemo(() => {
            var _a, _b;
            return (React.createElement("div", { className: "scene-performer-popover" },
                React.createElement(Link, { to: `/performers/${performer.id}` },
                    React.createElement("img", { className: "image-thumbnail", alt: (_a = performer.name) !== null && _a !== void 0 ? _a : "", src: (_b = performer.image_path) !== null && _b !== void 0 ? _b : "" }))));
        }, [performer]);
        return (React.createElement(HoverPopover, { className: "scene-card__performer", placement: "top", content: popoverContent, leaveDelay: 100 },
            React.createElement("a", { href: NavUtils.makePerformerScenesUrl(performer) }, performer.name)));
    };
    function SceneDetails(props) {
        const { TagLink, } = PluginApi.components;
        function maybeRenderPerformers() {
            if (props.scene.performers.length <= 0)
                return;
            return (React.createElement("div", { className: "scene-card__performers" }, props.scene.performers.map((performer) => (React.createElement(ScenePerformer, { performer: performer, key: performer.id })))));
        }
        function maybeRenderTags() {
            if (props.scene.tags.length <= 0)
                return;
            return (React.createElement("div", { className: "scene-card__tags" }, props.scene.tags.map((tag) => (React.createElement(TagLink, { key: tag.id, tag: tag })))));
        }
        return (React.createElement("div", { className: "scene-card__details" },
            React.createElement("span", { className: "scene-card__date" }, props.scene.date),
            maybeRenderPerformers(),
            maybeRenderTags()));
    }
    function Overlays() {
        return React.createElement("span", { className: "example-react-component-custom-overlay" }, "Custom overlay");
    }
    PluginApi.patch.instead("SceneCard.Details", function (props, _, original) {
        return React.createElement(SceneDetails, { ...props });
    });
    PluginApi.patch.instead("SceneCard.Overlays", function (props, _, original) {
        return React.createElement(React.Fragment, null,
            React.createElement(Overlays, null),
            original({ ...props }));
    });
    PluginApi.patch.instead("FrontPage", function (props, _, original) {
        return React.createElement(React.Fragment, null,
            React.createElement("p", null, "Hello from Test React!"),
            original({ ...props }));
    });
    const TestPage = () => {
        const componentsToLoad = [
            PluginApi.loadableComponents.SceneCard,
            PluginApi.loadableComponents.PerformerSelect,
        ];
        const componentsLoading = PluginApi.hooks.useLoadComponents(componentsToLoad);
        const { SceneCard, LoadingIndicator, PerformerSelect, } = PluginApi.components;
        // read a random scene and show a scene card for it
        const { data } = GQL.useFindScenesQuery({
            variables: {
                filter: {
                    per_page: 1,
                    sort: "random",
                },
            },
        });
        const scene = data === null || data === void 0 ? void 0 : data.findScenes.scenes[0];
        if (componentsLoading)
            return (React.createElement(LoadingIndicator, null));
        return (React.createElement("div", null,
            React.createElement("div", null, "This is a test page."),
            !!scene && React.createElement(SceneCard, { scene: data.findScenes.scenes[0] }),
            React.createElement("div", null,
                React.createElement(PerformerSelect, { isMulti: true, onSelect: () => { }, values: [] }))));
    };
    PluginApi.register.route("/plugins/test-react", TestPage);
    PluginApi.patch.before("SettingsToolsSection", function (props) {
        const { Setting, } = PluginApi.components;
        return [
            {
                children: (React.createElement(React.Fragment, null,
                    props.children,
                    React.createElement(Setting, { heading: React.createElement(Link, { to: "/plugins/test-react" },
                            React.createElement(Button, null, "Test page")) }))),
            },
        ];
    });
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
    PluginApi.patch.before("ScenePage.TabContent", function (props) {
        return [
            {
                children: (React.createElement(React.Fragment, null,
                    props.children,
                    React.createElement(Tab.Pane, { eventKey: "test-react-tab" },
                        "Test React tab content ",
                        props.scene.id))),
            },
        ];
    });
})();
//# sourceMappingURL=example.js.map