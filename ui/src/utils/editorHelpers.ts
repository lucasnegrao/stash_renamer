import { ISlimSceneData } from "../models/SlimSceneData";
import { Criterion } from "../models/list-filter/criteria/criterion";
import { ListFilterModel } from "../models/list-filter/filter";

export function includesNoChangeMessage(value: unknown): boolean {
	return String(value || "")
		.toLowerCase()
		.includes("no change (same path and filename)");
}

export function isDryRunRowChanged(row: any): boolean {
	const sceneId = String(row?.scene_id || "").trim();
	if (!sceneId) return false;

	const logText = String(row?.log || row?.error || "").toLowerCase();
	if (includesNoChangeMessage(logText)) return false;
	return true;
}

export function applySerializedFilterToModel(
	source: any,
	base: ListFilterModel,
): ListFilterModel {
	if (!source || typeof source !== "object") return base.clone();
	const next = base.clone();

	const assignIfPresent = (key: string) => {
		if (Object.prototype.hasOwnProperty.call(source, key)) {
			(next as any)[key] = source[key];
		}
	};

	assignIfPresent("searchTerm");
	assignIfPresent("currentPage");
	assignIfPresent("itemsPerPage");
	assignIfPresent("sortDirection");
	assignIfPresent("sortBy");
	assignIfPresent("displayMode");
	assignIfPresent("zoomIndex");
	assignIfPresent("randomSeed");

	const outCriteria: Criterion[] = [];
	if (Array.isArray(source.criteria)) {
		for (const rawCriterion of source.criteria) {
			const type = rawCriterion?.type || rawCriterion?.criterionOption?.type;
			if (!type) continue;
			try {
				const criterion = next.makeCriterion(type);
				const payload = {
					modifier: rawCriterion?.modifier ?? rawCriterion?._modifier,
					value: Object.prototype.hasOwnProperty.call(
						rawCriterion || {},
						"value",
					)
						? rawCriterion.value
						: rawCriterion?._value,
				};
				if (typeof (criterion as any).fromDecodedParams === "function") {
					(criterion as any).fromDecodedParams(payload);
				} else {
					Object.assign(criterion as any, payload);
				}
				outCriteria.push(criterion as Criterion);
			} catch {
				// ignore invalid criterion entries from template json
			}
		}
	}

	next.criteria = outCriteria;
	return next;
}

export function getSceneTotalSize(scene: ISlimSceneData): number {
	return (scene.files || []).reduce(
		(sum, file) => sum + Number(file?.size || 0),
		0,
	);
}

export function getSceneDuration(scene: ISlimSceneData): number {
	return Number(scene?.files?.[0]?.duration || 0);
}
