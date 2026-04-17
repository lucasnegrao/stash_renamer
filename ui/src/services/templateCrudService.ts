import type { IRenamerTemplate } from "./sceneRenamerApi";

export function getTemplateById(
	templates: IRenamerTemplate[],
	templateId: string,
): IRenamerTemplate | null {
	return templates.find((t) => String(t.id) === String(templateId)) || null;
}

export function parseTemplateFilterJson(filterJson?: string): any | null {
	if (!filterJson) return null;
	try {
		return JSON.parse(String(filterJson));
	} catch {
		return null;
	}
}

export function normalizeFilterForCompare(source: any): any | null {
	if (!source || typeof source !== "object") return null;
	const criteria = Array.isArray(source?.criteria)
		? source.criteria
				.map((criterion: any) => {
					const type =
						criterion?.type || criterion?.criterionOption?.type || null;
					if (!type) return null;
					const modifier = criterion?.modifier ?? criterion?._modifier ?? null;
					const value = Object.prototype.hasOwnProperty.call(
						criterion || {},
						"value",
					)
						? criterion.value
						: criterion?._value;
					return { type, modifier, value };
				})
				.filter((criterion: any) => Boolean(criterion))
		: [];
	return {
		searchTerm: source?.searchTerm ?? "",
		criteria,
	};
}

export function isTemplateDirty(args: {
	selectedTemplate: IRenamerTemplate | null;
	filenameTemplate: string;
	pathTemplate: string;
	currentFilter: any;
}): boolean {
	const { selectedTemplate, filenameTemplate, pathTemplate, currentFilter } =
		args;
	if (!selectedTemplate) return false;
	const selectedFilter = normalizeFilterForCompare(
		parseTemplateFilterJson(selectedTemplate.filter_json),
	);
	const normalizedCurrentFilter = normalizeFilterForCompare(currentFilter);
	return (
		String(filenameTemplate || "") !==
			String(selectedTemplate.filename_template || "") ||
		String(pathTemplate || "") !==
			String(selectedTemplate.path_template || "") ||
		JSON.stringify(selectedFilter || {}) !==
			JSON.stringify(normalizedCurrentFilter || {})
	);
}
