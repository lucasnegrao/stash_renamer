import type { IRenamerTemplate } from "../api/sceneRenamerApi";

export function getTemplateById(
	templates: IRenamerTemplate[],
	templateId: string,
): IRenamerTemplate | null {
	return templates.find((t) => String(t.id) === String(templateId)) || null;
}

export function parseTemplateFilterJson(filterJson?: string): any | null {
	if (!filterJson) return null;
	try {
		const parsed = JSON.parse(String(filterJson));
		if (Array.isArray(parsed)) {
			return { criteria: parsed };
		}
		return null;
	} catch {
		return null;
	}
}

export function normalizeCriteriaForCompare(source: any): any[] {
	if (!source || typeof source !== "object") return [];
	const criteria = Array.isArray(source?.criteria)
		? source.criteria
				.map((criterion: any) => {
					const type =
						criterion?.type || criterion?.criterionOption?.type || null;
					if (!type) return null;
					const modifier = criterion?.modifier ?? criterion?._modifier ?? null;
					const value = Object.hasOwn(criterion || {}, "value")
						? criterion.value
						: criterion?._value;
					return { type, modifier, value };
				})
				.filter((criterion: any) => Boolean(criterion))
		: [];
	return criteria;
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
	const selectedCriteria = normalizeCriteriaForCompare(
		parseTemplateFilterJson(selectedTemplate.filter_json),
	);
	const currentCriteria = normalizeCriteriaForCompare(currentFilter);
	return (
		String(filenameTemplate || "") !==
			String(selectedTemplate.filename_template || "") ||
		String(pathTemplate || "") !==
			String(selectedTemplate.path_template || "") ||
		JSON.stringify(selectedCriteria) !== JSON.stringify(currentCriteria)
	);
}
