"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SceneTokenSelector = void 0;
const PluginApi = window.PluginApi;
const React = PluginApi.React;
const { Button } = PluginApi.libraries.Bootstrap;
const SceneTokenSelector = ({ tree, loading = false, onReload, onInsertToken, }) => {
    const handleDragStart = (token) => (event) => {
        event.dataTransfer.setData("text/plain", token);
        event.dataTransfer.effectAllowed = "copy";
    };
    return (React.createElement("div", { className: "card mt-3" },
        React.createElement("div", { className: "card-header d-flex align-items-center justify-content-between" },
            React.createElement("strong", null, "Scene Tokens"),
            React.createElement(Button, { variant: "outline-secondary", size: "sm", onClick: onReload, disabled: loading }, loading ? "Loading..." : "Reload")),
        React.createElement("div", { className: "card-body" },
            React.createElement("details", { open: true },
                React.createElement("summary", { style: { cursor: "pointer" } },
                    React.createElement("code", null, "$scene")),
                React.createElement("ul", { className: "list-group mt-2" }, tree.length === 0 ? (React.createElement("li", { className: "list-group-item text-muted" }, "No scene tokens loaded")) : (tree.map((node) => (React.createElement("li", { key: node.token, className: "list-group-item" },
                    React.createElement("div", { className: "d-flex align-items-center justify-content-between" },
                        React.createElement("code", { draggable: true, onDragStart: handleDragStart(node.token), style: { cursor: "grab" } }, node.token),
                        React.createElement(Button, { variant: "link", size: "sm", onClick: () => onInsertToken === null || onInsertToken === void 0 ? void 0 : onInsertToken(node.token) }, "insert")),
                    Array.isArray(node.children) && node.children.length > 0 ? (React.createElement("ul", { className: "list-group mt-2" }, node.children.map((child) => (React.createElement("li", { key: child.token, className: "list-group-item d-flex align-items-center justify-content-between" },
                        React.createElement("code", { draggable: true, onDragStart: handleDragStart(child.token), style: { cursor: "grab" } }, child.token),
                        React.createElement(Button, { variant: "link", size: "sm", onClick: () => onInsertToken === null || onInsertToken === void 0 ? void 0 : onInsertToken(child.token) }, "insert")))))) : null)))))),
            React.createElement("small", { className: "text-muted d-block mt-2" }, "Drag tokens into filename/path inputs or click insert."))));
};
exports.SceneTokenSelector = SceneTokenSelector;
//# sourceMappingURL=SceneTokenSelector.js.map