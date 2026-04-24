import type { Criterion } from "../models/list-filter/criteria/criterion";
import { ListFilterModel } from "../models/list-filter/filter";
import type { ISlimSceneData } from "../models/SlimSceneData";
import {
	loadFromLocalStorage,
	saveToLocalStorage,
} from "../services/browserStorage";
import {
	getScenePreviewByIdState,
	type IScenePreviewEntry,
	setFilterState,
	setScenePreviewByIdState,
	subscribeScenePreviewState,
} from "../services/renamerRuntimeState";
import { queryFindScenesByIds } from "../api/stasheroApi";
import { parseTemplateFilterJson } from "../services/templateCrudService";
import { applySerializedFilterToModel } from "../utils/editorHelpers";
import { useEditorOperations } from "./useEditorOperations";
import { useEditorTemplateCrud } from "./useEditorTemplateCrud";
import { useEditorTemplateFields } from "./useEditorTemplateFields";

const PluginApi = window.PluginApi;
const React: typeof import("react") = PluginApi.React;
const DEBUG_PREFIX = "[TestFilter]";
const LAST_TEMPLATE_ID_STORAGE_KEY = "test_filter:last_template_id";

type TChangedIdPlan = {
	mode: "include" | "exclude";
	ids: number[];
};

export function useEditorLogic() {
	const [filter, setFilter] = React.useState<ListFilterModel | undefined>(
		() => new ListFilterModel(PluginApi.GQL.FilterMode.Scenes),
	);
	const [editingCriterion, setEditingCriterion] = React.useState<
		string | undefined
	>();
	const [selectedIds, setSelectedIds] = React.useState<Set<string>>(new Set());
	const [status, setStatus] = React.useState("");
	const [livePreview, setLivePreview] = React.useState(false);
	const [showRenameConfirm, setShowRenameConfirm] = React.useState(false);
	const [showTemplateEditorModal, setShowTemplateEditorModal] =
		React.useState(false);
	const [filenamePreviewSceneId, setFilenamePreviewSceneId] =
		React.useState("");
	const [pathPreviewSceneId, setPathPreviewSceneId] = React.useState("");
	const [statusFilters, setStatusFilters] = React.useState({
		success: true,
		error: true,
		warn: false,
	});
	const [changedIdPlan, setChangedIdPlan] =
		React.useState<TChangedIdPlan | null>(null);
	const [orderedChangedSceneIds, setOrderedChangedSceneIds] = React.useState<
		string[]
	>([]);
	const [renameTargetIds, setRenameTargetIds] = React.useState<string[]>([]);
	const [statusCounts, setStatusCounts] = React.useState({
		success: 0,
		error: 0,
		warn: 0,
	});
	const [totalAnalyzedCount, setTotalAnalyzedCount] = React.useState(0);
	const [lastDryRunRows, setLastDryRunRows] = React.useState<any[] | null>(
		null,
	);
	const lastRequestLogRef = React.useRef("");
	const lastResponseLogRef = React.useRef("");
	const [changedScenesResult, setChangedScenesResult] = React.useState<{
		loading: boolean;
		error: string | null;
		count: number;
		scenes: ISlimSceneData[];
	}>({
		loading: false,
		error: null,
		count: 0,
		scenes: [],
	});
	const initialTemplateRestoreDoneRef = React.useRef(false);
	const initialStoredTemplateIdRef = React.useRef(
		String(
			loadFromLocalStorage<string>(LAST_TEMPLATE_ID_STORAGE_KEY, "") || "",
		).trim(),
	);
	const [sceneOperationById, setSceneOperationById] = React.useState<
		Record<string, IScenePreviewEntry>
	>(() => ({ ...getScenePreviewByIdState() }));

	const toggleStatusFilter = React.useCallback(
		(statusType: "success" | "error" | "warn") => {
			setStatusFilters((prev) => ({
				...prev,
				[statusType]: !prev[statusType],
			}));
		},
		[],
	);

	const templateFields = useEditorTemplateFields();
	const {
		template,
		setTemplate,
		pathTemplate,
		setPathTemplate,
		debouncedTemplate,
		debouncedPathTemplate,
		sceneRuntimeToken,
	} = templateFields;

	const criteriaSignature = React.useMemo(() => {
		const criteria = Array.isArray(filter?.criteria) ? filter.criteria : [];
		const normalized = criteria.map((criterion: any) => {
			const type = criterion?.type || criterion?.criterionOption?.type || "";
			const modifier = criterion?.modifier ?? criterion?._modifier ?? "";
			const value = Object.hasOwn(criterion || {}, "value")
				? criterion.value
				: criterion?._value;
			return { type, modifier, value };
		});
		return JSON.stringify(normalized);
	}, [filter?.criteria]);

	const templateCrud = useEditorTemplateCrud({
		template,
		pathTemplate,
		sceneRuntimeToken,
		setTemplate,
		setPathTemplate,
		setStatus,
		currentCriteria: filter?.criteria || [],
		criteriaSignature,
	});
	const { savedTemplates, applyTemplateById } = templateCrud;
	const isInitialTemplateHydrating =
		Boolean(initialStoredTemplateIdRef.current) &&
		!initialTemplateRestoreDoneRef.current;
	const history = PluginApi.libraries.ReactRouterDOM.useHistory?.();

	const navigateToResults = React.useCallback(() => {
		const nextPath = "/plugins/stashero/results";
		if (history && typeof history.push === "function") {
			if (String(window.location.pathname || "") !== nextPath) {
				history.push(nextPath);
			}
			return;
		}
		if (String(window.location.pathname || "") === nextPath) return;
		window.history.pushState({}, "", nextPath);
		window.dispatchEvent(new PopStateEvent("popstate"));
	}, [history]);

	const operations = useEditorOperations({
		template,
		pathTemplate,
		debouncedTemplate,
		debouncedPathTemplate,
		sceneRuntimeToken,
		setStatus,
		getDryRunFindFilter: () => {
			const raw = (filter?.makeFindFilter() || {}) as Record<string, any>;
			const next: Record<string, any> = { ...raw, page: 1 };
			if (Number((next as any).per_page || 0) <= 0) {
				(next as any).per_page = 250;
			}
			return next;
		},
		getDryRunCriteria: () => filter?.criteria || [],
		includeWarnErrorInDryRun: true,
		renameTargetIds,
		onNavigateToResults: navigateToResults,
		onDryRunCompleted: (rows) => {
			setLastDryRunRows(rows || []);
			let hasChanges = false;
			for (const row of rows || []) {
				const rawStatus = String(row?.status || "").toLowerCase();
				const mappedStatus =
					rawStatus === "success" || rawStatus === "pending"
						? "success"
						: rawStatus === "warn" ||
								rawStatus === "warning" ||
								rawStatus === "skipped"
							? "warn"
							: "error";

				if (mappedStatus === "success") {
					hasChanges = true;
					break;
				}
			}
			if (!hasChanges) {
				window.setTimeout(() => setStatus("No files would be changed."), 0);
			}
		},
	});
	const { isActionBusy, activeAction, submitRenameTask } = operations;
	const hasChangedIdFilter = changedIdPlan !== null;

	React.useEffect(() => {
		if (lastDryRunRows === null) return;

		const changedIds = new Set<number>();
		const actualChangedIds = new Set<number>();
		const orderedIds: string[] = [];

		let cSuccess = 0;
		let cError = 0;
		let cWarn = 0;

		for (const row of lastDryRunRows) {
			const sceneId = Number.parseInt(String(row?.scene_id || "").trim(), 10);
			const rawStatus = String(row?.status || "").toLowerCase();
			const mappedStatus =
				rawStatus === "success" || rawStatus === "pending"
					? "success"
					: rawStatus === "warn" ||
							rawStatus === "warning" ||
							rawStatus === "skipped"
						? "warn"
						: "error";

			if (mappedStatus === "success") {
				cSuccess++;
				if (Number.isFinite(sceneId)) actualChangedIds.add(sceneId);
			} else if (mappedStatus === "error") {
				cError++;
			} else if (mappedStatus === "warn") {
				cWarn++;
			}

			if (!statusFilters[mappedStatus as keyof typeof statusFilters]) {
				continue;
			}
			if (Number.isFinite(sceneId) && !changedIds.has(sceneId)) {
				changedIds.add(sceneId);
				orderedIds.push(String(sceneId));
			}
		}

		setOrderedChangedSceneIds(orderedIds);
		setStatusCounts({ success: cSuccess, error: cError, warn: cWarn });
		setTotalAnalyzedCount(lastDryRunRows.length);
		setRenameTargetIds(Array.from(actualChangedIds).map(String));
		setChangedIdPlan({
			mode: "include",
			ids: Array.from(changedIds.values()),
		});
	}, [lastDryRunRows, statusFilters]);

	const queryResult = PluginApi.GQL.useFindScenesQuery({
		skip:
			filter === undefined ||
			hasChangedIdFilter ||
			livePreview ||
			isInitialTemplateHydrating,
		fetchPolicy: "cache-first",
		nextFetchPolicy: "cache-first",
		notifyOnNetworkStatusChange: true,
		variables: {
			filter: filter?.makeFindFilter(),
			scene_filter: filter?.makeFilter(),
		},
	});

	const findFilterSignature = React.useMemo(
		() => JSON.stringify(filter?.makeFindFilter() ?? {}),
		[filter],
	);

	const sceneFilterSignature = React.useMemo(() => {
		if (hasChangedIdFilter) return "changed-mode-backend-query";
		return JSON.stringify(filter?.makeFilter() ?? {});
	}, [filter, hasChangedIdFilter]);

	React.useEffect(() => {
		if (!hasChangedIdFilter || !filter) return;
		if (isActionBusy) return;

		const totalCount = orderedChangedSceneIds.length;
		const currentPage = filter.currentPage ?? 1;
		const itemsPerPage = filter.itemsPerPage ?? 40;
		const start = Math.max(0, (currentPage - 1) * itemsPerPage);
		const end = start + itemsPerPage;
		const pageIds = orderedChangedSceneIds.slice(start, end);
		if (pageIds.length === 0) {
			setChangedScenesResult({
				loading: false,
				error: null,
				count: totalCount,
				scenes: [],
			});
			return;
		}
		let cancelled = false;
		setChangedScenesResult((prev) => ({
			...prev,
			loading: true,
			error: null,
			count: totalCount,
		}));
		queryFindScenesByIds({
			filter: { page: 1, per_page: pageIds.length },
			sceneFilter: undefined,
			ids: pageIds,
		})
			.then((result) => {
				if (cancelled) return;
				const byId = new Map(
					(result?.scenes || []).map((scene: any) => [
						String(scene?.id || ""),
						scene,
					]),
				);
				const orderedScenes = pageIds
					.map((id) => byId.get(String(id)))
					.filter((scene) => Boolean(scene)) as ISlimSceneData[];
				setChangedScenesResult({
					loading: false,
					error: null,
					count: totalCount,
					scenes: orderedScenes,
				});
			})
			.catch((err: unknown) => {
				if (cancelled) return;
				const message =
					err instanceof Error ? err.message : String(err || "Unknown error");
				setChangedScenesResult({
					loading: false,
					error: message,
					count: totalCount,
					scenes: [],
				});
			});
		return () => {
			cancelled = true;
		};
	}, [hasChangedIdFilter, filter, orderedChangedSceneIds, isActionBusy]);

	const isDryRunBusy = isActionBusy && activeAction === "dry_run";
	const isRenameBusy = isActionBusy && activeAction === "rename";

	React.useEffect(() => {
		if (!filter) return;
		const payload = {
			mode: hasChangedIdFilter ? "changed-only" : "normal",
			findFilter: filter.makeFindFilter(),
			sceneFilter: hasChangedIdFilter
				? "handled-by-frontend:dry-run ids + findScenes(ids)"
				: filter.makeFilter(),
			sceneIdsCount: hasChangedIdFilter ? orderedChangedSceneIds.length : 0,
			sceneIdsMode: hasChangedIdFilter ? changedIdPlan?.mode : undefined,
		};
		const signature = JSON.stringify(payload);
		if (signature === lastRequestLogRef.current) return;
		lastRequestLogRef.current = signature;
		console.debug(`${DEBUG_PREFIX} useFindScenes request`, payload);
	}, [
		hasChangedIdFilter,
		findFilterSignature,
		sceneFilterSignature,
		changedIdPlan,
		orderedChangedSceneIds,
		filter,
	]);

	React.useEffect(() => {
		if (queryResult?.loading) return;
		const payload = {
			mode: hasChangedIdFilter ? "changed-only" : "normal",
			rawCount: hasChangedIdFilter
				? Number(orderedChangedSceneIds.length)
				: Number(queryResult?.data?.findScenes?.count ?? 0),
			rawScenesLen: hasChangedIdFilter
				? Number(changedScenesResult?.scenes?.length ?? 0)
				: Number(queryResult?.data?.findScenes?.scenes?.length ?? 0),
			page: filter?.currentPage,
			perPage: filter?.itemsPerPage,
		};
		const signature = JSON.stringify(payload);
		if (signature === lastResponseLogRef.current) return;
		lastResponseLogRef.current = signature;
		console.debug(`${DEBUG_PREFIX} useFindScenes response`, payload);
	}, [
		hasChangedIdFilter,
		queryResult?.loading,
		queryResult?.data,
		changedScenesResult,
		orderedChangedSceneIds,
		filter,
	]);

	const loading = hasChangedIdFilter
		? Boolean(changedScenesResult.loading) || isDryRunBusy
		: Boolean(queryResult?.loading) || isDryRunBusy;
	const error = hasChangedIdFilter
		? changedScenesResult.error
		: queryResult?.error?.message || null;
	const scenes = hasChangedIdFilter
		? changedScenesResult.scenes
		: ((queryResult?.data?.findScenes?.scenes ?? []) as ISlimSceneData[]);
	const totalItems = hasChangedIdFilter
		? Number(orderedChangedSceneIds.length || 0)
		: Number(queryResult?.data?.findScenes?.count ?? 0);
	const totalSize = hasChangedIdFilter
		? 0
		: Number(queryResult?.data?.findScenes?.filesize ?? 0);
	const totalDuration = hasChangedIdFilter
		? 0
		: Number(queryResult?.data?.findScenes?.duration ?? 0);
	const currentPage = filter?.currentPage ?? 1;
	const itemsPerPage = filter?.itemsPerPage ?? 40;

	React.useEffect(() => {
		const sync = () => setSceneOperationById({ ...getScenePreviewByIdState() });
		sync();
		const unsub = subscribeScenePreviewState(sync);
		return () => unsub();
	}, []);

	const shouldExcludeUnmodified = hasChangedIdFilter;
	const effectiveScenes = scenes;
	const effectiveTotalItems = totalItems;

	const currentDryRunStateSignature = React.useMemo(() => {
		const rawFindFilter = (filter?.makeFindFilter() || {}) as Record<
			string,
			any
		>;
		return JSON.stringify({
			template: debouncedTemplate,
			pathTemplate: debouncedPathTemplate,
			findFilter: {
				q: rawFindFilter.q,
				sort: rawFindFilter.sort,
				direction: rawFindFilter.direction,
			},
			sceneFilter: filter?.makeFilter(),
			criteria: criteriaSignature,
		});
	}, [debouncedTemplate, debouncedPathTemplate, filter, criteriaSignature]);

	const lastExecutedDryRunSignature = React.useRef("");
	const isDebouncing =
		template !== debouncedTemplate || pathTemplate !== debouncedPathTemplate;
	const isDryRunDirty =
		livePreview &&
		(currentDryRunStateSignature !== lastExecutedDryRunSignature.current ||
			isDebouncing);

	React.useEffect(() => {
		if (!livePreview) {
			if (
				changedIdPlan !== null ||
				lastExecutedDryRunSignature.current !== ""
			) {
				setChangedIdPlan(null);
				setOrderedChangedSceneIds([]);
				setChangedScenesResult({
					loading: false,
					error: null,
					count: 0,
					scenes: [],
				});
				setScenePreviewByIdState({});
				setSceneOperationById({});
				setSelectedIds(new Set());
				setStatusCounts({ success: 0, error: 0, warn: 0 });
				setTotalAnalyzedCount(0);
				setRenameTargetIds([]);
				setLastDryRunRows(null);
				lastExecutedDryRunSignature.current = "";
			}
			return;
		}

		if (isDebouncing) return;
		if (isActionBusy) return;

		if (currentDryRunStateSignature !== lastExecutedDryRunSignature.current) {
			// Hide stale preview rows while the next dry-run is recomputed.
			setChangedIdPlan(null);
			setOrderedChangedSceneIds([]);
			setChangedScenesResult({
				loading: false,
				error: null,
				count: 0,
				scenes: [],
			});
			setSelectedIds(new Set());
			setStatusCounts({ success: 0, error: 0, warn: 0 });
			setTotalAnalyzedCount(0);
			setRenameTargetIds([]);
			setLastDryRunRows(null);
			lastExecutedDryRunSignature.current = currentDryRunStateSignature;
			submitRenameTask(true);
		}
	}, [
		livePreview,
		isDebouncing,
		isActionBusy,
		currentDryRunStateSignature,
		submitRenameTask,
		changedIdPlan,
	]);

	const previewGateLoading =
		livePreview &&
		(!hasChangedIdFilter || isDebouncing || isDryRunBusy || isDryRunDirty);
	const startupHydrationLoading = isInitialTemplateHydrating;

	React.useEffect(() => {
		const firstId = String(effectiveScenes?.[0]?.id || "");
		setFilenamePreviewSceneId((prev) => {
			if (prev && effectiveScenes.some((scene) => String(scene.id) === prev)) {
				return prev;
			}
			return firstId;
		});
		setPathPreviewSceneId((prev) => {
			if (prev && effectiveScenes.some((scene) => String(scene.id) === prev)) {
				return prev;
			}
			return firstId;
		});
	}, [effectiveScenes]);

	const metadataByline = React.useMemo(() => {
		if (startupHydrationLoading) {
			return "Loading template...";
		}
		if (previewGateLoading) {
			return "Computing preview results...";
		}

		const total = hasChangedIdFilter
			? totalAnalyzedCount
			: Number(queryResult?.data?.findScenes?.count ?? 0);

		if (!hasChangedIdFilter) {
			return `0 pending changes from ${total} filtered files`;
		}

		const parts = [];
		if (statusFilters.success) parts.push(`${statusCounts.success} pending`);
		if (statusFilters.error) parts.push(`${statusCounts.error} errors`);
		if (statusFilters.warn) parts.push(`${statusCounts.warn} unchanged`);

		const shownText = parts.length > 0 ? parts.join(" + ") : "0 files";
		return `${shownText} shown from ${total} total files`;
	}, [
		totalAnalyzedCount,
		hasChangedIdFilter,
		queryResult?.data?.findScenes?.count,
		statusFilters,
		statusCounts,
		startupHydrationLoading,
		previewGateLoading,
	]);

	function updateFilter(updater: (prev: ListFilterModel) => ListFilterModel) {
		setFilter((prev: ListFilterModel | undefined) => {
			const base = prev ?? new ListFilterModel(PluginApi.GQL.FilterMode.Scenes);
			return updater(base);
		});
	}

	function onSelectChange(id: string, selected: boolean) {
		setSelectedIds((prev: Set<string>) => {
			const next = new Set(prev);
			if (selected) next.add(String(id));
			else next.delete(String(id));
			return next;
		});
	}

	function removeCriterion(criterion: Criterion, valueIndex?: number) {
		if (!filter) return;
		let next = filter.clone();
		if (valueIndex !== undefined) {
			next = next.removeCustomFieldCriterion(
				criterion.criterionOption.type,
				valueIndex,
			);
		} else {
			next = next.removeCriterion(criterion.criterionOption.type);
		}
		setFilter(next);
	}

	function clearAllCriteria() {
		if (!filter) return;
		const next = filter.clone();
		next.criteria = [];
		next.currentPage = 1;
		setFilter(next);
	}

	function onSelectTemplate(templateId: string) {
		applyTemplateById(templateId);
		saveToLocalStorage(LAST_TEMPLATE_ID_STORAGE_KEY, String(templateId || ""));
		setLivePreview(true);
		if (!filter) return;
		const selectedTemplate = savedTemplates.find(
			(t: any) => String(t.id) === String(templateId),
		);
		if (!selectedTemplate) return;
		const parsed = parseTemplateFilterJson(selectedTemplate.filter_json);
		if (!parsed) return;
		setFilter(applySerializedFilterToModel(parsed, filter));
	}

	function onSelectTemplateIdOnly(templateId: string) {
		const normalizedId = String(templateId || "").trim();
		templateCrud.setSelectedTemplateId(normalizedId);
		saveToLocalStorage(LAST_TEMPLATE_ID_STORAGE_KEY, normalizedId);
	}

	function reloadSelectedTemplate() {
		if (templateCrud.selectedSavedTemplateId) {
			onSelectTemplate(templateCrud.selectedSavedTemplateId);
		}
	}

	React.useEffect(() => {
		if (initialTemplateRestoreDoneRef.current) return;
		if (!templateCrud.templatesLoaded) return;
		initialTemplateRestoreDoneRef.current = true;

		const lastTemplateId = String(
			loadFromLocalStorage<string>(LAST_TEMPLATE_ID_STORAGE_KEY, "") || "",
		).trim();
		if (!lastTemplateId) return;
		if (!Array.isArray(savedTemplates) || savedTemplates.length === 0) return;
		const exists = savedTemplates.some(
			(t) => String(t.id) === String(lastTemplateId),
		);
		if (!exists) return;
		onSelectTemplate(lastTemplateId);
	}, [savedTemplates, templateCrud.templatesLoaded]);

	return {
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
			loading: loading || previewGateLoading || startupHydrationLoading,
			error,
			currentPage,
			itemsPerPage,
			shouldExcludeUnmodified,
			sceneOperationById,
			renameTargetIds,
			changedIdPlan,
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
		templateFields,
		templateCrud: {
			...templateCrud,
			reloadSelectedTemplate,
			onSelectTemplateIdOnly,
		},
		operations: {
			...operations,
			isDryRunBusy,
			isRenameBusy,
		},
	};
}
