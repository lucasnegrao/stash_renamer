import type { StasheroApi } from "../stasheroApi";

const PluginApi = (window as any).PluginApi;
const { gql } = PluginApi.libraries.Apollo;

export type IScenePreviewResult = StasheroApi.IScenePreviewResult;
export type IOperationBatch = StasheroApi.IOperationBatch;
export type IRenamerTemplate = StasheroApi.IRenamerTemplate;
export type IHookSettings = StasheroApi.IHookSettings;
export type IWatchdogConfig = StasheroApi.IWatchdogConfig;
export type IWatchdogState = StasheroApi.IWatchdogState;

export interface ITokenTreeNode {
	name: string;
	token: string;
	children?: ITokenTreeNode[];
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

export interface IFindScenesResult {
	count: number;
	filesize: number;
	duration: number;
	scenes: any[];
}

export interface IGeneralConfigSnapshot {
	ffmpegPath: string;
}

let selectorsCatalogCache: any | null = null;
let selectorsCatalogInflight: Promise<any> | null = null;

// =========================================================================
// The Stashero API Singleton Client
// =========================================================================

export class StasheroApiClient {
	public readonly pluginId: string;

	constructor(pluginId: string) {
		this.pluginId = pluginId;
	}

	public get client() {
		return PluginApi.utils.StashService.getClient();
	}

	public async runOperation<T>(
		mode: string,
		args: Record<string, any> = {},
	): Promise<T> {
		const mutation = gql`
			mutation RunPluginOperation($plugin_id: ID!, $args: Map!) {
				runPluginOperation(plugin_id: $plugin_id, args: $args)
			}
		`;
		const result = await this.client.mutate({
			mutation,
			variables: { plugin_id: this.pluginId, args: { mode, ...args } },
			fetchPolicy: "no-cache",
		});
		const payload = result?.data?.runPluginOperation;
		return (payload?.output || payload || {}) as T;
	}

	public async runTask<T>(
		mode: string,
		args: Record<string, any> = {},
	): Promise<string | null> {
		const description = `${this.pluginId} ${mode.replace(":", " ")}`;

		const mutation = gql`
			mutation RunPluginTask($plugin_id: ID!, $description: String, $args_map: Map) {
				runPluginTask(
					plugin_id: $plugin_id,
					description: $description,
					args_map: $args_map
				)
			}
		`;
		const result = await this.client.mutate({
			mutation,
			variables: {
				plugin_id: this.pluginId,
				description,
				args_map: { mode, ...args },
			},
			fetchPolicy: "no-cache",
		});
		return result?.data?.runPluginTask
			? String(result.data.runPluginTask)
			: null;
	}

	public undo = {
		undo: (args: StasheroApi.Undo.IUndoArgs) =>
			this.runOperation<StasheroApi.Undo.IUndoResponse>("undo:undo", args),
		listOperations: () =>
			this.runOperation<StasheroApi.Undo.IListOperationsResponse>(
				"undo:list_operations",
			),
		listOperationBatches: () =>
			this.runOperation<StasheroApi.Undo.IListOperationBatchesResponse>(
				"undo:list_operation_batches",
			),
		listBatchOperations: (args: StasheroApi.Undo.IListBatchOperationsArgs) =>
			this.runOperation<StasheroApi.Undo.IListBatchOperationsResponse>(
				"undo:list_batch_operations",
				args,
			),
		undoBatchOperation: (args: StasheroApi.Undo.IUndoBatchOperationArgs) =>
			this.runTask("undo:undo_batch_operation", args),
		clearHistory: () =>
			this.runOperation<StasheroApi.Undo.IClearHistoryResponse>(
				"undo:clear_history",
			),
	};

	public template = {
		listTemplates: () =>
			this.runOperation<StasheroApi.Template.IListTemplatesResponse>(
				"template:list_templates",
			),
		saveTemplate: (args: StasheroApi.Template.ISaveTemplateArgs) =>
			this.runOperation<StasheroApi.Template.ISaveTemplateResponse>(
				"template:save_template",
				args,
			),
		updateTemplate: (args: StasheroApi.Template.IUpdateTemplateArgs) =>
			this.runOperation<StasheroApi.Template.IUpdateTemplateResponse>(
				"template:update_template",
				args,
			),
		deleteTemplate: (args: StasheroApi.Template.IDeleteTemplateArgs) =>
			this.runOperation<StasheroApi.Template.IDeleteTemplateResponse>(
				"template:delete_template",
				args,
			),
	};

	public hook = {
		getSettings: (args: StasheroApi.Hook.IGetSettingsArgs) =>
			this.runOperation<StasheroApi.Hook.IGetSettingsResponse>(
				"hook:get_settings",
				args,
			),
		saveSettings: (args: StasheroApi.Hook.ISaveSettingsArgs) =>
			this.runOperation<StasheroApi.Hook.ISaveSettingsResponse>(
				"hook:save_settings",
				args,
			),
		run: (args: StasheroApi.Hook.IRunArgs) =>
			this.runOperation<StasheroApi.Hook.IRunResponse>("hook:run", args),
	};

	public rename = {
		run: (args: StasheroApi.Rename.IRunArgs) =>
			this.runOperation<StasheroApi.Rename.IRunResponse>("rename:run", args),
		previewDryRun: (args: StasheroApi.Rename.IPreviewDryRunArgs) =>
			this.runOperation<StasheroApi.Rename.IPreviewDryRunResponse>(
				"rename:preview_dry_run",
				args,
			),
	};

	public watchdog = {
		run: (args: StasheroApi.Watchdog.IRunArgs = {}) =>
			this.runOperation<StasheroApi.Watchdog.IRunResponse>(
				"watchdog:run",
				args,
			),
		stop: (args: StasheroApi.Watchdog.IStopArgs = {}) =>
			this.runOperation<StasheroApi.Watchdog.IStopResponse>(
				"watchdog:stop",
				args,
			),
		status: (args: StasheroApi.Watchdog.IStatusArgs = {}) =>
			this.runOperation<StasheroApi.Watchdog.IStatusResponse>(
				"watchdog:status",
				args,
			),
		restart: (args: StasheroApi.Watchdog.IRestartArgs = {}) =>
			this.runOperation<StasheroApi.Watchdog.IRestartResponse>(
				"watchdog:restart",
				args,
			),
		saveConfig: (args: StasheroApi.Watchdog.ISaveConfigArgs) =>
			this.runOperation<StasheroApi.Watchdog.ISaveConfigResponse>(
				"watchdog:save_config",
				args,
			),
		listConfig: (args: StasheroApi.Watchdog.IListConfigArgs = {}) =>
			this.runOperation<StasheroApi.Watchdog.IListConfigResponse>(
				"watchdog:list_config",
				args,
			),
		reorderConfigs: (args: StasheroApi.Watchdog.IReorderArgs) =>
			this.runOperation<StasheroApi.Watchdog.IReorderResponse>(
				"watchdog:reorder",
				args,
			),
		deleteConfig: (args: StasheroApi.Watchdog.IDeleteConfigArgs) =>
			this.runOperation<StasheroApi.Watchdog.IDeleteConfigResponse>(
				"watchdog:delete_config",
				args,
			),
	};

	public system = {
		listSelectors: () =>
			this.runOperation<StasheroApi.System.IListSelectorsResponse>(
				"system:list_selectors",
			),
		ffmpegProxyEnableTask: (
			args: StasheroApi.System.IFFmpegProxyEnableArgs = {},
		) => this.runTask("system:ffmpeg_proxy_enable", args),
		ffmpegProxyReverseTask: (
			args: StasheroApi.System.IFFmpegProxyReverseArgs = {},
		) => this.runTask("system:ffmpeg_proxy_reverse", args),
	};
}

export const api = new StasheroApiClient("stash_renamer");

// =========================================================================
// Legacy Helpers (Delegating to API Singleton)
// =========================================================================

export async function queueRenameTask(args: {
	dryRun: boolean;
	template: string;
	pathTemplate: string;
	criteria: any[];
	excludedSceneIds?: string[];
	ids?: string[];
}): Promise<string | null> {
	return api.runTask("rename:run", {
		dry_run: args.dryRun,
		filename_template: args.template,
		path_template: args.pathTemplate,
		criteria: args.criteria || [],
		excluded_scene_ids: args.excludedSceneIds || [],
		ids: args.ids || [],
	});
}

export async function fetchJobById(jobId: string): Promise<ITaskJob | null> {
	const query = gql`
		query FindJob($input: FindJobInput!) {
			findJob(input: $input) {
				id status description progress error addTime startTime endTime subTasks
			}
		}
	`;
	const result = await api.client.query({
		query,
		variables: { input: { id: jobId } },
		fetchPolicy: "network-only",
	});
	return (result?.data?.findJob || null) as ITaskJob | null;
}

export function subscribeJobUpdates(
	jobId: string,
	handlers: {
		onUpdate: (job: ITaskJob) => void;
		onError?: (error: Error) => void;
	},
): () => void {
	const query = gql`
		subscription JobsSubscribe {
			jobsSubscribe {
				type
				job {
					id status description progress error addTime startTime endTime subTasks
				}
			}
		}
	`;

	const observable = api.client.subscribe({ query });
	const subscription = observable.subscribe({
		next: (result: any) => {
			try {
				const update = result?.data?.jobsSubscribe;
				const job = update?.job;
				if (!job || String(job.id) !== String(jobId)) return;
				handlers.onUpdate(job as ITaskJob);
			} catch (e: any) {
				if (handlers.onError)
					handlers.onError(e instanceof Error ? e : new Error(String(e)));
			}
		},
		error: (err: any) => {
			if (handlers.onError) handlers.onError(new Error(String(err)));
		},
	});

	return () => {
		subscription.unsubscribe();
	};
}

export async function previewRenameScenes(args: {
	template: string;
	pathTemplate: string;
	scenes: any[];
}): Promise<IScenePreviewResult[]> {
	const ids = (args.scenes || [])
		.map((scene: any) => String(scene?.id || ""))
		.filter((id: string) => Boolean(id));

	const res = await api.rename.previewDryRun({
		filename_template: args.template,
		path_template: args.pathTemplate,
		ids,
	});
	return res.operations || [];
}

export async function runDryRunForFilteredScenes(args: {
	template: string;
	pathTemplate: string;
	criteria: any[];
	excludedSceneIds?: string[];
	findFilter?: any;
	includeWarnError?: boolean;
}): Promise<IScenePreviewResult[]> {
	const res = await api.rename.run({
		dry_run: true,
		filename_template: args.template,
		path_template: args.pathTemplate,
		criteria: args.criteria,
		excluded_scene_ids: args.excludedSceneIds || [],
		find_filter: args.findFilter ?? null,
		include_warn_error: Boolean(args.includeWarnError),
	});
	return res.operations || [];
}

export async function queryFindScenesByIds(args: {
	filter?: any;
	sceneFilter?: any;
	ids: string[];
}): Promise<IFindScenesResult> {
	return queryFindScenes({
		filter: args.filter,
		sceneFilter: args.sceneFilter,
		ids: args.ids,
	});
}

export async function queryFindScenes(args: {
	filter?: any;
	sceneFilter?: any;
	ids?: string[];
}): Promise<IFindScenesResult> {
	const normalizedIds = (args.ids || [])
		.map((id) => String(id || "").trim())
		.filter((id) => Boolean(id));

	const query = gql`
		query FindScenesByIds($filter: FindFilterType, $scene_filter: SceneFilterType, $ids: [ID!]) {
			findScenes(filter: $filter, scene_filter: $scene_filter, ids: $ids) {
				count
				filesize
				duration
				scenes {
					id title code details director urls date rating100 o_counter organized
					interactive interactive_speed resume_time play_duration play_count
					files {
						id path size mod_time duration video_codec audio_codec width height frame_rate bit_rate
						fingerprints { type value }
					}
					paths { screenshot preview stream webp vtt sprite funscript interactive_heatmap caption }
					scene_markers { id title seconds primary_tag { id name } }
					galleries { id title files { path } folder { path } }
					studio { id name image_path }
					groups { scene_index group { id name front_image_path } }
					tags { id name }
					performers { id name disambiguation gender favorite image_path }
					stash_ids { endpoint stash_id updated_at }
				}
			}
		}
	`;

	const result = await api.client.query({
		query,
		variables: {
			filter: args.filter ?? null,
			scene_filter: args.sceneFilter ?? null,
			ids: normalizedIds.length > 0 ? normalizedIds : null,
		},
		fetchPolicy: "network-only",
	});
	const row = result?.data?.findScenes || {};
	return {
		count: Number(row?.count || 0),
		filesize: Number(row?.filesize || 0),
		duration: Number(row?.duration || 0),
		scenes: Array.isArray(row?.scenes) ? row.scenes : [],
	};
}

export async function fetchOperationBatches(): Promise<IOperationBatch[]> {
	const res = await api.undo.listOperationBatches();
	return res.batches || [];
}

export async function fetchBatchOperations(
	batchId: string,
): Promise<IScenePreviewResult[]> {
	const res = await api.undo.listBatchOperations({ batch_id: batchId });
	return res.operations || [];
}

export async function undoBatchOperation(
	batchId: string,
): Promise<string | null> {
	return api.undo.undoBatchOperation({ batch_id: batchId });
}

export async function undoOperation(operationId: string): Promise<any> {
	return api.undo.undo({ undo_operation_id: operationId });
}

export async function clearHistory(): Promise<{
	deleted_operations?: number;
	deleted_batches?: number;
}> {
	return api.undo.clearHistory();
}

export async function fetchSelectorsCatalog(): Promise<any> {
	return api.system.listSelectors();
}

export async function fetchGeneralConfigSnapshot(): Promise<IGeneralConfigSnapshot> {
	const query = gql`
		query GetGeneralConfigSnapshot {
			configuration {
				general {
					ffmpegPath
				}
			}
		}
	`;
	const result = await api.client.query({
		query,
		// Avoid writing partial configuration payloads into Apollo cache.
		fetchPolicy: "no-cache",
	});
	const ffmpegPath = String(
		result?.data?.configuration?.general?.ffmpegPath || "",
	).trim();
	return { ffmpegPath };
}

export async function installFfmpegProxyServiceTask(): Promise<string | null> {
	return api.system.ffmpegProxyEnableTask({});
}

export async function uninstallFfmpegProxyServiceTask(): Promise<
	string | null
> {
	return api.system.ffmpegProxyReverseTask({});
}

export async function fetchSavedTemplates(): Promise<IRenamerTemplate[]> {
	const res = await api.template.listTemplates();
	return res.templates || [];
}

export async function saveTemplateToDatabase(args: {
	name: string;
	filenameTemplate: string;
	pathTemplate: string;
	criteria?: any[];
}): Promise<IRenamerTemplate | null> {
	const res = await api.template.saveTemplate({
		template_name: args.name,
		filename_template: args.filenameTemplate,
		path_template: args.pathTemplate,
		criteria: args.criteria || [],
	});
	return res.template || null;
}

export async function updateTemplateInDatabase(args: {
	id: string;
	name: string;
	filenameTemplate: string;
	pathTemplate: string;
	criteria?: any[];
}): Promise<IRenamerTemplate | null> {
	const res = await api.template.updateTemplate({
		template_id: args.id,
		template_name: args.name,
		filename_template: args.filenameTemplate,
		path_template: args.pathTemplate,
		criteria: args.criteria || [],
	});
	return res.template || null;
}

export async function deleteTemplateFromDatabase(
	templateId: string,
): Promise<boolean> {
	const res = await api.template.deleteTemplate({ template_id: templateId });
	return Boolean(res.deleted);
}

export async function fetchHookSettings(
	hookType = "Scene.Update.Post",
): Promise<IHookSettings> {
	const res = await api.hook.getSettings({ hook_type: hookType });
	const hook = res.hook_settings || {};
	return {
		hook_type: String(hook?.hook_type || hookType),
		enabled: Boolean(hook?.enabled),
		template_ids: Array.isArray(hook?.template_ids)
			? hook.template_ids.map(String)
			: [],
	};
}

export async function saveHookSettings(args: {
	hookType?: string;
	enabled: boolean;
	templateIds: string[];
}): Promise<IHookSettings> {
	const res = await api.hook.saveSettings({
		hook_type: String(args.hookType || "Scene.Update.Post"),
		enabled: Boolean(args.enabled),
		template_ids: (args.templateIds || [])
			.map((id) => String(id || "").trim())
			.filter(Boolean),
	});
	const hook = res.hook_settings || {};
	return {
		hook_type: String(hook?.hook_type || args.hookType || "Scene.Update.Post"),
		enabled: Boolean(hook?.enabled),
		template_ids: Array.isArray(hook?.template_ids)
			? hook.template_ids.map(String)
			: [],
	};
}

export async function fetchWatchdogConfigs(): Promise<IWatchdogConfig[]> {
	const res = await api.watchdog.listConfig();
	const rows = Array.isArray(res?.watchdog?.configs)
		? res.watchdog.configs
		: [];
	return rows.map((row: any) => {
		const rawEnabled = row?.enabled;
		const normalizedEnabled =
			rawEnabled === true ||
			rawEnabled === 1 ||
			rawEnabled === "1" ||
			String(rawEnabled || "").toLowerCase() === "true";
		return {
			...row,
			id: String(row?.id || ""),
			path: String(row?.path || ""),
			operation: String(row?.operation || ""),
			enabled: normalizedEnabled,
		} as IWatchdogConfig;
	});
}

export async function reorderWatchdogConfigs(
	path: string,
	configIds: string[],
): Promise<boolean> {
	const res = await api.watchdog.reorderConfigs({ path, configIds });
	return Boolean(res?.watchdog?.restarted);
}

export async function deleteWatchdogConfigFromDatabase(
	configId: string,
): Promise<{ deleted: boolean; id: string; restarted: boolean }> {
	const res = await api.watchdog.deleteConfig({ id: String(configId || "") });
	const watchdog = res?.watchdog || {};
	return {
		deleted: Boolean(watchdog.deleted),
		id: String(watchdog.id || configId || ""),
		restarted: Boolean(watchdog.restarted),
	};
}

export async function saveWatchdogConfigToDatabase(
	args: StasheroApi.Watchdog.ISaveConfigArgs,
): Promise<{ config: IWatchdogConfig; restarted: boolean } | null> {
	const res = await api.watchdog.saveConfig(args);
	return res?.watchdog || null;
}

export async function runWatchdog(
	args: StasheroApi.Watchdog.IRunArgs = {},
): Promise<IWatchdogState> {
	const res = await api.watchdog.run(args);
	return (res?.watchdog || { status: "stopped" }) as IWatchdogState;
}

export async function stopWatchdog(
	args: StasheroApi.Watchdog.IStopArgs = {},
): Promise<IWatchdogState> {
	const res = await api.watchdog.stop(args);
	return (res?.watchdog || { status: "stopped" }) as IWatchdogState;
}

export async function restartWatchdog(
	args: StasheroApi.Watchdog.IRestartArgs = {},
): Promise<IWatchdogState> {
	const res = await api.watchdog.restart(args);
	return (res?.watchdog || { status: "stopped" }) as IWatchdogState;
}

export async function fetchWatchdogStatus(
	args: StasheroApi.Watchdog.IStatusArgs = {},
): Promise<IWatchdogState> {
	const res = await api.watchdog.status(args);
	return (res?.watchdog || { status: "stopped" }) as IWatchdogState;
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

	const isSceneToken = (token: string) => {
		const raw = String(token || "").trim();
		if (!raw) return false;
		if (raw.startsWith("$scene.")) return true;
		// Liquid variable expression form: {{ scene.foo }}
		return /^\{\{\s*scene(?:[.[]|$)/.test(raw);
	};

	const virtualTokens: string[] = Array.isArray(catalog?.virtual_selectors)
		? catalog.virtual_selectors
				.map((v: any) => String(v?.selector || ""))
				.filter((s: string) => isSceneToken(s))
		: [];
	const virtualNodes: ITokenTreeNode[] = virtualTokens.map((token) => ({
		name: token,
		token,
		children: [],
	}));

	return [...treeFromOutput, ...virtualNodes].filter((n: any) => {
		if (!n || typeof n.token !== "string") return false;
		return isSceneToken(n.token);
	});
}
