import {
	applyFilterToSceneList,
	getFilterState,
	hasSceneListSetFilterState,
	setFilterState,
} from "../services/renamerRuntimeState";
import {
	getTemplateById,
	isTemplateDirty,
	parseTemplateFilterJson,
} from "../services/templateCrudService";
import {
	deleteTemplate,
	loadTemplates,
	saveExistingTemplate,
	saveTemplateAs,
} from "../services/templateStore";
import type { IRenamerTemplate } from "../services/sceneRenamerApi";

const PluginApi = window.PluginApi;
const React = PluginApi.React;

interface IUseEditorTemplateCrudArgs {
	template: string;
	pathTemplate: string;
	sceneRuntimeToken: number;
	setTemplate: (value: string) => void;
	setPathTemplate: (value: string) => void;
	setStatus: (value: string) => void;
	currentCriteria: any[];
	criteriaSignature: string;
}

export function useEditorTemplateCrud({
	template,
	pathTemplate,
	sceneRuntimeToken,
	setTemplate,
	setPathTemplate,
	setStatus,
	currentCriteria,
	criteriaSignature,
}: IUseEditorTemplateCrudArgs) {
	const [savedTemplates, setSavedTemplates] = React.useState<
		IRenamerTemplate[]
	>([]);
	const [selectedSavedTemplateId, setSelectedSavedTemplateId] =
		React.useState("");
	const [isSavingTemplate, setIsSavingTemplate] = React.useState(false);
	const [isDeletingTemplate, setIsDeletingTemplate] = React.useState(false);

	async function loadSavedTemplates(selectFirst = false, preferredId?: string) {
		try {
			const loaded = await loadTemplates(
				selectedSavedTemplateId,
				selectFirst,
				preferredId,
			);
			setSavedTemplates(loaded.templates);
			setSelectedSavedTemplateId(loaded.nextSelectedId);
		} catch (e: any) {
			setStatus(`Error loading saved templates: ${e?.message || String(e)}`);
		}
	}

	React.useEffect(() => {
		loadSavedTemplates(true);
	}, []);

	const applyTemplateById = (templateId: string) => {
		const selected = savedTemplates.find(
			(t: IRenamerTemplate) => String(t.id) === String(templateId),
		);
		if (!selected) return;
		const parsedFilter = parseTemplateFilterJson(selected.filter_json);
		setTemplate(String(selected.filename_template || ""));
		setPathTemplate(String(selected.path_template || ""));
		setFilterState(parsedFilter);
		let statusMessage = `Loaded template "${selected.name}"`;
		if (parsedFilter) {
			const applied = applyFilterToSceneList(parsedFilter);
			if (!applied && !hasSceneListSetFilterState()) {
				statusMessage =
					"Template loaded, but filter UI is not mounted yet. Open the scene list and re-select template to apply filter.";
			}
		}
		setSelectedSavedTemplateId(String(selected.id));
		setStatus(statusMessage);
	};

	const selectedTemplate = React.useMemo(
		() => getTemplateById(savedTemplates, selectedSavedTemplateId),
		[savedTemplates, selectedSavedTemplateId],
	);

	const isSelectedTemplateDirty = React.useMemo(() => {
		return isTemplateDirty({
			selectedTemplate,
			filenameTemplate: template,
			pathTemplate,
			currentFilter: { criteria: currentCriteria },
		});
	}, [selectedTemplate, template, pathTemplate, criteriaSignature]);

	const saveAsCurrentTemplateToDatabase = async (name: string) => {
		const trimmedName = String(name || "").trim();
		if (!trimmedName) {
			setStatus("Template name is required.");
			return;
		}
		setIsSavingTemplate(true);
		try {
			const saved = await saveTemplateAs({
				name: trimmedName,
				filenameTemplate: template,
				pathTemplate,
				criteria: currentCriteria,
			});
			await loadSavedTemplates(false, String(saved?.id || ""));
			if (saved?.id) setSelectedSavedTemplateId(String(saved.id));
			setStatus(saved ? `Saved template "${saved.name}"` : "Template saved.");
		} catch (e: any) {
			setStatus(`Error saving template: ${e?.message || String(e)}`);
		} finally {
			setIsSavingTemplate(false);
		}
	};

	const saveSelectedTemplateToDatabase = async () => {
		const selected = savedTemplates.find(
			(t: IRenamerTemplate) => String(t.id) === String(selectedSavedTemplateId),
		);
		if (!selected) {
			setStatus("Select a saved template first.");
			return;
		}
		setIsSavingTemplate(true);
		try {
			const updated = await saveExistingTemplate({
				id: String(selected.id),
				name: String(selected.name || ""),
				filenameTemplate: template,
				pathTemplate,
				criteria: currentCriteria,
			});
			await loadSavedTemplates(false, String(updated?.id || selected.id));
			setStatus(
				updated ? `Updated template "${updated.name}"` : "Template updated.",
			);
		} catch (e: any) {
			setStatus(`Error updating template: ${e?.message || String(e)}`);
		} finally {
			setIsSavingTemplate(false);
		}
	};

	const deleteSelectedTemplate = async () => {
		const selected = savedTemplates.find(
			(t: IRenamerTemplate) => String(t.id) === String(selectedSavedTemplateId),
		);
		if (!selected) {
			setStatus("Select a saved template first.");
			return;
		}
		setIsDeletingTemplate(true);
		try {
			const deleted = await deleteTemplate(String(selected.id));
			if (!deleted) {
				setStatus(`Template "${selected.name}" could not be deleted.`);
				return;
			}
			await loadSavedTemplates(false);
			setSelectedSavedTemplateId("");
			setStatus(`Deleted template "${selected.name}".`);
		} catch (e: any) {
			setStatus(`Error deleting template: ${e?.message || String(e)}`);
		} finally {
			setIsDeletingTemplate(false);
		}
	};

	return {
		savedTemplates,
		selectedSavedTemplateId,
		isSavingTemplate,
		isDeletingTemplate,
		isSelectedTemplateDirty,
		applyTemplateById,
		saveAsCurrentTemplateToDatabase,
		saveSelectedTemplateToDatabase,
		deleteSelectedTemplate,
	};
}
