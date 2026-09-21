import { HookSettingsTable, type IHookTemplateRow } from "./HookSettingsTable";
import { TemplateEditorModal } from "../template/TemplateEditorModal";
import { applySerializedFilterToModel } from "../../utils/editorHelpers";
import { ListFilterModel } from "../../models/list-filter/filter";
import type { ISlimSceneData } from "../../models/SlimSceneData";
import {
	fetchHookSettings,
	queryFindScenes,
	fetchSavedTemplates,
	type IRenamerTemplate,
	saveHookSettings,
} from "../../api/stasheroApi";

const PluginApi = window.PluginApi;
const React = PluginApi.React;
const { Button, Form, Modal, Spinner, Card, Alert } =
	PluginApi.libraries.Bootstrap;
const { Icon } = PluginApi.components;
const { faPlus } = PluginApi.libraries.FontAwesomeSolid;
const AUTO_SAVE_DEBOUNCE_MS = 300;

interface IHookSettingsModalProps {
	show?: boolean;
	hookType?: string;
	onHide?: () => void;
	onSaved?: () => void;
	inline?: boolean;
}

interface ITemplateEditorState {
	show: boolean;
	templateId: string;
	selectedTemplateId: string;
	filenameTemplate: string;
	pathTemplate: string;
	filenamePreviewSceneId: string;
	pathPreviewSceneId: string;
	scenes: ISlimSceneData[];
	loading: boolean;
}

function makeRow(templateId = ""): IHookTemplateRow {
	return {
		id: `${Date.now()}_${Math.random().toString(36).slice(2)}`,
		templateId: String(templateId || "").trim(),
	};
}

function toRows(templateIds: string[]): IHookTemplateRow[] {
	const ids = (templateIds || [])
		.map((id) => String(id || "").trim())
		.filter((id) => Boolean(id));
	if (ids.length === 0) return [makeRow("")];
	return ids.map((id) => makeRow(id));
}

function parseTemplateCriteriaFilter(template: IRenamerTemplate): {
	findFilter: any;
	sceneFilter: any;
} {
	const parsed = (() => {
		try {
			const raw = JSON.parse(String(template.filter_json || "[]"));
			if (Array.isArray(raw)) return { criteria: raw };
			return null;
		} catch {
			return null;
		}
	})();
	const base = new ListFilterModel(PluginApi.GQL.FilterMode.Scenes);
	const model = parsed ? applySerializedFilterToModel(parsed, base) : base;
	const rawFindFilter = (model.makeFindFilter() || {}) as Record<string, any>;
	const findFilter = {
		...rawFindFilter,
		page: 1,
		per_page: 5,
	};
	const sceneFilter = model.makeFilter();
	return { findFilter, sceneFilter };
}

const HookSettingsPanelInner: React.FC<IHookSettingsModalProps> = ({
	hookType = "Scene.Update.Post",
	onHide,
	onSaved,
}) => {
	const [templates, setTemplates] = React.useState<IRenamerTemplate[]>([]);
	const [enabled, setEnabled] = React.useState(false);
	const [rows, setRows] = React.useState<IHookTemplateRow[]>([makeRow("")]);
	const [loading, setLoading] = React.useState(false);
	const [saving, setSaving] = React.useState(false);
	const [status, setStatus] = React.useState("");
	const loadedRef = React.useRef(false);
	const lastSavedSignatureRef = React.useRef("");
	const saveInFlightRef = React.useRef(false);
	const queuedSaveRef = React.useRef<{
		signature: string;
		enabled: boolean;
		templateIds: string[];
	} | null>(null);
	const saveTimerRef = React.useRef<number | null>(null);
	const [editorState, setEditorState] = React.useState<ITemplateEditorState>({
		show: false,
		templateId: "",
		selectedTemplateId: "",
		filenameTemplate: "",
		pathTemplate: "",
		filenamePreviewSceneId: "",
		pathPreviewSceneId: "",
		scenes: [],
		loading: false,
	});

	const buildTemplateIds = React.useCallback((items: IHookTemplateRow[]) => {
		return items
			.map((row) => String(row.templateId || "").trim())
			.filter((id) => Boolean(id));
	}, []);

	const buildSignature = React.useCallback(
		(nextEnabled: boolean, templateIds: string[]) => {
			return JSON.stringify({ enabled: nextEnabled, templateIds });
		},
		[],
	);

	const runSave = React.useCallback(
		async (payload: {
			signature: string;
			enabled: boolean;
			templateIds: string[];
		}) => {
			if (saveInFlightRef.current) {
				queuedSaveRef.current = payload;
				return;
			}

			saveInFlightRef.current = true;
			setSaving(true);
			setStatus("");
			try {
				await saveHookSettings({
					hookType,
					enabled: payload.enabled,
					templateIds: payload.templateIds,
				});
				lastSavedSignatureRef.current = payload.signature;
				onSaved?.();
			} catch (e: any) {
				setStatus(`Error saving hook settings: ${e?.message || String(e)}`);
			} finally {
				saveInFlightRef.current = false;
				setSaving(false);

				const queued = queuedSaveRef.current;
				if (queued) {
					queuedSaveRef.current = null;
					if (queued.signature !== lastSavedSignatureRef.current) {
						void runSave(queued);
					}
				}
			}
		},
		[hookType, onSaved],
	);

	const load = React.useCallback(async () => {
		setLoading(true);
		setStatus("");
		try {
			const [allTemplates, hook] = await Promise.all([
				fetchSavedTemplates(),
				fetchHookSettings(hookType),
			]);
			setTemplates(allTemplates);
			setEnabled(Boolean(hook.enabled));
			const nextIds = Array.isArray(hook.template_ids) ? hook.template_ids : [];
			setRows(toRows(nextIds));
			const initialTemplateIds = nextIds
				.map((id) => String(id || "").trim())
				.filter((id) => Boolean(id));
			lastSavedSignatureRef.current = buildSignature(
				Boolean(hook.enabled),
				initialTemplateIds,
			);
			loadedRef.current = true;
		} catch (e: any) {
			setStatus(`Error loading hook settings: ${e?.message || String(e)}`);
		} finally {
			setLoading(false);
		}
	}, [buildSignature, hookType]);

	React.useEffect(() => {
		load();
	}, [load]);

	React.useEffect(() => {
		if (!loadedRef.current || loading) return;
		const templateIds = buildTemplateIds(rows);
		const signature = buildSignature(enabled, templateIds);
		if (signature === lastSavedSignatureRef.current) return;

		if (saveTimerRef.current !== null) {
			window.clearTimeout(saveTimerRef.current);
		}
		saveTimerRef.current = window.setTimeout(() => {
			void runSave({ signature, enabled, templateIds });
		}, AUTO_SAVE_DEBOUNCE_MS);

		return () => {
			if (saveTimerRef.current !== null) {
				window.clearTimeout(saveTimerRef.current);
				saveTimerRef.current = null;
			}
		};
	}, [buildSignature, buildTemplateIds, enabled, loading, rows, runSave]);

	const setRowTemplate = React.useCallback(
		(rowId: string, templateId: string) => {
			setRows((prev: IHookTemplateRow[]) =>
				prev.map((row) =>
					row.id === rowId
						? { ...row, templateId: String(templateId || "").trim() }
						: row,
				),
			);
		},
		[],
	);

	const addRow = React.useCallback(() => {
		setRows((prev: IHookTemplateRow[]) => [...prev, makeRow("")]);
	}, []);

	const removeRow = React.useCallback((rowId: string) => {
		setRows((prev: IHookTemplateRow[]) => {
			const next = prev.filter((row) => row.id !== rowId);
			return next.length > 0 ? next : [makeRow("")];
		});
	}, []);

	const openEditTemplate = React.useCallback(
		async (row: IHookTemplateRow) => {
			const template = templates.find(
				(item: IRenamerTemplate) => String(item.id) === String(row.templateId),
			);
			if (!template) {
				setStatus("Select a template before editing.");
				return;
			}

			setEditorState({
				show: true,
				templateId: String(template.id || ""),
				selectedTemplateId: String(template.id || ""),
				filenameTemplate: String(template.filename_template || ""),
				pathTemplate: String(template.path_template || ""),
				filenamePreviewSceneId: "",
				pathPreviewSceneId: "",
				scenes: [],
				loading: true,
			});

			try {
				const { findFilter, sceneFilter } =
					parseTemplateCriteriaFilter(template);
				const result = await queryFindScenes({
					filter: findFilter,
					sceneFilter,
				});
				const scenes = (result?.scenes || []).slice(0, 5) as ISlimSceneData[];
				const firstSceneId = String(scenes?.[0]?.id || "");
				setEditorState((prev: IHookTemplateRow[]) => ({
					...prev,
					scenes,
					filenamePreviewSceneId: firstSceneId,
					pathPreviewSceneId: firstSceneId,
					loading: false,
				}));
			} catch (error: unknown) {
				setEditorState((prev: IHookTemplateRow[]) => ({
					...prev,
					loading: false,
				}));
				setStatus(
					`Failed to load preview scenes for template: ${
						typeof error === "object" && error && "message" in error
							? String((error as { message?: unknown }).message || error)
							: String(error)
					}`,
				);
			}
		},
		[templates],
	);

	const closeEditor = React.useCallback(async () => {
		setEditorState((prev: IHookTemplateRow[]) => ({
			...prev,
			show: false,
			loading: false,
		}));
		try {
			const allTemplates = await fetchSavedTemplates();
			setTemplates(allTemplates);
		} catch {
			// no-op; keep stale list if refresh fails
		}
	}, []);

	return (
		<>
			<TemplateEditorModal
				show={editorState.show}
				onHide={closeEditor}
				filenameTemplate={editorState.filenameTemplate}
				pathTemplate={editorState.pathTemplate}
				onChangeFilenameTemplate={(next) =>
					setEditorState((prev: IHookTemplateRow[]) => ({
						...prev,
						filenameTemplate: next,
					}))
				}
				onChangePathTemplate={(next) =>
					setEditorState((prev: IHookTemplateRow[]) => ({
						...prev,
						pathTemplate: next,
					}))
				}
				selectedTemplateId={editorState.selectedTemplateId}
				onChangeSelectedTemplateId={(next) =>
					setEditorState((prev: IHookTemplateRow[]) => ({
						...prev,
						selectedTemplateId: next,
					}))
				}
				scenes={editorState.scenes}
				filenamePreviewSceneId={editorState.filenamePreviewSceneId}
				onChangeFilenamePreviewSceneId={(sceneId) =>
					setEditorState((prev: IHookTemplateRow[]) => ({
						...prev,
						filenamePreviewSceneId: sceneId,
					}))
				}
				pathPreviewSceneId={editorState.pathPreviewSceneId}
				onChangePathPreviewSceneId={(sceneId) =>
					setEditorState((prev: IHookTemplateRow[]) => ({
						...prev,
						pathPreviewSceneId: sceneId,
					}))
				}
			/>

			{editorState.loading && editorState.show ? (
				<div className="d-flex align-items-center gap-2 mb-2">
					<Spinner animation="border" size="sm" role="status" />
					<span>Loading template preview scenes...</span>
				</div>
			) : null}

			<Form.Group className="mb-3">
				<Form.Check
					id="scene-renamer-hook-enabled"
					type="switch"
					checked={enabled}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
						setEnabled(e.target.checked)
					}
					disabled={loading}
					label={`Enable ${hookType} hook`}
				/>
			</Form.Group>

			<div className="d-flex align-items-center justify-content-between mb-2">
				<div className="fw-bold">Templates to run (drag to reorder)</div>
				<Button variant="primary" size="sm" onClick={addRow} disabled={loading}>
					<Icon icon={faPlus} className="mr-1" /> Add Template
				</Button>
			</div>

			<HookSettingsTable
				tableName={`hook_settings_${hookType.replace(/[^a-z0-9]+/gi, "_").toLowerCase()}`}
				rows={rows}
				templates={templates}
				disabled={loading}
				onReorder={setRows}
				onTemplateChange={(row, templateId) =>
					setRowTemplate(row.id, templateId)
				}
				onEdit={openEditTemplate}
				onRemove={(row) => removeRow(row.id)}
			/>

			{status ? <div className="mt-3 text-muted">{status}</div> : null}

			{saving ? (
				<div className="d-flex align-items-center justify-content-end gap-2 mt-3 text-muted">
					<Spinner animation="border" size="sm" role="status" />
					<span>Saving changes...</span>
				</div>
			) : null}

			{onHide ? (
				<div className="d-flex justify-content-end gap-2 mt-3">
					<Button variant="secondary" onClick={onHide}>
						Close
					</Button>
				</div>
			) : null}
		</>
	);
};

export const HookSettingsModal: React.FC<IHookSettingsModalProps> = ({
	show = false,
	hookType = "Scene.Update.Post",
	onHide,
	onSaved,
	inline = false,
}) => {
	if (inline) {
		return (
			<Card>
				<Card.Header>
					<h6 className="mb-0">Hook Settings ({hookType})</h6>
				</Card.Header>
				<Card.Body>
					<HookSettingsPanelInner
						hookType={hookType}
						onHide={onHide}
						onSaved={onSaved}
					/>
				</Card.Body>
			</Card>
		);
	}

	return (
		<Modal show={show} onHide={onHide} centered size="xl">
			<Modal.Header closeButton>
				<Modal.Title>Hook Settings ({hookType})</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<HookSettingsPanelInner
					hookType={hookType}
					onHide={onHide}
					onSaved={onSaved}
				/>
			</Modal.Body>
		</Modal>
	);
};
