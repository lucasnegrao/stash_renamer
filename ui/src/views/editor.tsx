import { ConfirmDialog } from "../components/ConfirmDialog";
import { ToggleCheckboxButton } from "../components/shared/ToggleCheckboxButton";
import { TaskProgressOverlay } from "../components/TaskProgressOverlay";
import { TemplateManagerBar } from "../components/TemplateManagerBar";
import { useEditorOperations } from "../hooks/useEditorOperations";
import { useEditorTemplateCrud } from "../hooks/useEditorTemplateCrud";
import { useEditorTemplateFields } from "../hooks/useEditorTemplateFields";

const PluginApi = window.PluginApi;
const React = PluginApi.React;
const { Button, ButtonGroup, Spinner, FormControl, InputGroup, Alert } =
	PluginApi.libraries.Bootstrap;

export const RenamerEditor: React.FC = () => {
	const componentsToLoad = [
		PluginApi.loadableComponents.Scenes,
		PluginApi.loadableComponents.Scene,
		PluginApi.loadableComponents.SceneDetailPanel,
		PluginApi.loadableComponents.SceneList,
		PluginApi.loadableComponents.SceneQueryModal,
	];
	const componentsLoading = PluginApi.hooks.useLoadComponents(componentsToLoad);

	const { LoadingIndicator, FilteredSceneList } = PluginApi.components;

	const {
		template,
		setTemplate,
		pathTemplate,
		setPathTemplate,
		debouncedTemplate,
		debouncedPathTemplate,
		sceneRuntimeToken,
		templateInputRef,
		pathTemplateInputRef,
		handleDropOnInput,
	} = useEditorTemplateFields();

	const [livePreview, setLivePreview] = React.useState(false);
	const [status, setStatus] = React.useState("");
	const [showRenameConfirm, setShowRenameConfirm] = React.useState(false);

	const {
		savedTemplates,
		selectedSavedTemplateId,
		isSavingTemplate,
		isDeletingTemplate,
		isSelectedTemplateDirty,
		applyTemplateById,
		reloadSelectedTemplate,
		saveAsCurrentTemplateToDatabase,
		saveSelectedTemplateToDatabase,
		deleteSelectedTemplate,
	} = useEditorTemplateCrud({
		template,
		pathTemplate,
		sceneRuntimeToken,
		setTemplate,
		setPathTemplate,
		setStatus,
	});

	const {
		isActionBusy,
		activeAction,
		isDryRunReady,
		taskProgress,
		taskProgressText,
		previewBusyCount,
		excludedSceneCount,
		submitRenameTask,
	} = useEditorOperations({
		template,
		pathTemplate,
		debouncedTemplate,
		debouncedPathTemplate,
		livePreview,
		setLivePreview,
		sceneRuntimeToken,
		setStatus,
	});

	if (componentsLoading) return <LoadingIndicator />;
	const isPreviewLoading = previewBusyCount > 0;
	const isDryRunBusy = isActionBusy && activeAction === "dry_run";
	const isRenameBusy = isActionBusy && activeAction === "rename";

	return (
		<div className="position-relative">
			<TaskProgressOverlay
				show={isRenameBusy}
				progress={taskProgress}
				text={taskProgressText}
			/>
			<ConfirmDialog
				show={showRenameConfirm}
				title="Confirm Rename"
				body={
					<>
						Rename will run for the current filter minus selected scenes (
						{excludedSceneCount} excluded). Continue?
					</>
				}
				confirmLabel="Confirm Rename"
				staticBackdrop
				onCancel={() => setShowRenameConfirm(false)}
				onConfirm={() => {
					setShowRenameConfirm(false);
					submitRenameTask(false);
				}}
			/>
			<div className="d-flex w-100 justify-content-end gap-2">
				<div className="w-50"></div>
				<div className="flex-grow-1 justify-content-end flex-row gap-2">
					<TemplateManagerBar
						templates={savedTemplates}
						selectedTemplateId={selectedSavedTemplateId}
						isSelectedTemplateDirty={isSelectedTemplateDirty}
						isActionBusy={isActionBusy}
						isSavingTemplate={isSavingTemplate}
						isDeletingTemplate={isDeletingTemplate}
						onSelectTemplate={applyTemplateById}
						onDeleteTemplate={deleteSelectedTemplate}
						onSaveTemplate={saveSelectedTemplateToDatabase}
						onSaveAsTemplate={saveAsCurrentTemplateToDatabase}
						onReloadTemplate={reloadSelectedTemplate}
					/>
					<InputGroup className="mb-3">
						<FormControl
							ref={templateInputRef}
							type="text"
							className="clearable-text-field"
							value={template}
							disabled={isActionBusy}
							onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
								setTemplate(e.target.value)
							}
							onDragOver={(e: React.DragEvent<HTMLInputElement>) =>
								e.preventDefault()
							}
							onDrop={handleDropOnInput("filename")}
							placeholder="$scene.studio.name - $scene.date - $scene.title"
						/>
						<InputGroup.Text className="clearable-text-field">
							File Template
						</InputGroup.Text>
					</InputGroup>
					<InputGroup className="mb-3">
						<FormControl
							ref={pathTemplateInputRef}
							type="text"
							disabled={isActionBusy}
							placeholder="e.g., /Library/$scene.studio.name or $up/Archive/$scene.studio.name"
							value={pathTemplate}
							onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
								setPathTemplate(e.target.value)
							}
							onDragOver={(e: React.DragEvent<HTMLInputElement>) =>
								e.preventDefault()
							}
							onDrop={handleDropOnInput("path")}
							className="clearable-text-field"
						/>
						<InputGroup.Text className="clearable-text-field">
							Path Template
						</InputGroup.Text>
					</InputGroup>
					<div className="mb-3 align-items-center w-100 d-flex justify-content-end gap-5">
						<div className="flex-grow-1">
							<Alert variant="info"> {status ? status : "Ready"}</Alert>
						</div>
						<div>
							<ButtonGroup>
								<ToggleCheckboxButton
									id="scene-renamer-live-preview"
									type="checkbox"
									variant="secondary"
									checked={livePreview}
									disabled={isActionBusy}
									onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
										setLivePreview(e.target.checked)
									}
								>
									{" "}
									Live{" "}
								</ToggleCheckboxButton>

								<Button
									variant="secondary"
									onClick={() => submitRenameTask(true)}
									disabled={isActionBusy || isPreviewLoading}
								>
									{isDryRunBusy || isPreviewLoading ? (
										<>
											<Spinner
												animation="border"
												size="sm"
												role="status"
												className="mr-1"
											/>
											Dry run
										</>
									) : (
										"Dry run"
									)}
								</Button>

								<Button
									variant="primary"
									onClick={() => setShowRenameConfirm(true)}
									disabled={isActionBusy || !isDryRunReady}
								>
									{isRenameBusy ? (
										<>
											<Spinner
												animation="border"
												size="sm"
												role="status"
												className="mr-1"
											/>
											Rename
										</>
									) : (
										"Rename"
									)}
								</Button>
							</ButtonGroup>
						</div>
					</div>
				</div>
			</div>
			<div style={{ width: "100%", maxWidth: "100%", minWidth: 0 }}>
				<FilteredSceneList />
			</div>
		</div>
	);
};
