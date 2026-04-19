import { ConfirmDialog } from "../components/ConfirmDialog";
import { ListActionToolbar } from "../components/ListActionToolbar";
import { SceneListTreeble } from "../components/SceneListTable";
import { TaskProgressOverlay } from "../components/TaskProgressOverlay";
import { TemplateManagerBar } from "../components/TemplateManagerBar";
import { TemplateCodeEditor } from "../components/TemplateCodeEditor";
import { TemplateEditorModal } from "../components/TemplateEditorModal";
import { EditFilterDialog } from "../components/list/EditFilterDialog";
import { FilterTags } from "../components/list/FilterTags";
import { useEditorLogic } from "../hooks/useEditorLogic";

const PluginApi = (window as any).PluginApi;
const React = PluginApi.React;
const { Button, ButtonGroup, Spinner, FormControl, InputGroup, Alert, Form } =
	PluginApi.libraries.Bootstrap;
const { Icon } = PluginApi.components;
const {
	faCircleCheck,
	faCircleXmark,
	faTriangleExclamation,
	faPencil,
	faCode,
	faEye,
	faEyeSlash,
} = PluginApi.libraries.FontAwesomeSolid;

export const EditorView: React.FC = () => {
	const Pagination =
		(PluginApi.components as any).Pagination ||
		(PluginApi.components as any).pagination;
	const PaginationIndex =
		(PluginApi.components as any).PaginationIndex ||
		(PluginApi.components as any).paginationIndex;

	const {
		state: {
			filter,
			editingCriterion,
			selectedIds,
			status,
			livePreview,
			showRenameConfirm,
			showTemplateEditorModal,
			filenamePreviewSceneId,
			pathPreviewSceneId,
			statusFilters,
			isDryRunDirty,
		},
		data: {
			effectiveScenes,
			effectiveTotalItems,
			metadataByline,
			loading,
			error,
			currentPage,
			itemsPerPage,
			sceneOperationById,
			renameTargetIds,
		},
		actions: {
			setEditingCriterion,
			setLivePreview,
			setShowRenameConfirm,
			setShowTemplateEditorModal,
			setFilenamePreviewSceneId,
			setPathPreviewSceneId,
			setFilter,
			updateFilter,
			onSelectChange,
			removeCriterion,
			clearAllCriteria,
			onSelectTemplate,
			toggleStatusFilter,
		},
		templateFields: {
			template,
			setTemplate,
			pathTemplate,
			setPathTemplate,
			debouncedTemplate,
			debouncedPathTemplate,
			templateInputRef,
			pathTemplateInputRef,
			handleDropOnInput,
			syncTemplates,
		},
		templateCrud: {
			savedTemplates,
			selectedSavedTemplateId,
			isSavingTemplate,
			isDeletingTemplate,
			isSelectedTemplateDirty,
			deleteSelectedTemplate,
			saveSelectedTemplateToDatabase,
			saveAsCurrentTemplateToDatabase,
			reloadSelectedTemplate,
		},
		operations: {
			isActionBusy,
			isDryRunBusy,
			isRenameBusy,
			isDryRunReady,
			taskProgress,
			taskProgressText,
			excludedSceneCount,
			submitRenameTask,
		},
	} = useEditorLogic();

	return (
		<div className="tabContent position-relative">
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
						Rename will run for {renameTargetIds.length} file(s) with pending
						changes minus selected scenes ({excludedSceneCount} excluded).
						Continue?
					</>
				}
				confirmLabel="Confirm Rename"
				staticBackdrop
				onCancel={() => setShowRenameConfirm(false)}
				onConfirm={() => {
					setShowRenameConfirm(false);
					submitRenameTask(false, renameTargetIds);
				}}
			/>
			<TemplateEditorModal
				show={showTemplateEditorModal}
				onHide={() => setShowTemplateEditorModal(false)}
				filenameTemplate={template}
				pathTemplate={pathTemplate}
				onChangeFilenameTemplate={setTemplate}
				onChangePathTemplate={setPathTemplate}
				scenes={effectiveScenes}
				filenamePreviewSceneId={filenamePreviewSceneId}
				onChangeFilenamePreviewSceneId={setFilenamePreviewSceneId}
				pathPreviewSceneId={pathPreviewSceneId}
				onChangePathPreviewSceneId={setPathPreviewSceneId}
			/>
			<div className="d-flex align-items-center justify-content-end gap-2 mb-3">
				<TemplateManagerBar
					templates={savedTemplates}
					selectedTemplateId={selectedSavedTemplateId}
					isSelectedTemplateDirty={isSelectedTemplateDirty}
					isActionBusy={isActionBusy}
					isSavingTemplate={isSavingTemplate}
					isDeletingTemplate={isDeletingTemplate}
					onSelectTemplate={onSelectTemplate}
					onDeleteTemplate={deleteSelectedTemplate}
					onSaveTemplate={saveSelectedTemplateToDatabase}
					onSaveAsTemplate={saveAsCurrentTemplateToDatabase}
					onReloadTemplate={reloadSelectedTemplate}
					showCreatedAtInLabel={false}
					className="mb-0"
				/>
				<ButtonGroup className="ml-2">
					<Button
						variant={livePreview ? "primary" : "secondary"}
						title={livePreview ? "Disable live preview" : "Enable live preview"}
						onClick={() => setLivePreview(!livePreview)}
						disabled={isRenameBusy}
					>
						{isDryRunBusy ? (
							<Spinner animation="border" size="sm" role="status" />
						) : (
							<Icon icon={livePreview ? faEye : faEyeSlash} />
						)}
					</Button>
					<Button
						variant="primary"
						title="Rename"
						onClick={() => setShowRenameConfirm(true)}
						disabled={
							isActionBusy || !livePreview || isDryRunDirty || !isDryRunReady
						}
					>
						{isRenameBusy ? (
							<Spinner animation="border" size="sm" role="status" />
						) : (
							<Icon icon={faPencil} />
						)}
					</Button>
				</ButtonGroup>
			</div>
			<div className="mb-3">
				<InputGroup className="mb-2">
					{/* @ts-ignore */}
					<TemplateCodeEditor
						ref={templateInputRef as any}
						value={template}
						disabled={isActionBusy}
						onChange={(val: any) =>
							setTemplate(
								typeof val === "string" ? val : val?.target?.value || "",
							)
						}
						onDragOver={(e: any) => e.preventDefault()}
						onDrop={handleDropOnInput("filename")}
						onBlur={syncTemplates}
						onEnter={syncTemplates}
						placeholder="{{ scene.studio.name }} - {{ scene.date }} - {{ scene.title }}"
						lineNumbers={false}
						singleLine={true}
						className="form-control clearable-text-field"
					/>

					<InputGroup.Text className="clearable-text-field">
						File Template
					</InputGroup.Text>

					<Button
						variant="secondary"
						title="Open file template editor"
						onClick={() => setShowTemplateEditorModal(true)}
					>
						<Icon icon={faCode} />
					</Button>
				</InputGroup>

				<InputGroup className="mb-2">
					{/* @ts-ignore */}
					<TemplateCodeEditor
						disabled={isActionBusy}
						placeholder="e.g., /Library/{{ scene.studio.name }} or ../Archive/{{ scene.studio.name }}"
						value={pathTemplate}
						onChange={(val: any) =>
							setPathTemplate(
								typeof val === "string" ? val : val?.target?.value || "",
							)
						}
						onDragOver={(e: any) => e.preventDefault()}
						onDrop={handleDropOnInput("path")}
						onBlur={syncTemplates}
						onEnter={syncTemplates}
						lineNumbers={false}
						singleLine={true}
						className="form-control clearable-text-field"
					/>
					<InputGroup.Text className="clearable-text-field">
						Path Template
					</InputGroup.Text>

					<Button
						variant="secondary"
						title="Open path template editor"
						onClick={() => setShowTemplateEditorModal(true)}
					>
						<Icon icon={faCode} />
					</Button>
				</InputGroup>
			</div>
			{error ? (
				<div className="mb-3">
					<Alert variant="danger" className="mb-0">
						{String(error)}
					</Alert>
				</div>
			) : status && /error|fail/i.test(status) ? (
				<div className="mb-3">
					<Alert variant="danger" className="mb-0">
						{status}
					</Alert>
				</div>
			) : null}
			{editingCriterion && filter ? (
				<EditFilterDialog
					filter={filter}
					editingCriterion={
						editingCriterion === "___open___" ? undefined : editingCriterion
					}
					onApply={(nextFilter) => {
						setFilter(nextFilter.clone());
						setEditingCriterion(undefined);
					}}
					onCancel={() => setEditingCriterion(undefined)}
				/>
			) : null}
			{filter ? (
				<ListActionToolbar
					filter={filter}
					onSetFilter={(next) => setFilter(next)}
					onEditFilter={() => setEditingCriterion("___open___")}
					afterContent={
						<div className="ml-2">
							<ButtonGroup>
								<Button
									variant={statusFilters.success ? "primary" : "seconday"}
									onClick={() => toggleStatusFilter("success")}
									disabled={isActionBusy}
									title="Toggle pending files"
								>
									<Icon icon={faCircleCheck} />
								</Button>
								<Button
									variant={statusFilters.error ? "primary" : "secondary"}
									onClick={() => toggleStatusFilter("error")}
									disabled={isActionBusy}
									title="Toggle error files"
								>
									<Icon icon={faCircleXmark} />
								</Button>
								<Button
									variant={statusFilters.warn ? "primary" : "secondary"}
									onClick={() => toggleStatusFilter("warn")}
									disabled={isActionBusy}
									title="Toggle unchanged files"
								>
									<Icon icon={faTriangleExclamation} />
								</Button>
							</ButtonGroup>
						</div>
					}
				/>
			) : null}
			{filter ? (
				<FilterTags
					searchTerm={filter.searchTerm}
					criteria={filter.criteria}
					onEditSearchTerm={() => setEditingCriterion("___open___")}
					onEditCriterion={(c) => setEditingCriterion(c.criterionOption.type)}
					onRemoveCriterion={removeCriterion}
					onRemoveAll={clearAllCriteria}
					onRemoveSearchTerm={() => {
						const next = filter.clearSearchTerm();
						setFilter(next);
					}}
				/>
			) : null}

			{Pagination ? (
				<div className="mr-2">
					<Pagination
						currentPage={currentPage}
						itemsPerPage={itemsPerPage}
						totalItems={effectiveTotalItems}
						onChangePage={(page: number) => {
							updateFilter((prev) => {
								const next = prev.clone();
								next.currentPage = page;
								return next;
							});
						}}
					/>
				</div>
			) : null}

			{PaginationIndex ? (
				<div className="d-flex justify-content-center mb-3 mt-2 text-muted small">
					<PaginationIndex
						loading={loading}
						itemsPerPage={itemsPerPage}
						currentPage={currentPage}
						totalItems={effectiveTotalItems}
						metadataByline={metadataByline}
					/>
				</div>
			) : null}
			{loading ? (
				<div className="d-flex justify-content-center align-items-center py-5">
					<Spinner animation="border" role="status" variant="secondary" />
				</div>
			) : (
				<SceneListTreeble
					scenes={effectiveScenes}
					sceneOperationById={sceneOperationById}
					selectedIds={selectedIds}
					onSelectChange={(id: string, checked: boolean) =>
						onSelectChange(id, checked)
					}
				/>
			)}
			{Pagination ? (
				<div className="pagination-footer-container">
					<div className="pagination-footer"></div>
					<Pagination
						itemsPerPage={itemsPerPage}
						currentPage={currentPage}
						totalItems={effectiveTotalItems}
						onChangePage={(page: number) => {
							updateFilter((prev) => {
								const next = prev.clone();
								next.currentPage = page;
								return next;
							});
						}}
						pagePopupPlacement="top"
					/>
				</div>
			) : null}
		</div>
	);
};
