import {
	deleteTemplateFromDatabase,
	fetchSavedTemplates,
	saveTemplateToDatabase,
	updateTemplateInDatabase,
	type IRenamerTemplate,
} from "./sceneRenamerApi";

export interface ITemplateLoadResult {
	templates: IRenamerTemplate[];
	nextSelectedId: string;
}

export async function loadTemplates(
	selectedId: string,
	selectFirst = false,
	preferredId?: string,
): Promise<ITemplateLoadResult> {
	const templates = await fetchSavedTemplates();
	const keepId = String(preferredId || selectedId || "");
	const kept = keepId
		? templates.find((row) => String(row.id) === keepId)
		: null;
	if (kept) {
		return { templates, nextSelectedId: String(kept.id) };
	}
	if (selectFirst && templates.length > 0) {
		return { templates, nextSelectedId: String(templates[0].id) };
	}
	return { templates, nextSelectedId: "" };
}

export async function saveTemplateAs(args: {
	name: string;
	filenameTemplate: string;
	pathTemplate: string;
	filter?: unknown;
}): Promise<IRenamerTemplate | null> {
	return saveTemplateToDatabase(args);
}

export async function saveExistingTemplate(args: {
	id: string;
	name: string;
	filenameTemplate: string;
	pathTemplate: string;
	filter?: unknown;
}): Promise<IRenamerTemplate | null> {
	return updateTemplateInDatabase(args);
}

export async function deleteTemplate(id: string): Promise<boolean> {
	return deleteTemplateFromDatabase(id);
}
