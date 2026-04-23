import type { IRenamerTemplate } from "../../api/sceneRenamerApi";
import { TemplateManagerBar } from "../TemplateManagerBar";

const PluginApi = window.PluginApi;
const React = PluginApi.React;
const { Button, Modal } = PluginApi.libraries.Bootstrap;

interface ITemplateCrudModalProps {
	show: boolean;
	onHide: () => void;
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
}

export const TemplateCrudModal: React.FC<ITemplateCrudModalProps> = ({
	show,
	onHide,
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
}) => {
	return (
		<Modal show={show} onHide={onHide} centered size="lg">
			<Modal.Header closeButton>
				<Modal.Title>Template Manager</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<TemplateManagerBar
					templates={templates}
					selectedTemplateId={selectedTemplateId}
					isSelectedTemplateDirty={isSelectedTemplateDirty}
					isActionBusy={isActionBusy}
					isSavingTemplate={isSavingTemplate}
					isDeletingTemplate={isDeletingTemplate}
					onSelectTemplate={onSelectTemplate}
					onDeleteTemplate={onDeleteTemplate}
					onSaveTemplate={onSaveTemplate}
					onSaveAsTemplate={onSaveAsTemplate}
					onReloadTemplate={onReloadTemplate}
					showCreatedAtInLabel={true}
					className="mb-0"
				/>
			</Modal.Body>
			<Modal.Footer>
				<Button variant="secondary" onClick={onHide}>
					Close
				</Button>
			</Modal.Footer>
		</Modal>
	);
};
