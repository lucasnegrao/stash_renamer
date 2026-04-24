import {
	faCopy,
	faRotateRight,
	faSave,
	faTrash,
} from "@fortawesome/free-solid-svg-icons";
import type { IRenamerTemplate } from "../../api/stasheroApi";
import { ConfirmDialog } from "../shared/ConfirmDialog";
import { TemplateSaveAsModal } from "./TemplateSaveAsModal";

const PluginApi = window.PluginApi;
const React = PluginApi.React;
const { Button, ButtonGroup, Dropdown, InputGroup } =
	PluginApi.libraries.Bootstrap;
const { Icon } = PluginApi.components;

interface ITemplateManagerBarProps {
	templates: IRenamerTemplate[];
	selectedTemplateId: string;
	isSelectedTemplateDirty: boolean;
	isActionBusy: boolean;
	isSavingTemplate: boolean;
	isDeletingTemplate: boolean;
	onSelectTemplate: (templateId: string) => void;
	onDeleteTemplate: () => void;
	onSaveTemplate: () => void;
	onSaveAsTemplate: (name: string) => Promise<void>;
	onReloadTemplate: () => void;
	onEvent?: (event: {
		type:
			| "select"
			| "delete"
			| "save"
			| "save_as"
			| "reload"
			| "confirm_reload"
			| "confirm_overwrite";
		templateId?: string;
	}) => void;
	showCreatedAtInLabel?: boolean;
	className?: string;
}

export const TemplateManagerBar: React.FC<ITemplateManagerBarProps> = ({
	templates,
	selectedTemplateId,
	isSelectedTemplateDirty,
	isActionBusy,
	isSavingTemplate,
	isDeletingTemplate,
	onSelectTemplate,
	onDeleteTemplate,
	onSaveTemplate,
	onSaveAsTemplate,
	onReloadTemplate,
	onEvent,
	showCreatedAtInLabel = true,
	className,
}) => {
	const [showSaveAsModal, setShowSaveAsModal] = React.useState(false);
	const [showReloadConfirm, setShowReloadConfirm] = React.useState(false);
	const [showOverwriteConfirm, setShowOverwriteConfirm] = React.useState(false);

	const selectedTemplate = templates.find(
		(row) => String(row.id) === String(selectedTemplateId),
	);

	const formatTemplateLabel = (t: IRenamerTemplate) => {
		const dirty = isSelectedTemplateDirty ? "*" : "";
		if (!showCreatedAtInLabel) return `${t.name}${dirty}`;
		return `${t.name}${dirty} (${new Date(t.created_at).toLocaleString()})`;
	};

	const formatDropdownItemLabel = (t: IRenamerTemplate) => {
		if (!showCreatedAtInLabel) return String(t.name || "");
		return `${t.name} (${new Date(t.created_at).toLocaleString()})`;
	};

	return (
		<>
			<TemplateSaveAsModal
				show={showSaveAsModal}
				initialName={selectedTemplate?.name || ""}
				saving={isSavingTemplate}
				onCancel={() => {
					if (isSavingTemplate) return;
					setShowSaveAsModal(false);
				}}
				onSave={async (name: string) => {
					await onSaveAsTemplate(name);
					setShowSaveAsModal(false);
				}}
			/>
			<ConfirmDialog
				show={showReloadConfirm}
				title="Discard Unsaved Changes?"
				body={
					<>
						Reloading template "{selectedTemplate?.name || ""}" will discard
						unsaved changes. Continue?
					</>
				}
				confirmLabel="Reload Template"
				confirmVariant="warning"
				staticBackdrop
				onCancel={() => setShowReloadConfirm(false)}
				onConfirm={() => {
					setShowReloadConfirm(false);
					onEvent?.({
						type: "confirm_reload",
						templateId: String(selectedTemplateId || ""),
					});
					onReloadTemplate();
				}}
			/>
			<ConfirmDialog
				show={showOverwriteConfirm}
				title="Overwrite Saved Template?"
				body={
					<>
						This will overwrite template "{selectedTemplate?.name || ""}" with
						current fields and filter. Continue?
					</>
				}
				confirmLabel="Overwrite Template"
				confirmVariant="primary"
				staticBackdrop
				onCancel={() => setShowOverwriteConfirm(false)}
				onConfirm={() => {
					setShowOverwriteConfirm(false);
					onEvent?.({
						type: "confirm_overwrite",
						templateId: String(selectedTemplateId || ""),
					});
					onSaveTemplate();
				}}
			/>
			<InputGroup
				className={`${className || "mb-3"} justify-content-end align-items-center flex-grow-1`}
			>
				<Dropdown as={ButtonGroup}>
					<Button
						className="minimal"
						variant="secondaryr"
						title="Delete selected template"
						disabled={
							isActionBusy ||
							isSavingTemplate ||
							isDeletingTemplate ||
							!selectedTemplateId
						}
						onClick={onDeleteTemplate}
						onClickCapture={() =>
							onEvent?.({
								type: "delete",
								templateId: String(selectedTemplateId || ""),
							})
						}
					>
						<Icon icon={faTrash} fixedWidth />
					</Button>
					<Button
						variant={isSelectedTemplateDirty ? "primary" : "secondary"}
						className="minimal"
						title={
							isSelectedTemplateDirty
								? "Save to selected template"
								: "No changes to save"
						}
						disabled={
							isActionBusy ||
							isSavingTemplate ||
							isDeletingTemplate ||
							!selectedTemplateId ||
							!isSelectedTemplateDirty
						}
						onClick={() => setShowOverwriteConfirm(true)}
						onClickCapture={() =>
							onEvent?.({
								type: "save",
								templateId: String(selectedTemplateId || ""),
							})
						}
					>
						<Icon icon={faSave} fixedWidth />
					</Button>
					<Button
						className="minimal"
						variant="secondary"
						title="Reload selected template (discard unsaved changes)"
						disabled={
							isActionBusy ||
							isSavingTemplate ||
							isDeletingTemplate ||
							!selectedTemplateId
						}
						onClick={() => {
							if (!isSelectedTemplateDirty) {
								onEvent?.({
									type: "reload",
									templateId: String(selectedTemplateId || ""),
								});
								onReloadTemplate();
								return;
							}
							setShowReloadConfirm(true);
						}}
					>
						<Icon icon={faRotateRight} fixedWidth />
					</Button>
					<Button
						className="minimal"
						title="Save as new template"
						disabled={isActionBusy || isSavingTemplate || isDeletingTemplate}
						onClick={() => setShowSaveAsModal(true)}
						onClickCapture={() =>
							onEvent?.({
								type: "save_as",
								templateId: String(selectedTemplateId || ""),
							})
						}
					>
						<Icon icon={faCopy} fixedWidth />
					</Button>
					<Dropdown.Toggle
						variant="secondary"
						className="text-right flex-grow-0"
						disabled={isActionBusy || isSavingTemplate || isDeletingTemplate}
					>
						{selectedTemplate
							? formatTemplateLabel(selectedTemplate)
							: "Select saved template..."}
					</Dropdown.Toggle>
					<Dropdown.Menu
						className="w-100"
						style={{ maxHeight: "340px", overflowY: "auto" }}
					>
						{templates.length === 0 ? (
							<Dropdown.Item disabled>No saved templates</Dropdown.Item>
						) : (
							templates.map((t) => (
								<Dropdown.Item
									key={String(t.id)}
									eventKey={String(t.id)}
									active={String(t.id) === String(selectedTemplateId)}
									onSelect={(eventKey: string | null) => {
										const selectedId = String(eventKey || "");
										if (!selectedId) return;
										onEvent?.({ type: "select", templateId: selectedId });
										onSelectTemplate(selectedId);
									}}
								>
									{formatDropdownItemLabel(t)}
								</Dropdown.Item>
							))
						)}
					</Dropdown.Menu>
				</Dropdown>
			</InputGroup>
		</>
	);
};
