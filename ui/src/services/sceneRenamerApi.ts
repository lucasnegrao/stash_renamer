export interface ITokenTreeNode {
  name: string;
  token: string;
  children?: ITokenTreeNode[];
}

interface IGraphQLErrorLike {
  message?: string;
}

async function postGraphQL<T = any>(query: string, variables: Record<string, any>): Promise<T> {
  const resp = await fetch("/graphql", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables }),
  });
  const json = await resp.json();
  if (Array.isArray(json?.errors) && json.errors.length > 0) {
    const message = json.errors
      .map((e: IGraphQLErrorLike) => e?.message || String(e))
      .join(" | ");
    throw new Error(message);
  }
  return json as T;
}

export async function queueRenameTask(args: {
  dryRun: boolean;
  template: string;
  pathTemplate: string;
  criteria: any[];
}): Promise<string | null> {
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
  const result = await postGraphQL<any>(query, variables);
  return result?.data?.runPluginTask ? String(result.data.runPluginTask) : null;
}

export async function fetchSelectorsCatalog(): Promise<any> {
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
  const result = await postGraphQL<any>(query, variables);
  const payload = result?.data?.runPluginOperation;
  return payload?.output || payload || {};
}

export function extractSceneTokenTree(catalog: any): ITokenTreeNode[] {
  const treeFromOutput: ITokenTreeNode[] = Array.isArray(catalog?.scene_tree)
    ? catalog.scene_tree
    : [];
  const virtualTokens: string[] = Array.isArray(catalog?.virtual_selectors)
    ? catalog.virtual_selectors
        .map((v: any) => String(v?.selector || ""))
        .filter((s: string) => s.startsWith("$scene."))
    : [];
  const virtualNodes: ITokenTreeNode[] = virtualTokens.map((token) => ({
    name: token.replace("$scene.", ""),
    token,
    children: [],
  }));

  return [...treeFromOutput, ...virtualNodes].filter(
    (n: any) => n && typeof n.token === "string" && n.token.startsWith("$scene."),
  );
}
