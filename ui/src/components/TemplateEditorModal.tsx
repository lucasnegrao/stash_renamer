import { ISlimSceneData } from "../models/SlimSceneData";
import {
	extractSceneTokenTree,
	fetchSelectorsCatalogCached,
	previewRenameScenes,
	type IScenePreviewResult,
	type ITokenTreeNode,
} from "../services/sceneRenamerApi";
import { SceneTokenSelector } from "./SceneTokenSelector";
import {
	TemplateCodeEditor,
	type ITemplateCodeEditorHandle,
} from "./TemplateCodeEditor";

const PluginApi = window.PluginApi;
const React = PluginApi.React;
const { Button, Form, Modal, Spinner, Alert } = PluginApi.libraries.Bootstrap;

interface ITemplateEditorModalProps {
	show: boolean;
	onHide: () => void;
	filenameTemplate: string;
	pathTemplate: string;
	onChangeFilenameTemplate: (next: string) => void;
	onChangePathTemplate: (next: string) => void;
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

	const selectedFilenameScene = React.useMemo(
		() =>
			scenes.find(
				(scene) => String(scene.id) === String(filenamePreviewSceneId),
			),
		[scenes, filenamePreviewSceneId],
	);
	const selectedPathScene = React.useMemo(
		() =>
			scenes.find((scene) => String(scene.id) === String(pathPreviewSceneId)),
		[scenes, pathPreviewSceneId],
	);

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
					? String(filenameTemplate || "")
					: String(pathTemplate || "");
			const setValue =
				activeTarget === "filename"
					? onChangeFilenameTemplate
					: onChangePathTemplate;
			if (!targetEditor) {
				setValue(`${current}${token}`);
				return;
			}
			targetEditor.insertTokenAtCursor(token);
		},
		[
			activeTarget,
			filenameTemplate,
			pathTemplate,
			onChangeFilenameTemplate,
			onChangePathTemplate,
		],
	);

	const runPreview = React.useCallback(
		async (target: TPreviewTarget) => {
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
					template: filenameTemplate,
					pathTemplate,
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
						: nextPath.split("/").slice(0, -1).join("/") ||
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
		[filenameTemplate, pathTemplate, selectedFilenameScene, selectedPathScene],
	);

	React.useEffect(() => {
		if (!show || !livePreviewEnabled) return;
		if (!selectedFilenameScene) return;
		const timer = window.setTimeout(() => {
			runPreview("filename").catch(() => undefined);
		}, 300);
		return () => window.clearTimeout(timer);
	}, [
		show,
		livePreviewEnabled,
		selectedFilenameScene,
		filenameTemplate,
		pathTemplate,
		runPreview,
	]);

	React.useEffect(() => {
		if (!show || !livePreviewEnabled) return;
		if (!selectedPathScene) return;
		const timer = window.setTimeout(() => {
			runPreview("path").catch(() => undefined);
		}, 300);
		return () => window.clearTimeout(timer);
	}, [
		show,
		livePreviewEnabled,
		selectedPathScene,
		filenameTemplate,
		pathTemplate,
		runPreview,
	]);

	return (
		<Modal show={show} onHide={onHide} centered size="xl">
			<Modal.Header closeButton>
				<Modal.Title>Template Editor</Modal.Title>
			</Modal.Header>

			<Modal.Body style={{ height: "70vh" }}>
				<div className="container-fluid h-100">
					<div className="row g-3 h-100">
						<div className="col-lg-8 d-flex flex-column h-100">
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
									value={filenamePreviewSceneId}
									onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
										onChangeFilenamePreviewSceneId(e.target.value);
										onChangePathPreviewSceneId(e.target.value);
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

							<div className="row g-3 flex-grow-1">
								<div
									className="col-md-6 d-flex flex-column"
									onMouseDownCapture={() => setActiveTarget("filename")}
								>
									<Form.Group className="mb-2">
										<Form.Label>File Template</Form.Label>
										<TemplateCodeEditor
											value={filenameTemplate}
											tokenTree={tokenTree}
											placeholder="{{ scene.studio.name }} - {{ scene.title }}"
											onFocus={() => {
												setActiveTarget("filename");
											}}
											onChange={(next) => onChangeFilenameTemplate(next)}
											onReady={(handle) => {
												editorHandlesRef.current.filename = handle;
											}}
										/>
									</Form.Group>

									{previewErrorByTarget.filename ? (
										<Alert variant="warning" className="mb-0">
											{previewErrorByTarget.filename}
										</Alert>
									) : (
										<Alert variant="info" className="mb-0">
											{previewTextByTarget.filename}
										</Alert>
									)}
								</div>

								<div
									className="col-md-6 d-flex flex-column"
									onMouseDownCapture={() => setActiveTarget("path")}
								>
									<Form.Group className="mb-2">
										<Form.Label>Path Template</Form.Label>
										<TemplateCodeEditor
											value={pathTemplate}
											tokenTree={tokenTree}
											placeholder="/Library/{{ scene.studio.name }}"
											onFocus={() => {
												setActiveTarget("path");
											}}
											onChange={(next) => onChangePathTemplate(next)}
											onReady={(handle) => {
												editorHandlesRef.current.path = handle;
											}}
										/>
									</Form.Group>

									{previewErrorByTarget.path ? (
										<Alert variant="warning" className="mb-0">
											{previewErrorByTarget.path}
										</Alert>
									) : (
										<Alert variant="info" className="mb-0">
											{previewTextByTarget.path}
										</Alert>
									)}
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
				<Button variant="secondary" onClick={onHide}>
					Done
				</Button>
			</Modal.Footer>
		</Modal>
	);
};
