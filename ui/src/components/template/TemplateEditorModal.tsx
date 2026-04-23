import type { ISlimSceneData } from "../../models/SlimSceneData";
import {
	loadFromLocalStorage,
	saveToLocalStorage,
} from "../../services/browserStorage";
import {
	extractSceneTokenTree,
	fetchSelectorsCatalogCached,
	type IRenamerTemplate,
	type IScenePreviewResult,
	type ITokenTreeNode,
	previewRenameScenes,
} from "../../api/sceneRenamerApi";
import {
	getTemplateById,
	isTemplateDirty,
} from "../../services/templateCrudService";
import {
	deleteTemplate,
	loadTemplates,
	saveExistingTemplate,
	saveTemplateAs,
} from "../../services/templateStore";
import { SceneTokenSelector } from "./SceneTokenSelector";
import { TemplateManagerBar } from "./TemplateManagerBar";
import {
	type ITemplateCodeEditorHandle,
	TemplateCodeEditor,
} from "./TemplateCodeEditor";

const PluginApi = window.PluginApi;
const React = PluginApi.React;
const { Button, Form, Modal, Spinner, Alert } = PluginApi.libraries.Bootstrap;

const LAST_TEMPLATE_ID_STORAGE_KEY = "test_filter:last_template_id";

interface ITemplateEditorModalProps {
	show: boolean;
	onHide: () => void;
	filenameTemplate: string;
	pathTemplate: string;
	onChangeFilenameTemplate: (next: string) => void;
	onChangePathTemplate: (next: string) => void;
	selectedTemplateId?: string;
	onChangeSelectedTemplateId?: (templateId: string) => void;
	scenes: ISlimSceneData[];
	filenamePreviewSceneId: string;
	onChangeFilenamePreviewSceneId: (sceneId: string) => void;
	pathPreviewSceneId: string;
	onChangePathPreviewSceneId: (sceneId: string) => void;
}

type TPreviewTarget = "filename" | "path";

function getSceneLabel(scene: ISlimSceneData): string {
	const title = String(scene?.title || "").trim();
	const path = String(scene?.files?.[0]?.path || "").trim();
	if (title) return title;
	if (path) return path.split(/[\\/]/).pop() || path;
	return String(scene?.id || "-");
}

function joinOutputPath(pathValue: string, fileValue: string): string {
	const p = String(pathValue || "").trim();
	const f = String(fileValue || "").trim();
	if (!p) return f;
	if (!f) return p;
	const normalizedP = p.replace(/[\\/]+$/, "");
	const normalizedF = f.replace(/^[\\/]+/, "");
	const sep = normalizedP.includes("\\") ? "\\" : "/";
	return `${normalizedP}${sep}${normalizedF}`;
}

export const TemplateEditorModal: React.FC<ITemplateEditorModalProps> = ({
	show,
	onHide,
	filenameTemplate,
	pathTemplate,
	onChangeFilenameTemplate,
	onChangePathTemplate,
	selectedTemplateId,
	onChangeSelectedTemplateId,
	scenes,
	filenamePreviewSceneId,
	onChangeFilenamePreviewSceneId,
	pathPreviewSceneId,
	onChangePathPreviewSceneId,
}) => {
	const editorHandlesRef = React.useRef<
		Record<TPreviewTarget, ITemplateCodeEditorHandle | null>
	>({
		filename: null,
		path: null,
	});

	const [draftFilenameTemplate, setDraftFilenameTemplate] = React.useState(
		String(filenameTemplate || ""),
	);
	const [draftPathTemplate, setDraftPathTemplate] = React.useState(
		String(pathTemplate || ""),
	);
	const [draftFilenamePreviewSceneId, setDraftFilenamePreviewSceneId] =
		React.useState(String(filenamePreviewSceneId || ""));
	const [draftPathPreviewSceneId, setDraftPathPreviewSceneId] = React.useState(
		String(pathPreviewSceneId || ""),
	);
	const [activeTarget, setActiveTarget] =
		React.useState<TPreviewTarget>("filename");
	const [tokenTree, setTokenTree] = React.useState<ITokenTreeNode[]>([]);
	const [loadingTokens, setLoadingTokens] = React.useState(false);
	const [previewBusyByTarget, setPreviewBusyByTarget] = React.useState<
		Record<TPreviewTarget, boolean>
	>({ filename: false, path: false });
	const [previewTextByTarget, setPreviewTextByTarget] = React.useState<
		Record<TPreviewTarget, string>
	>({
		filename: "Select a scene to preview filename output.",
		path: "Select a scene to preview path output.",
	});
	const [previewErrorByTarget, setPreviewErrorByTarget] = React.useState<
		Record<TPreviewTarget, string>
	>({ filename: "", path: "" });
	const [livePreviewEnabled, setLivePreviewEnabled] = React.useState(true);
	const [statusMessage, setStatusMessage] = React.useState("");

	const [savedTemplates, setSavedTemplates] = React.useState<
		IRenamerTemplate[]
	>([]);
	const [selectedSavedTemplateId, setSelectedSavedTemplateId] =
		React.useState("");
	const selectedSavedTemplateIdRef = React.useRef("");
	const [isSavingTemplate, setIsSavingTemplate] = React.useState(false);
	const [isDeletingTemplate, setIsDeletingTemplate] = React.useState(false);
	const [templatesLoaded, setTemplatesLoaded] = React.useState(false);

	const hasScenes = Array.isArray(scenes) && scenes.length > 0;

	const selectedFilenameScene = React.useMemo(
		() =>
			scenes.find(
				(scene) => String(scene.id) === String(draftFilenamePreviewSceneId),
			),
		[scenes, draftFilenamePreviewSceneId],
	);
	const selectedPathScene = React.useMemo(
		() =>
			scenes.find(
				(scene) => String(scene.id) === String(draftPathPreviewSceneId),
			),
		[scenes, draftPathPreviewSceneId],
	);

	const selectedTemplate = React.useMemo(
		() => getTemplateById(savedTemplates, selectedSavedTemplateId),
		[savedTemplates, selectedSavedTemplateId],
	);
	const isSelectedTemplateDirty = React.useMemo(
		() =>
			isTemplateDirty({
				selectedTemplate,
				filenameTemplate: draftFilenameTemplate,
				pathTemplate: draftPathTemplate,
				currentFilter: { criteria: [] },
			}),
		[selectedTemplate, draftFilenameTemplate, draftPathTemplate],
	);

	const emitDraftToCaller = React.useCallback(() => {
		onChangeFilenameTemplate(String(draftFilenameTemplate || ""));
		onChangePathTemplate(String(draftPathTemplate || ""));
		onChangeFilenamePreviewSceneId(String(draftFilenamePreviewSceneId || ""));
		onChangePathPreviewSceneId(String(draftPathPreviewSceneId || ""));
		onChangeSelectedTemplateId?.(String(selectedSavedTemplateId || "").trim());
	}, [
		draftFilenameTemplate,
		draftPathTemplate,
		draftFilenamePreviewSceneId,
		draftPathPreviewSceneId,
		selectedSavedTemplateId,
		onChangeFilenameTemplate,
		onChangePathTemplate,
		onChangeFilenamePreviewSceneId,
		onChangePathPreviewSceneId,
		onChangeSelectedTemplateId,
	]);

	const loadSavedTemplates = React.useCallback(async (preferredId?: string) => {
		try {
			const currentSelectedId = String(
				selectedSavedTemplateIdRef.current || "",
			).trim();
			const keepId = String(
				preferredId ||
					currentSelectedId ||
					loadFromLocalStorage<string>(LAST_TEMPLATE_ID_STORAGE_KEY, "") ||
					"",
			).trim();
			const loaded = await loadTemplates(
				currentSelectedId,
				false,
				keepId || undefined,
			);
			setSavedTemplates(loaded.templates);
			setSelectedSavedTemplateId(loaded.nextSelectedId);
		} catch (e: unknown) {
			setStatusMessage(
				`Error loading templates: ${
					typeof e === "object" && e && "message" in e
						? String((e as { message?: unknown }).message || e)
						: String(e)
				}`,
			);
		} finally {
			setTemplatesLoaded(true);
		}
	}, []);

	React.useEffect(() => {
		selectedSavedTemplateIdRef.current = String(selectedSavedTemplateId || "");
	}, [selectedSavedTemplateId]);

	React.useEffect(() => {
		if (!show) return;
		setDraftFilenameTemplate(String(filenameTemplate || ""));
		setDraftPathTemplate(String(pathTemplate || ""));
		setDraftFilenamePreviewSceneId(String(filenamePreviewSceneId || ""));
		setDraftPathPreviewSceneId(String(pathPreviewSceneId || ""));
		setSelectedSavedTemplateId(String(selectedTemplateId || "").trim());
		setStatusMessage("");
		setTemplatesLoaded(false);
		loadSavedTemplates(String(selectedTemplateId || "").trim()).catch(
			() => undefined,
		);
	}, [
		show,
		filenameTemplate,
		pathTemplate,
		selectedTemplateId,
		filenamePreviewSceneId,
		pathPreviewSceneId,
		loadSavedTemplates,
	]);

	React.useEffect(() => {
		if (!show) return;
		let active = true;
		setLoadingTokens(true);
		fetchSelectorsCatalogCached()
			.then((catalog) => {
				if (!active) return;
				setTokenTree(extractSceneTokenTree(catalog));
			})
			.catch((e) => {
				if (!active) return;
				console.error("[Scene Renamer] Failed to load selector catalog", e);
				setTokenTree([]);
			})
			.finally(() => {
				if (active) setLoadingTokens(false);
			});
		return () => {
			active = false;
		};
	}, [show]);

	const insertToken = React.useCallback(
		(token: string) => {
			const targetEditor = editorHandlesRef.current[activeTarget];
			const current =
				activeTarget === "filename"
					? String(draftFilenameTemplate || "")
					: String(draftPathTemplate || "");
			const setValue =
				activeTarget === "filename"
					? setDraftFilenameTemplate
					: setDraftPathTemplate;
			if (!targetEditor) {
				setValue(`${current}${token}`);
				return;
			}
			targetEditor.insertTokenAtCursor(token);
		},
		[activeTarget, draftFilenameTemplate, draftPathTemplate],
	);

	const runPreview = React.useCallback(
		async (target: TPreviewTarget) => {
			if (!hasScenes) return;
			const scene =
				target === "filename" ? selectedFilenameScene : selectedPathScene;
			if (!scene) {
				setPreviewErrorByTarget((prev) => ({ ...prev, [target]: "" }));
				setPreviewTextByTarget((prev) => ({
					...prev,
					[target]:
						target === "filename"
							? "Select a scene to preview filename output."
							: "Select a scene to preview path output.",
				}));
				return;
			}

			setPreviewBusyByTarget((prev) => ({ ...prev, [target]: true }));
			setPreviewErrorByTarget((prev) => ({ ...prev, [target]: "" }));
			try {
				const result = await previewRenameScenes({
					template: draftFilenameTemplate,
					pathTemplate: draftPathTemplate,
					scenes: [scene],
				});
				const row = (result?.[0] || {}) as IScenePreviewResult;
				const nextPath = String(row?.new_path || "").trim();
				const nextName = String(
					row?.new_filename || row?.new_name || "",
				).trim();
				const msg = String(row?.log || row?.error || "").trim();

				const nextText =
					target === "filename"
						? nextName || msg || "No filename output returned."
						: joinOutputPath(nextPath, nextName) ||
							msg ||
							"No path output returned.";
				setPreviewTextByTarget((prev) => ({ ...prev, [target]: nextText }));
			} catch (e: unknown) {
				setPreviewErrorByTarget((prev) => ({
					...prev,
					[target]: `Preview failed: ${
						typeof e === "object" && e && "message" in e
							? String((e as { message?: unknown }).message || e)
							: String(e)
					}`,
				}));
			} finally {
				setPreviewBusyByTarget((prev) => ({ ...prev, [target]: false }));
			}
		},
		[
			hasScenes,
			draftFilenameTemplate,
			draftPathTemplate,
			selectedFilenameScene,
			selectedPathScene,
		],
	);

	React.useEffect(() => {
		if (!show || !hasScenes || !livePreviewEnabled) return;
		if (!selectedFilenameScene) return;
		const timer = window.setTimeout(() => {
			runPreview("filename").catch(() => undefined);
		}, 300);
		return () => window.clearTimeout(timer);
	}, [
		show,
		hasScenes,
		livePreviewEnabled,
		selectedFilenameScene,
		draftFilenameTemplate,
		draftPathTemplate,
		runPreview,
	]);

	React.useEffect(() => {
		if (!show || !hasScenes || !livePreviewEnabled) return;
		if (!selectedPathScene) return;
		const timer = window.setTimeout(() => {
			runPreview("path").catch(() => undefined);
		}, 300);
		return () => window.clearTimeout(timer);
	}, [
		show,
		hasScenes,
		livePreviewEnabled,
		selectedPathScene,
		draftFilenameTemplate,
		draftPathTemplate,
		runPreview,
	]);

	const onSelectTemplate = React.useCallback(
		(templateId: string) => {
			const selected = savedTemplates.find(
				(row) => String(row.id) === String(templateId),
			);
			if (!selected) return;
			setSelectedSavedTemplateId(String(selected.id));
			saveToLocalStorage(LAST_TEMPLATE_ID_STORAGE_KEY, String(selected.id));
			setDraftFilenameTemplate(String(selected.filename_template || ""));
			setDraftPathTemplate(String(selected.path_template || ""));
			setStatusMessage(`Loaded template "${selected.name}"`);
		},
		[savedTemplates],
	);

	const reloadSelectedTemplate = React.useCallback(() => {
		if (!selectedTemplate) return;
		setDraftFilenameTemplate(String(selectedTemplate.filename_template || ""));
		setDraftPathTemplate(String(selectedTemplate.path_template || ""));
		setStatusMessage(`Reloaded template "${selectedTemplate.name}"`);
	}, [selectedTemplate]);

	const saveSelectedTemplateToDatabase = React.useCallback(async () => {
		if (!selectedTemplate) {
			setStatusMessage("Select a saved template first.");
			return false;
		}
		setIsSavingTemplate(true);
		try {
			const updated = await saveExistingTemplate({
				id: String(selectedTemplate.id),
				name: String(selectedTemplate.name || ""),
				filenameTemplate: String(draftFilenameTemplate || ""),
				pathTemplate: String(draftPathTemplate || ""),
				criteria: [],
			});
			await loadSavedTemplates(String(updated?.id || selectedTemplate.id));
			setStatusMessage(
				updated ? `Updated template "${updated.name}".` : "Template updated.",
			);
			return true;
		} catch (e: unknown) {
			setStatusMessage(
				`Error saving template: ${
					typeof e === "object" && e && "message" in e
						? String((e as { message?: unknown }).message || e)
						: String(e)
				}`,
			);
			return false;
		} finally {
			setIsSavingTemplate(false);
		}
	}, [
		selectedTemplate,
		draftFilenameTemplate,
		draftPathTemplate,
		loadSavedTemplates,
	]);

	const saveAsCurrentTemplateToDatabase = React.useCallback(
		async (name: string) => {
			const trimmedName = String(name || "").trim();
			if (!trimmedName) {
				setStatusMessage("Template name is required.");
				return;
			}
			setIsSavingTemplate(true);
			try {
				const saved = await saveTemplateAs({
					name: trimmedName,
					filenameTemplate: String(draftFilenameTemplate || ""),
					pathTemplate: String(draftPathTemplate || ""),
					criteria: [],
				});
				await loadSavedTemplates(String(saved?.id || ""));
				if (saved?.id) {
					setSelectedSavedTemplateId(String(saved.id));
					saveToLocalStorage(LAST_TEMPLATE_ID_STORAGE_KEY, String(saved.id));
				}
				setStatusMessage(
					saved ? `Saved template "${saved.name}".` : "Template saved.",
				);
			} catch (e: unknown) {
				setStatusMessage(
					`Error saving template: ${
						typeof e === "object" && e && "message" in e
							? String((e as { message?: unknown }).message || e)
							: String(e)
					}`,
				);
			} finally {
				setIsSavingTemplate(false);
			}
		},
		[draftFilenameTemplate, draftPathTemplate, loadSavedTemplates],
	);

	const deleteSelectedTemplate = React.useCallback(async () => {
		if (!selectedTemplate) {
			setStatusMessage("Select a saved template first.");
			return;
		}
		setIsDeletingTemplate(true);
		try {
			const deleted = await deleteTemplate(String(selectedTemplate.id));
			if (!deleted) {
				setStatusMessage(
					`Template "${selectedTemplate.name}" could not be deleted.`,
				);
				return;
			}
			await loadSavedTemplates();
			setSelectedSavedTemplateId("");
			setStatusMessage(`Deleted template "${selectedTemplate.name}".`);
		} catch (e: unknown) {
			setStatusMessage(
				`Error deleting template: ${
					typeof e === "object" && e && "message" in e
						? String((e as { message?: unknown }).message || e)
						: String(e)
				}`,
			);
		} finally {
			setIsDeletingTemplate(false);
		}
	}, [selectedTemplate, loadSavedTemplates]);

	const handleCancel = React.useCallback(() => {
		setDraftFilenameTemplate(String(filenameTemplate || ""));
		setDraftPathTemplate(String(pathTemplate || ""));
		setDraftFilenamePreviewSceneId(String(filenamePreviewSceneId || ""));
		setDraftPathPreviewSceneId(String(pathPreviewSceneId || ""));
		setStatusMessage("");
		onHide();
	}, [
		filenameTemplate,
		pathTemplate,
		filenamePreviewSceneId,
		pathPreviewSceneId,
		onHide,
	]);

	const handleDone = React.useCallback(() => {
		emitDraftToCaller();
		onHide();
	}, [emitDraftToCaller, onHide]);

	const handleSave = React.useCallback(async () => {
		const saved = await saveSelectedTemplateToDatabase();
		if (!saved) return;
		emitDraftToCaller();
	}, [saveSelectedTemplateToDatabase, emitDraftToCaller]);

	return (
		<Modal show={show} onHide={handleCancel} centered size="xl">
			<Modal.Header>
				<TemplateManagerBar
					templates={savedTemplates}
					selectedTemplateId={selectedSavedTemplateId}
					isSelectedTemplateDirty={isSelectedTemplateDirty}
					isActionBusy={!templatesLoaded}
					isSavingTemplate={isSavingTemplate}
					isDeletingTemplate={isDeletingTemplate}
					onSelectTemplate={onSelectTemplate}
					onDeleteTemplate={deleteSelectedTemplate}
					onSaveTemplate={() => {
						saveSelectedTemplateToDatabase().catch(() => undefined);
					}}
					onSaveAsTemplate={saveAsCurrentTemplateToDatabase}
					onReloadTemplate={reloadSelectedTemplate}
					showCreatedAtInLabel={false}
					className="mb-2"
				/>
			</Modal.Header>

			<Modal.Body style={{ height: "70vh" }}>
				<div className="container-fluid h-100 d-flex flex-column">
					{statusMessage ? (
						<Alert variant="secondary" className="mb-2 py-2">
							{statusMessage}
						</Alert>
					) : null}

					<div className="row g-3 h-100">
						<div className="col-lg-8 d-flex flex-column h-100">
							{hasScenes ? (
								<>
									<Form.Group className="mb-2">
										<Form.Check
											type="switch"
											id="template-editor-live-preview"
											label="Live preview"
											checked={livePreviewEnabled}
											onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
												setLivePreviewEnabled(e.target.checked)
											}
										/>
									</Form.Group>

									<Form.Group className="mb-2">
										<Form.Label>Preview Scene</Form.Label>
										<Form.Control
											as="select"
											value={draftFilenamePreviewSceneId}
											onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
												setDraftFilenamePreviewSceneId(e.target.value);
												setDraftPathPreviewSceneId(e.target.value);
											}}
										>
											<option value="">Select scene...</option>
											{scenes.map((scene) => (
												<option key={String(scene.id)} value={String(scene.id)}>
													{getSceneLabel(scene)}
												</option>
											))}
										</Form.Control>
									</Form.Group>
								</>
							) : null}

							<div className="row g-3 flex-grow-1">
								<div
									className="col-md-6 d-flex flex-column"
									onMouseDownCapture={() => setActiveTarget("filename")}
								>
									<Form.Group className="mb-2">
										<Form.Label>File Template</Form.Label>
										<TemplateCodeEditor
											value={draftFilenameTemplate}
											tokenTree={tokenTree}
											placeholder="{{ scene.studio.name }} - {{ scene.title }}"
											onFocus={() => {
												setActiveTarget("filename");
											}}
											onChange={(next) => setDraftFilenameTemplate(next)}
											onReady={(handle) => {
												editorHandlesRef.current.filename = handle;
											}}
										/>
									</Form.Group>

									{hasScenes ? (
										previewErrorByTarget.filename ? (
											<Alert variant="warning" className="mb-0">
												{previewErrorByTarget.filename}
											</Alert>
										) : (
											<Alert variant="info" className="mb-0">
												{previewBusyByTarget.filename ? (
													<>
														<Spinner
															animation="border"
															size="sm"
															className="mr-2"
														/>
														Previewing...
													</>
												) : (
													previewTextByTarget.filename
												)}
											</Alert>
										)
									) : null}
								</div>

								<div
									className="col-md-6 d-flex flex-column"
									onMouseDownCapture={() => setActiveTarget("path")}
								>
									<Form.Group className="mb-2">
										<Form.Label>Path Template</Form.Label>
										<TemplateCodeEditor
											value={draftPathTemplate}
											tokenTree={tokenTree}
											placeholder="/Library/{{ scene.studio.name }}"
											onFocus={() => {
												setActiveTarget("path");
											}}
											onChange={(next) => setDraftPathTemplate(next)}
											onReady={(handle) => {
												editorHandlesRef.current.path = handle;
											}}
										/>
									</Form.Group>

									{hasScenes ? (
										previewErrorByTarget.path ? (
											<Alert variant="warning" className="mb-0">
												{previewErrorByTarget.path}
											</Alert>
										) : (
											<Alert variant="info" className="mb-0">
												{previewBusyByTarget.path ? (
													<>
														<Spinner
															animation="border"
															size="sm"
															className="mr-2"
														/>
														Previewing...
													</>
												) : (
													previewTextByTarget.path
												)}
											</Alert>
										)
									) : null}
								</div>
							</div>
						</div>

						<div className="col-lg-4 d-flex flex-column h-100">
							<div className="flex-grow-1 overflow-auto">
								<SceneTokenSelector
									tree={tokenTree}
									loading={loadingTokens}
									onReload={() =>
										fetchSelectorsCatalogCached(true)
											.then((catalog) =>
												setTokenTree(extractSceneTokenTree(catalog)),
											)
											.catch((e) =>
												console.error(
													"[Scene Renamer] Failed to reload selectors",
													e,
												),
											)
									}
									onInsertToken={insertToken}
								/>
							</div>
						</div>
					</div>
				</div>
			</Modal.Body>

			<Modal.Footer>
				<Button variant="secondary" onClick={handleCancel}>
					Cancel
				</Button>
				<Button
					variant="primary"
					onClick={() => {
						handleSave().catch(() => undefined);
					}}
					disabled={isSavingTemplate || isDeletingTemplate || !selectedTemplate}
					title={
						selectedTemplate
							? "Save selected template and emit changes"
							: "Select a saved template or use Save As in template bar"
					}
				>
					{isSavingTemplate ? (
						<Spinner animation="border" size="sm" role="status" />
					) : (
						"Save"
					)}
				</Button>
				<Button variant="success" onClick={handleDone}>
					Done
				</Button>
			</Modal.Footer>
		</Modal>
	);
};
