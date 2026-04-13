export interface ITokenTreeNode {
  name: string;
  token: string;
  children?: ITokenTreeNode[];
}

export interface IScenePreviewResult {
  scene_id: string;
  status?: string;
  new_name?: string;
  new_filename?: string;
  new_path?: string;
  log?: string;
  error?: string;
  id?: string;
  created_at?: string;
  batch_id?: string;
  operation_type?: string;
  undone?: boolean;
  old_path?: string;
  new_path?: string;
  old_name?: string;
  new_name?: string;
  success?: boolean;
}

export interface IOperationBatch {
  id: string;
  mode?: string;
  started_at?: string;
  completed_at?: string | null;
  success?: boolean | null;
  error?: string | null;
  operations_count?: number;
  success_count?: number;
  warn_count?: number;
  error_count?: number;
  rename_count?: number;
  dry_run_count?: number;
  undo_count?: number;
}

export interface IRenamerTemplate {
  id: string;
  name: string;
  filename_template: string;
  path_template?: string;
  created_at: string;
}

export interface ITaskJob {
  id: string;
  status?: string;
  description?: string;
  progress?: number | null;
  error?: string | null;
  addTime?: string | null;
  startTime?: string | null;
  endTime?: string | null;
  subTasks?: string[] | null;
}

interface IGraphQLErrorLike {
  message?: string;
}

let selectorsCatalogCache: any | null = null;
let selectorsCatalogInflight: Promise<any> | null = null;

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
  excludedSceneIds?: string[];
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
      excluded_scene_ids: Array.isArray(args.excludedSceneIds)
        ? args.excludedSceneIds
        : [],
    },
  };
  const result = await postGraphQL<any>(query, variables);
  return result?.data?.runPluginTask ? String(result.data.runPluginTask) : null;
}

export async function fetchJobById(jobId: string): Promise<ITaskJob | null> {
  const query = `query FindJob($input: FindJobInput!) {
    findJob(input: $input) {
      id
      status
      description
      progress
      error
      addTime
      startTime
      endTime
      subTasks
    }
  }`;
  const result = await postGraphQL<any>(query, { input: { id: jobId } });
  return (result?.data?.findJob || null) as ITaskJob | null;
}

export function subscribeJobUpdates(
  jobId: string,
  handlers: {
    onUpdate: (job: ITaskJob) => void;
    onError?: (error: Error) => void;
  },
): () => void {
  const query = `subscription JobsSubscribe {
    jobsSubscribe {
      type
      job {
        id
        status
        description
        progress
        error
        addTime
        startTime
        endTime
        subTasks
      }
    }
  }`;

  const wsClientFactory = window.PluginApi?.utils?.StashService?.getWSClient;
  const wsClient =
    typeof wsClientFactory === "function" ? wsClientFactory() : null;

  if (wsClient && typeof wsClient.subscribe === "function") {
    let disposed = false;
    const dispose = wsClient.subscribe(
      { query, variables: {} },
      {
        next: (result: any) => {
          try {
            const update = result?.data?.jobsSubscribe;
            const job = update?.job;
            if (!job || String(job.id) !== String(jobId)) return;
            handlers.onUpdate(job as ITaskJob);
          } catch (e: any) {
            if (handlers.onError) {
              handlers.onError(
                e instanceof Error ? e : new Error(String(e)),
              );
            }
          }
        },
        error: (err: any) => {
          if (handlers.onError) {
            handlers.onError(
              new Error(
                `jobsSubscribe wsClient error: ${typeof err === "string" ? err : JSON.stringify(err)}`,
              ),
            );
          }
        },
        complete: () => {
          if (!disposed && handlers.onError) {
            handlers.onError(new Error("jobsSubscribe wsClient completed"));
          }
        },
      },
    );

    return () => {
      disposed = true;
      try {
        if (typeof dispose === "function") dispose();
      } catch {}
    };
  }

  // Fallback to direct websocket if wsClient is unavailable.
  const wsProto = window.location.protocol === "https:" ? "wss" : "ws";
  const wsUrl = `${wsProto}://${window.location.host}/graphql`;
  const ws = new window.WebSocket(wsUrl, "graphql-transport-ws");
  const subId = `stash-renamer-job-${Date.now()}-${Math.random().toString(36).slice(2)}`;
  let closed = false;

  ws.onopen = () => {
    ws.send(JSON.stringify({ type: "connection_init", payload: {} }));
  };

  ws.onmessage = (event) => {
    try {
      const msg = JSON.parse(String(event.data || "{}"));
      if (msg.type === "connection_ack") {
        ws.send(
          JSON.stringify({
            id: subId,
            type: "subscribe",
            payload: { query, variables: {} },
          }),
        );
        return;
      }
      if (msg.type !== "next") return;
      const update = msg?.payload?.data?.jobsSubscribe;
      const job = update?.job;
      if (!job || String(job.id) !== String(jobId)) return;
      handlers.onUpdate(job as ITaskJob);
    } catch (e: any) {
      if (handlers.onError) handlers.onError(e instanceof Error ? e : new Error(String(e)));
    }
  };

  ws.onerror = () => {
    if (handlers.onError) handlers.onError(new Error("jobsSubscribe websocket error"));
  };

  ws.onclose = () => {
    if (!closed && handlers.onError) {
      handlers.onError(new Error("jobsSubscribe websocket closed"));
    }
  };

  return () => {
    closed = true;
    try {
      ws.send(JSON.stringify({ id: subId, type: "complete" }));
    } catch {}
    try {
      ws.close();
    } catch {}
  };
}

export async function previewRenameScenes(args: {
  template: string;
  pathTemplate: string;
  scenes: any[];
}): Promise<IScenePreviewResult[]> {
  const query = `mutation RunPluginOperation($plugin_id: ID!, $args: Map!) {
    runPluginOperation(plugin_id: $plugin_id, args: $args)
  }`;
  const variables = {
    plugin_id: "stash_renamer",
    args: {
      mode: "preview_dry_run",
      preview_dry_run: true,
      dry_run: true,
      filename_template: args.template,
      path_template: args.pathTemplate,
      scenes: args.scenes,
    },
  };
  const result = await postGraphQL<any>(query, variables);
  const payload = result?.data?.runPluginOperation;
  const output = payload?.output || payload || {};
  const operations = output?.operations;
  if (!Array.isArray(operations)) return [];
  return operations as IScenePreviewResult[];
}

export async function runDryRunForFilteredScenes(args: {
  template: string;
  pathTemplate: string;
  criteria: any[];
  excludedSceneIds?: string[];
}): Promise<IScenePreviewResult[]> {
  const query = `mutation RunPluginOperation($plugin_id: ID!, $args: Map!) {
    runPluginOperation(plugin_id: $plugin_id, args: $args)
  }`;
  const variables = {
    plugin_id: "stash_renamer",
    args: {
      mode: "dry_run",
      dry_run: true,
      filename_template: args.template,
      path_template: args.pathTemplate,
      criteria: args.criteria,
      excluded_scene_ids: Array.isArray(args.excludedSceneIds)
        ? args.excludedSceneIds
        : [],
    },
  };
  const result = await postGraphQL<any>(query, variables);
  const payload = result?.data?.runPluginOperation;
  const output = payload?.output || payload || {};
  const operations = output?.operations;
  if (!Array.isArray(operations)) return [];
  return operations as IScenePreviewResult[];
}

export async function fetchOperationBatches(): Promise<IOperationBatch[]> {
  const query = `mutation RunPluginOperation($plugin_id: ID!, $args: Map!) {
    runPluginOperation(plugin_id: $plugin_id, args: $args)
  }`;
  const variables = {
    plugin_id: "stash_renamer",
    args: {
      mode: "list_operation_batches",
      list_operation_batches: true,
    },
  };
  const result = await postGraphQL<any>(query, variables);
  const payload = result?.data?.runPluginOperation;
  const output = payload?.output || payload || {};
  const rows = output?.batches;
  if (!Array.isArray(rows)) return [];
  return rows as IOperationBatch[];
}

export async function fetchBatchOperations(
  batchId: string,
): Promise<IScenePreviewResult[]> {
  const query = `mutation RunPluginOperation($plugin_id: ID!, $args: Map!) {
    runPluginOperation(plugin_id: $plugin_id, args: $args)
  }`;
  const variables = {
    plugin_id: "stash_renamer",
    args: {
      mode: "list_batch_operations",
      list_batch_operations: true,
      batch_id: batchId,
    },
  };
  const result = await postGraphQL<any>(query, variables);
  const payload = result?.data?.runPluginOperation;
  const output = payload?.output || payload || {};
  const rows = output?.operations;
  if (!Array.isArray(rows)) return [];
  return rows as IScenePreviewResult[];
}

export async function undoBatchOperation(batchId: string): Promise<any> {
  const query = `mutation RunPluginOperation($plugin_id: ID!, $args: Map!) {
    runPluginOperation(plugin_id: $plugin_id, args: $args)
  }`;
  const variables = {
    plugin_id: "stash_renamer",
    args: {
      mode: "undo_batch_operation",
      undo_batch_operation: true,
      batch_id: batchId,
    },
  };
  const result = await postGraphQL<any>(query, variables);
  const payload = result?.data?.runPluginOperation;
  return payload?.output || payload || {};
}

export async function undoOperation(operationId: string): Promise<any> {
  const query = `mutation RunPluginOperation($plugin_id: ID!, $args: Map!) {
    runPluginOperation(plugin_id: $plugin_id, args: $args)
  }`;
  const variables = {
    plugin_id: "stash_renamer",
    args: {
      mode: "undo",
      undo_operation_id: operationId,
    },
  };
  const result = await postGraphQL<any>(query, variables);
  const payload = result?.data?.runPluginOperation;
  return payload?.output || payload || {};
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

export async function fetchSavedTemplates(): Promise<IRenamerTemplate[]> {
  const query = `mutation RunPluginOperation($plugin_id: ID!, $args: Map!) {
    runPluginOperation(plugin_id: $plugin_id, args: $args)
  }`;
  const variables = {
    plugin_id: "stash_renamer",
    args: {
      mode: "list_templates",
      list_templates: true,
    },
  };
  const result = await postGraphQL<any>(query, variables);
  const payload = result?.data?.runPluginOperation;
  const output = payload?.output || payload || {};
  const rows = output?.templates;
  if (!Array.isArray(rows)) return [];
  return rows as IRenamerTemplate[];
}

export async function saveTemplateToDatabase(args: {
  name: string;
  filenameTemplate: string;
  pathTemplate: string;
}): Promise<IRenamerTemplate | null> {
  const query = `mutation RunPluginOperation($plugin_id: ID!, $args: Map!) {
    runPluginOperation(plugin_id: $plugin_id, args: $args)
  }`;
  const variables = {
    plugin_id: "stash_renamer",
    args: {
      mode: "save_template",
      save_template: true,
      template_name: args.name,
      filename_template: args.filenameTemplate,
      path_template: args.pathTemplate,
    },
  };
  const result = await postGraphQL<any>(query, variables);
  const payload = result?.data?.runPluginOperation;
  const output = payload?.output || payload || {};
  const row = output?.template;
  if (!row || typeof row !== "object") return null;
  return row as IRenamerTemplate;
}

export async function updateTemplateInDatabase(args: {
  id: string;
  name: string;
  filenameTemplate: string;
  pathTemplate: string;
}): Promise<IRenamerTemplate | null> {
  const query = `mutation RunPluginOperation($plugin_id: ID!, $args: Map!) {
    runPluginOperation(plugin_id: $plugin_id, args: $args)
  }`;
  const variables = {
    plugin_id: "stash_renamer",
    args: {
      mode: "update_template",
      update_template: true,
      template_id: args.id,
      template_name: args.name,
      filename_template: args.filenameTemplate,
      path_template: args.pathTemplate,
    },
  };
  const result = await postGraphQL<any>(query, variables);
  const payload = result?.data?.runPluginOperation;
  const output = payload?.output || payload || {};
  const row = output?.template;
  if (!row || typeof row !== "object") return null;
  return row as IRenamerTemplate;
}

export async function deleteTemplateFromDatabase(templateId: string): Promise<boolean> {
  const query = `mutation RunPluginOperation($plugin_id: ID!, $args: Map!) {
    runPluginOperation(plugin_id: $plugin_id, args: $args)
  }`;
  const variables = {
    plugin_id: "stash_renamer",
    args: {
      mode: "delete_template",
      delete_template: true,
      template_id: templateId,
    },
  };
  const result = await postGraphQL<any>(query, variables);
  const payload = result?.data?.runPluginOperation;
  const output = payload?.output || payload || {};
  return Boolean(output?.deleted);
}

export async function fetchSelectorsCatalogCached(force = false): Promise<any> {
  if (!force && selectorsCatalogCache) {
    return selectorsCatalogCache;
  }
  if (!force && selectorsCatalogInflight) {
    return selectorsCatalogInflight;
  }
  selectorsCatalogInflight = fetchSelectorsCatalog()
    .then((catalog) => {
      selectorsCatalogCache = catalog || {};
      return selectorsCatalogCache;
    })
    .finally(() => {
      selectorsCatalogInflight = null;
    });
  return selectorsCatalogInflight;
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
