export type TScenePreviewStatus = "success" | "warn" | "fail";

export interface IScenePreviewEntry {
	status: TScenePreviewStatus;
	statusText: string;
	newPath: string;
}

type TActiveTab = "editor" | "results" | "settings";
type TActiveTabListener = (tab: TActiveTab) => void;
type TResultFocusListener = (payload: {
	batchId?: string | null;
	token: number;
}) => void;
type TSceneRuntimeListener = (payload: { token: number }) => void;
type TSetFilterFn = (value: any | ((prevState: any) => any)) => void;

let filterState: any = null;
let sceneListForPreviewState: any[] = [];
let scenePreviewByIdState: Record<string, IScenePreviewEntry> = {};
let selectedSceneIdsState: Set<string> = new Set();
let activeTabState: TActiveTab = "editor";
let activeTabListeners: TActiveTabListener[] = [];
let resultFocusToken = 0;
let resultFocusBatchId: string | null = null;
let resultFocusListeners: TResultFocusListener[] = [];
let sceneRuntimeToken = 0;
let sceneRuntimeListeners: TSceneRuntimeListener[] = [];
let lastSceneRuntimeSignature = "";
let sceneListSetFilterState: TSetFilterFn | null = null;
let lastAppliedFilterSignature = "";

function normalizeSerializedCriterion(rawCriterion: any): any | null {
	if (!rawCriterion || typeof rawCriterion !== "object") return null;
	const fromQueryParams =
		typeof rawCriterion?.toQueryParams === "function"
			? rawCriterion.toQueryParams()
			: rawCriterion;
	const type =
		fromQueryParams?.type ||
		rawCriterion?.type ||
		rawCriterion?.criterionOption?.type;
	if (!type) return null;
	const modifier =
		fromQueryParams?.modifier ??
		rawCriterion?.modifier ??
		rawCriterion?._modifier;
	const value = Object.prototype.hasOwnProperty.call(
		fromQueryParams || {},
		"value",
	)
		? fromQueryParams.value
		: Object.prototype.hasOwnProperty.call(rawCriterion, "value")
			? rawCriterion.value
			: rawCriterion?._value;
	return {
		type,
		modifier,
		value,
	};
}

function toSerializableFilter(source: any): any | null {
	if (!source || typeof source !== "object") return null;
	try {
		const cloned = JSON.parse(JSON.stringify(source));
		const criteria = Array.isArray(source?.criteria)
			? source.criteria
					.map((criterion: any) => normalizeSerializedCriterion(criterion))
					.filter((criterion: any) => Boolean(criterion))
			: [];
		return {
			...cloned,
			criteria,
		};
	} catch {
		const criteria = Array.isArray(source?.criteria) ? source.criteria : [];
		return {
			criteria: criteria
				.map((criterion: any) => normalizeSerializedCriterion(criterion))
				.filter((criterion: any) => Boolean(criterion)),
		};
	}
}

export function setSceneListRuntimeFromProps(props: any): void {
	const nextFilter = toSerializableFilter(props?.filter);
	const nextScenes = Array.isArray(props?.scenes) ? props.scenes : [];
	const selectedIds = props?.selectedIds;
	let nextSelected = new Set<string>();
	if (selectedIds instanceof Set) {
		nextSelected = new Set(Array.from(selectedIds).map((id) => String(id)));
	}

	const filterSig = JSON.stringify(nextFilter || {});
	const scenesSig = nextScenes.map((s: any) => String(s?.id || "")).join(",");
	const signature = `${filterSig}::${scenesSig}`;

	filterState = nextFilter;
	sceneListForPreviewState = nextScenes;
	selectedSceneIdsState = nextSelected;

	if (signature === lastSceneRuntimeSignature) return;
	lastSceneRuntimeSignature = signature;
	sceneRuntimeToken += 1;
	const payload = { token: sceneRuntimeToken };
	sceneRuntimeListeners.forEach((cb) => cb(payload));
}

export function captureSceneListFilterControlsFromProps(props: any): void {
	const nextFilter = toSerializableFilter(props?.filter);
	if (nextFilter) {
		filterState = nextFilter;
	}
	if (typeof props?.setFilter === "function") {
		console.log("found function");
		sceneListSetFilterState = props.setFilter as TSetFilterFn;
	}
}

export function getCriteriaState(): any[] {
	const criteria = filterState?.criteria;
	return Array.isArray(criteria) ? criteria : [];
}

export function getFilterState(): any | null {
	return filterState;
}

export function setFilterState(nextFilter: any): void {
	filterState = toSerializableFilter(nextFilter);
}

export function hasSceneListSetFilterState(): boolean {
	return typeof sceneListSetFilterState === "function";
}

function rebuildCriteriaFromSerialized(
	nextFilter: any,
	workingFilterModel: any,
): any[] {
	if (!Array.isArray(nextFilter?.criteria)) return [];
	const out: any[] = [];
	for (const rawCriterion of nextFilter.criteria) {
		const criterionType =
			rawCriterion?.criterionOption?.type || rawCriterion?.type;
		if (
			!criterionType ||
			typeof workingFilterModel?.makeCriterion !== "function"
		)
			continue;
		try {
			const criterion = workingFilterModel.makeCriterion(criterionType);
			const decodedPayload = {
				modifier: rawCriterion?.modifier ?? rawCriterion?._modifier,
				value: Object.prototype.hasOwnProperty.call(rawCriterion || {}, "value")
					? rawCriterion.value
					: rawCriterion?._value,
			};
			if (typeof criterion?.fromDecodedParams === "function") {
				criterion.fromDecodedParams(decodedPayload);
			} else {
				Object.assign(criterion, decodedPayload);
			}
			out.push(criterion);
		} catch {
			// ignore unsupported or malformed criteria
		}
	}
	return out;
}

export function applyFilterToSceneList(nextFilter: any): boolean {
	if (
		!sceneListSetFilterState ||
		!nextFilter ||
		typeof nextFilter !== "object"
	) {
		return false;
	}

	const serializable = toSerializableFilter(nextFilter);
	if (serializable) {
		const nextSig = JSON.stringify(serializable);
		if (nextSig === lastAppliedFilterSignature) {
			return true;
		}
		filterState = serializable;
		lastAppliedFilterSignature = nextSig;
	}

	sceneListSetFilterState((prevState: any) => {
		if (!prevState || typeof prevState.clone !== "function") {
			return prevState;
		}
		const nextModel = prevState.clone();
		const assignIfPresent = (key: string) => {
			if (Object.prototype.hasOwnProperty.call(nextFilter, key)) {
				nextModel[key] = nextFilter[key];
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

		nextModel.criteria = rebuildCriteriaFromSerialized(nextFilter, nextModel);
		return nextModel;
	});

	return true;
}

export function getSceneListForPreviewState(): any[] {
	return sceneListForPreviewState;
}

export function getSelectedSceneIdsState(): Set<string> {
	return selectedSceneIdsState;
}

export function getScenePreviewByIdState(): Record<string, IScenePreviewEntry> {
	return scenePreviewByIdState;
}

export function setScenePreviewByIdState(
	next: Record<string, IScenePreviewEntry>,
): void {
	scenePreviewByIdState = next;
}

export function resetRenamerRuntimeState(): void {
	filterState = null;
	sceneListSetFilterState = null;
	lastAppliedFilterSignature = "";
	sceneListForPreviewState = [];
	selectedSceneIdsState = new Set();
	scenePreviewByIdState = {};
	activeTabState = "editor";
	resultFocusToken = 0;
	resultFocusBatchId = null;
	sceneRuntimeToken = 0;
	lastSceneRuntimeSignature = "";
}

export function getActiveTabState(): TActiveTab {
	return activeTabState;
}

export function setActiveTabState(tab: TActiveTab): void {
	activeTabState = tab;
	activeTabListeners.forEach((cb) => cb(tab));
}

export function subscribeActiveTabState(cb: TActiveTabListener): () => void {
	activeTabListeners.push(cb);
	return () => {
		activeTabListeners = activeTabListeners.filter((x) => x !== cb);
	};
}

export function requestResultsFocus(batchId?: string | null): void {
	resultFocusToken += 1;
	resultFocusBatchId = batchId ?? null;
	const payload = { batchId: resultFocusBatchId, token: resultFocusToken };
	resultFocusListeners.forEach((cb) => cb(payload));
}

export function subscribeResultsFocus(cb: TResultFocusListener): () => void {
	resultFocusListeners.push(cb);
	return () => {
		resultFocusListeners = resultFocusListeners.filter((x) => x !== cb);
	};
}

export function subscribeSceneRuntimeState(
	cb: TSceneRuntimeListener,
): () => void {
	sceneRuntimeListeners.push(cb);
	return () => {
		sceneRuntimeListeners = sceneRuntimeListeners.filter((x) => x !== cb);
	};
}
