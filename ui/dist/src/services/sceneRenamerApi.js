"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queueRenameTask = queueRenameTask;
exports.fetchSelectorsCatalog = fetchSelectorsCatalog;
exports.extractSceneTokenTree = extractSceneTokenTree;
async function postGraphQL(query, variables) {
    const resp = await fetch("/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query, variables }),
    });
    const json = await resp.json();
    if (Array.isArray(json === null || json === void 0 ? void 0 : json.errors) && json.errors.length > 0) {
        const message = json.errors
            .map((e) => (e === null || e === void 0 ? void 0 : e.message) || String(e))
            .join(" | ");
        throw new Error(message);
    }
    return json;
}
async function queueRenameTask(args) {
    var _a;
    const query = `mutation RunPluginTask($plugin_id: ID!, $task_name: String, $description: String, $args_map: Map) {
    runPluginTask(
      plugin_id: $plugin_id,
      task_name: $task_name,
      description: $description,
      args_map: $args_map
    )
  }`;
    const variables = {
        plugin_id: "stash_renamer",
        task_name: args.dryRun ? "Rename Scenes (Dry Run)" : "Rename Scenes",
        description: args.dryRun ? "Test page dry run" : "Test page rename",
        args_map: {
            mode: args.dryRun ? "dry_run" : "rename",
            filename_template: args.template,
            path_template: args.pathTemplate,
            dry_run: String(args.dryRun),
            criteria: args.criteria,
        },
    };
    const result = await postGraphQL(query, variables);
    return ((_a = result === null || result === void 0 ? void 0 : result.data) === null || _a === void 0 ? void 0 : _a.runPluginTask) ? String(result.data.runPluginTask) : null;
}
async function fetchSelectorsCatalog() {
    var _a;
    const query = `mutation RunPluginOperation($plugin_id: ID!, $args: Map!) {
    runPluginOperation(plugin_id: $plugin_id, args: $args)
  }`;
    const variables = {
        plugin_id: "stash_renamer",
        args: {
            mode: "list_selectors",
            list_selectors: true,
            debugMode: "true",
        },
    };
    const result = await postGraphQL(query, variables);
    const payload = (_a = result === null || result === void 0 ? void 0 : result.data) === null || _a === void 0 ? void 0 : _a.runPluginOperation;
    return (payload === null || payload === void 0 ? void 0 : payload.output) || payload || {};
}
function extractSceneTokenTree(catalog) {
    const treeFromOutput = Array.isArray(catalog === null || catalog === void 0 ? void 0 : catalog.scene_tree)
        ? catalog.scene_tree
        : [];
    const virtualTokens = Array.isArray(catalog === null || catalog === void 0 ? void 0 : catalog.virtual_selectors)
        ? catalog.virtual_selectors
            .map((v) => String((v === null || v === void 0 ? void 0 : v.selector) || ""))
            .filter((s) => s.startsWith("$scene."))
        : [];
    const virtualNodes = virtualTokens.map((token) => ({
        name: token.replace("$scene.", ""),
        token,
        children: [],
    }));
    return [...treeFromOutput, ...virtualNodes].filter((n) => n && typeof n.token === "string" && n.token.startsWith("$scene."));
}
//# sourceMappingURL=sceneRenamerApi.js.map