/**
 * Stashero / Stash Renamer Backend API Definitions
 *
 * This file contains the strict TypeScript interfaces for all backend operations
 * supported by the plugin, mapping directly to the Python router modes.
 */

export namespace StasheroApi {
	// =========================================================================
	// Core Entities
	// =========================================================================

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
		old_name?: string;
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
		filter_json?: string;
		created_at: string;
	}

	export interface IHookSettings {
		hook_type: string;
		enabled: boolean;
		template_ids: string[];
	}

	export interface IWatchdogConfigOptions {
		event_types?: Array<"modified" | "created" | "deleted" | "moved">;
		recursive?: boolean;
		debounce_seconds?: number;
		request_timeout_seconds?: number;
		variables?: Record<string, any>;
	}

	export interface IWatchdogConfig {
		id: string;
		path: string;
		operation: string;
		enabled: boolean;
		options?: IWatchdogConfigOptions;
		sort_order?: number;
	}

	export interface IWatchdogState {
		status: "running" | "stopped" | string;
		pid?: number | null;
		enabled_configs?: number;
		active_items?: number;
		stopped?: boolean;
		message?: string;
	}

	// =========================================================================
	// 1. Undo Operations (Prefix: `undo:`)
	// =========================================================================
	export namespace Undo {
		/** mode: 'undo:undo' */
		export interface IUndoArgs {
			undo_operation_id: string;
		}
		export interface IUndoResponse {
			undo_operation_id: string;
			original_operation_id: string;
			scene_id: string;
			old_path: string;
			new_path: string;
			old_name: string;
			new_name: string;
		}

		/** mode: 'undo:list_operations' */
		export type IListOperationsArgs = {};
		export type IListOperationsResponse = IScenePreviewResult[];

		/** mode: 'undo:list_operation_batches' */
		export type IListOperationBatchesArgs = {};
		export interface IListOperationBatchesResponse {
			batches: IOperationBatch[];
		}

		/** mode: 'undo:list_batch_operations' */
		export interface IListBatchOperationsArgs {
			batch_id: string;
		}
		export interface IListBatchOperationsResponse {
			operations: IScenePreviewResult[];
		}

		/** mode: 'undo:undo_batch_operation' */
		export interface IUndoBatchOperationArgs {
			batch_id: string;
		}
		export interface IUndoBatchOperationResponse {
			batch_id: string;
			total: number;
			success: number;
			errors: string[];
		}

		/** mode: 'undo:clear_history' */
		export type IClearHistoryArgs = {};
		export interface IClearHistoryResponse {
			deleted_operations?: number;
			deleted_batches?: number;
		}
	}

	// =========================================================================
	// 2. Template Operations (Prefix: `template:`)
	// =========================================================================
	export namespace Template {
		/** mode: 'template:list_templates' */
		export type IListTemplatesArgs = {};
		export interface IListTemplatesResponse {
			templates: IRenamerTemplate[];
		}

		/** mode: 'template:save_template' */
		export interface ISaveTemplateArgs {
			template_name: string;
			filename_template: string;
			path_template?: string;
			criteria?: any[];
		}
		export interface ISaveTemplateResponse {
			template: IRenamerTemplate;
		}

		/** mode: 'template:update_template' */
		export interface IUpdateTemplateArgs {
			template_id: string;
			template_name: string;
			filename_template: string;
			path_template?: string;
			criteria?: any[];
		}
		export interface IUpdateTemplateResponse {
			template: IRenamerTemplate;
		}

		/** mode: 'template:delete_template' */
		export interface IDeleteTemplateArgs {
			template_id: string;
		}
		export interface IDeleteTemplateResponse {
			deleted: boolean;
			template_id: string;
		}
	}

	// =========================================================================
	// 3. Hook Operations (Prefix: `hook:`)
	// =========================================================================
	export namespace Hook {
		/** mode: 'hook:get_settings' */
		export interface IGetSettingsArgs {
			hook_type?: string; // defaults to "Scene.Update.Post"
		}
		export interface IGetSettingsResponse {
			hook_settings: IHookSettings;
		}

		/** mode: 'hook:save_settings' */
		export interface ISaveSettingsArgs {
			hook_type?: string; // defaults to "Scene.Update.Post"
			enabled: boolean;
			template_ids: string[];
		}
		export interface ISaveSettingsResponse {
			hook_settings: IHookSettings;
		}

		/** mode: 'hook:run' */
		export interface IRunArgs {
			hookContext: {
				type: string;
				id: string;
			};
			hook_type?: string;
		}
		export interface IRunResponse {
			hook_type: string;
			scene_id: string;
			enabled: boolean;
			executed: Array<{
				template_id: string;
				template_name: string;
				matched: boolean;
				batch_id?: string;
				operations: IScenePreviewResult[];
			}>;
		}
	}

	// =========================================================================
	// 4. Rename Operations (Prefix: `rename:`)
	// =========================================================================
	export namespace Rename {
		export interface IBaseRenameArgs {
			filename_template: string;
			path_template?: string | null;
			ids?: string[];
			criteria?: any[];
			excluded_scene_ids?: string[];
			find_filter?: any;
			include_warn_error?: boolean;
			batch_id?: string;
			batch_mode?: string;
		}

		/** mode: 'rename:run' */
		export interface IRunArgs extends IBaseRenameArgs {
			dry_run?: boolean;
		}
		export interface IRunResponse {
			batch_id?: string;
			operations: IScenePreviewResult[];
		}

		/** mode: 'rename:preview_dry_run' */
		export interface IPreviewDryRunArgs extends IBaseRenameArgs {}
		export interface IPreviewDryRunResponse {
			operations: IScenePreviewResult[];
		}
	}

	// =========================================================================
	// 5. System Operations (Prefix: `system:`)
	// =========================================================================
	export namespace System {
		/** mode: 'system:list_selectors' */
		export type IListSelectorsArgs = {};
		export interface IListSelectorsResponse {
			roots: Array<{
				root: string;
				token: string;
				fields: string[];
				examples: string[];
			}>;
			fields_by_root: Record<string, string[]>;
			scene_tree: any[];
			virtual_selectors: Array<{
				selector: string;
				description: string;
			}>;
			syntax: Record<string, string>;
		}

		/** mode: 'system:ffmpeg_proxy_enable' */
		export type IFFmpegProxyEnableArgs = {};

		/** mode: 'system:ffmpeg_proxy_reverse' */
		export type IFFmpegProxyReverseArgs = {};
	}

	// =========================================================================
	// 6. Watchdog Operations (Prefix: `watchdog:`)
	// =========================================================================
	export namespace Watchdog {
		/** mode: 'watchdog:run' */
		export interface IRunArgs {
			watchdog_runtime_dir?: string;
		}
		export interface IRunResponse {
			watchdog: IWatchdogState;
		}

		/** mode: 'watchdog:stop' */
		export interface IStopArgs {
			watchdog_runtime_dir?: string;
		}
		export interface IStopResponse {
			watchdog: IWatchdogState;
		}

		/** mode: 'watchdog:status' */
		export interface IStatusArgs {
			watchdog_runtime_dir?: string;
		}
		export interface IStatusResponse {
			watchdog: IWatchdogState;
		}

		/** mode: 'watchdog:restart' (and alias: 'watchdog:configure') */
		export interface IRestartArgs {
			watchdog_runtime_dir?: string;
		}
		export interface IRestartResponse {
			watchdog: IWatchdogState;
		}

		/** mode: 'watchdog:save_config' */
		export interface ISaveConfigArgs {
			id?: string;
			path: string;
			operation: string;
			enabled?: boolean;
			options?: IWatchdogConfigOptions | Record<string, any> | string;
			watchdog_runtime_dir?: string;
		}
		export interface ISaveConfigResponse {
			watchdog: {
				config: IWatchdogConfig;
				restarted: boolean;
			};
		}

		/** mode: 'watchdog:list_config' */
		export type IListConfigArgs = {};
		export interface IListConfigResponse {
			watchdog: {
				configs: IWatchdogConfig[];
			};
		}

		/** mode: 'watchdog:reorder' */
		export interface IReorderArgs {
			path: string;
			configIds: string[];
		}
		export interface IReorderResponse {
			watchdog: {
				restarted: boolean;
			};
		}

		/** mode: 'watchdog:delete_config' */
		export interface IDeleteConfigArgs {
			id: string;
			watchdog_runtime_dir?: string;
		}
		export interface IDeleteConfigResponse {
			watchdog: {
				deleted: boolean;
				id: string;
				restarted: boolean;
			};
		}
	}
}
