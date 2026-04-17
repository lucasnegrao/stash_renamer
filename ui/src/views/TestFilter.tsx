import { ConfirmDialog } from "../components/ConfirmDialog";
import { ListActionToolbar } from "../components/ListActionToolbar";
import { SceneListTreeble } from "../components/SceneListTable";
import { TaskProgressOverlay } from "../components/TaskProgressOverlay";
import { TemplateCrudModal } from "../components/TemplateCrudModal";
import { TemplateEditorModal } from "../components/TemplateEditorModal";
import { EditFilterDialog } from "../components/list/EditFilterDialog";
import { FilterTags } from "../components/list/FilterTags";
import { useEditorOperations } from "../hooks/useEditorOperations";
import { useEditorTemplateCrud } from "../hooks/useEditorTemplateCrud";
import { useEditorTemplateFields } from "../hooks/useEditorTemplateFields";
import { ISlimSceneData } from "../models/SlimSceneData";
import {
	loadFromLocalStorage,
	saveToLocalStorage,
} from "../services/browserStorage";
import {
	getScenePreviewByIdState,
	setScenePreviewByIdState,
	setFilterState,
	subscribeScenePreviewState,
	type IScenePreviewEntry,
} from "../services/renamerRuntimeState";
import { parseTemplateFilterJson } from "../services/templateCrudService";
import { queryFindScenesByIds } from "../services/sceneRenamerApi";
import TextUtils from "../utils/text";
import { Criterion } from "src/models/list-filter/criteria/criterion";
import { ListFilterModel } from "src/models/list-filter/filter";

const PluginApi = window.PluginApi;
const React = PluginApi.React;
const { Button, ButtonGroup, Spinner, FormControl, InputGroup, Alert } =
	PluginApi.libraries.Bootstrap;
const { Icon } = PluginApi.components;
const {
	faCircleCheck,
	faCircleXmark,
	faTriangleExclamation,
	faPencil,
	faFolderOpen,
} = PluginApi.libraries.FontAwesomeSolid;
const DEBUG_PREFIX = "[TestFilter]";
const LAST_TEMPLATE_ID_STORAGE_KEY = "test_filter:last_template_id";

function includesNoChangeMessage(value: unknown): boolean {
	return String(value || "")
		.toLowerCase()
		.includes("no change (same path and filename)");
}

function isDryRunRowChanged(row: any): boolean {
	const sceneId = String(row?.scene_id || "").trim();
	if (!sceneId) return false;

	const logText = String(row?.log || row?.error || "").toLowerCase();
	if (includesNoChangeMessage(logText)) return false;
	return true;
}

type TChangedIdPlan = {
	mode: "include" | "exclude";
	ids: number[];
};

function applySerializedFilterToModel(
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

function getSceneTotalSize(scene: ISlimSceneData): number {
	return (scene.files || []).reduce(
		(sum, file) => sum + Number(file?.size || 0),
		0,
	);
}

function getSceneDuration(scene: ISlimSceneData): number {
	return Number(scene?.files?.[0]?.duration || 0);
}

export const TestFilter: React.FC = () => {
	const Pagination =
		(PluginApi.components as any).Pagination ||
		(PluginApi.components as any).pagination;
	const PaginationIndex =
		(PluginApi.components as any).PaginationIndex ||
		(PluginApi.components as any).paginationIndex;

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
	const [showTemplateCrudModal, setShowTemplateCrudModal] =
		React.useState(false);
	const [showTemplateEditorModal, setShowTemplateEditorModal] =
		React.useState(false);
	const [filenamePreviewSceneId, setFilenamePreviewSceneId] =
		React.useState("");
	const [pathPreviewSceneId, setPathPreviewSceneId] = React.useState("");
	const [changedIdPlan, setChangedIdPlan] =
		React.useState<TChangedIdPlan | null>(null);
	const [orderedChangedSceneIds, setOrderedChangedSceneIds] = React.useState<
		string[]
	>([]);
	const lastDryRunSortSignatureRef = React.useRef("");
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
	const [sceneOperationById, setSceneOperationById] = React.useState<
		Record<string, IScenePreviewEntry>
	>(() => ({ ...getScenePreviewByIdState() }));

	const {
		template,
		setTemplate,
		pathTemplate,
		setPathTemplate,
		debouncedTemplate,
		debouncedPathTemplate,
		sceneRuntimeToken,
		templateInputRef,
		pathTemplateInputRef,
		handleDropOnInput,
	} = useEditorTemplateFields();

	const {
		savedTemplates,
		selectedSavedTemplateId,
		isSavingTemplate,
		isDeletingTemplate,
		isSelectedTemplateDirty,
		applyTemplateById,
		reloadSelectedTemplate,
		saveAsCurrentTemplateToDatabase,
		saveSelectedTemplateToDatabase,
		deleteSelectedTemplate,
	} = useEditorTemplateCrud({
		template,
		pathTemplate,
		sceneRuntimeToken,
		setTemplate,
		setPathTemplate,
		setStatus,
	});

	const {
		isActionBusy,
		activeAction,
		isDryRunReady,
		taskProgress,
		taskProgressText,
		previewBusyCount,
		excludedSceneCount,
		submitRenameTask,
	} = useEditorOperations({
		template,
		pathTemplate,
		debouncedTemplate,
		debouncedPathTemplate,
		livePreview,
		setLivePreview,
		sceneRuntimeToken,
		setStatus,
		getDryRunFindFilter: () => {
			const raw = (filter?.makeFindFilter() || {}) as Record<string, any>;
			const next = { ...raw, page: 1 };
			if (Number(next.per_page || 0) <= 0) {
				next.per_page = 250;
			}
			return next;
		},
		includeWarnErrorInDryRun: false,
		onDryRunCompleted: (rows) => {
			const statusCounts: Record<string, number> = {};
			const changedIds = new Set<number>();
			const orderedIds: string[] = [];
			for (const row of rows || []) {
				const rawStatus = String(row?.status || "").toLowerCase() || "unknown";
				statusCounts[rawStatus] = Number(statusCounts[rawStatus] || 0) + 1;
				const sceneId = Number.parseInt(String(row?.scene_id || "").trim(), 10);
				if (!isDryRunRowChanged(row)) continue;
				if (Number.isFinite(sceneId) && !changedIds.has(sceneId)) {
					changedIds.add(sceneId);
					orderedIds.push(String(sceneId));
				}
			}
			setOrderedChangedSceneIds(orderedIds);
			setChangedIdPlan({
				mode: "include",
				ids: Array.from(changedIds.values()),
			});
			lastDryRunSortSignatureRef.current = sortSignature;
			console.debug(`${DEBUG_PREFIX} dry-run rows analyzed`, {
				rowsLen: Array.isArray(rows) ? rows.length : 0,
				statusCounts,
				changedIdsCount: changedIds.size,
				orderedIdsCount: orderedIds.length,
				sample: (rows || []).slice(0, 8).map((row) => ({
					scene_id: row?.scene_id,
					status: row?.status,
					log: row?.log,
					error: row?.error,
					old_path: row?.old_path,
					new_path: row?.new_path,
					old_name: row?.old_name || row?.old_filename,
					new_name: row?.new_name || row?.new_filename,
				})),
			});
			if (changedIds.size === 0) {
				window.setTimeout(() => setStatus("No files would be changed."), 0);
			}
		},
	});
	const hasChangedIdFilter = changedIdPlan !== null;

	const queryResult = PluginApi.GQL.useFindScenesQuery({
		skip: filter === undefined || hasChangedIdFilter,
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
	const sortSignature = React.useMemo(() => {
		const ff = (filter?.makeFindFilter() || {}) as Record<string, any>;
		return JSON.stringify({
			sort: String(ff.sort || ""),
			direction: String(ff.direction || ""),
		});
	}, [filter]);
	const sceneFilterSignature = React.useMemo(() => {
		if (hasChangedIdFilter) return "changed-mode-backend-query";
		return JSON.stringify(filter?.makeFilter() ?? {});
	}, [filter, hasChangedIdFilter]);
	React.useEffect(() => {
		if (!hasChangedIdFilter || !filter) return;
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
	}, [hasChangedIdFilter, filter, orderedChangedSceneIds]);

	React.useEffect(() => {
		if (!hasChangedIdFilter) return;
		if (isActionBusy) return;
		const previous = String(lastDryRunSortSignatureRef.current || "");
		if (!previous) {
			lastDryRunSortSignatureRef.current = sortSignature;
			return;
		}
		if (previous === sortSignature) return;
		lastDryRunSortSignatureRef.current = sortSignature;
		setChangedIdPlan(null);
		setOrderedChangedSceneIds([]);
		setChangedScenesResult({
			loading: false,
			error: null,
			count: 0,
			scenes: [],
		});
		submitRenameTask(true);
	}, [hasChangedIdFilter, sortSignature, isActionBusy, submitRenameTask]);
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
		if (Boolean(queryResult?.loading)) return;
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
		? Boolean(changedScenesResult.loading)
		: Boolean(queryResult?.loading);
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

	const isPreviewLoading = previewBusyCount > 0;
	const isDryRunBusy = isActionBusy && activeAction === "dry_run";
	const isRenameBusy = isActionBusy && activeAction === "rename";

	React.useEffect(() => {
		const sync = () => setSceneOperationById({ ...getScenePreviewByIdState() });
		sync();
		const unsub = subscribeScenePreviewState(sync);
		return () => unsub();
	}, []);

	const shouldExcludeUnmodified = hasChangedIdFilter;
	const effectiveScenes = scenes;
	const effectiveTotalItems = totalItems;

	const criteriaSignature = React.useMemo(() => {
		const criteria = Array.isArray(filter?.criteria) ? filter.criteria : [];
		const normalized = criteria.map((criterion: any) => {
			const type = criterion?.type || criterion?.criterionOption?.type || "";
			const modifier = criterion?.modifier ?? criterion?._modifier ?? "";
			const value = Object.prototype.hasOwnProperty.call(
				criterion || {},
				"value",
			)
				? criterion.value
				: criterion?._value;
			return { type, modifier, value };
		});
		return JSON.stringify(normalized);
	}, [filter?.criteria]);

	React.useEffect(() => {
		setChangedIdPlan(null);
		setOrderedChangedSceneIds([]);
		lastDryRunSortSignatureRef.current = "";
		setChangedScenesResult({
			loading: false,
			error: null,
			count: 0,
			scenes: [],
		});
		setScenePreviewByIdState({});
		setSceneOperationById({});
		setSelectedIds(new Set());
	}, [template, pathTemplate, criteriaSignature]);

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

	const effectiveTotals = React.useMemo(() => {
		if (!shouldExcludeUnmodified) {
			return { duration: totalDuration, size: totalSize };
		}
		return scenes.reduce(
			(acc, scene) => {
				acc.duration += getSceneDuration(scene);
				acc.size += getSceneTotalSize(scene);
				return acc;
			},
			{ duration: 0, size: 0 },
		);
	}, [shouldExcludeUnmodified, scenes, totalDuration, totalSize]);

	const metadataByline = React.useMemo(() => {
		const { size, unit } = TextUtils.fileSize(effectiveTotals.size);
		const sizeLabel = `${size.toFixed(
			TextUtils.fileSizeFractionalDigits(unit),
		)} ${TextUtils.formatFileSizeUnit(unit)}`;
		const durationLabel = TextUtils.secondsAsTimeString(
			effectiveTotals.duration || 0,
			2,
		);
		return `${durationLabel} | ${sizeLabel}`;
	}, [effectiveTotals]);

	React.useEffect(() => {
		if (!filter) return;
		setFilterState(filter);
	}, [filter]);

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
		if (!filter) return;
		const selectedTemplate = savedTemplates.find(
			(t) => String(t.id) === String(templateId),
		);
		if (!selectedTemplate) return;
		const parsed = parseTemplateFilterJson(selectedTemplate.filter_json);
		if (!parsed) return;
		setFilter(applySerializedFilterToModel(parsed, filter));
		window.setTimeout(() => {
			setChangedIdPlan(null);
			submitRenameTask(true);
		}, 0);
	}

	function runDryRunNow() {
		// Always recompute changed/unmodified sets from the full current filter.
		setChangedIdPlan(null);
		submitRenameTask(true);
	}

	React.useEffect(() => {
		if (initialTemplateRestoreDoneRef.current) return;
		if (!Array.isArray(savedTemplates) || savedTemplates.length === 0) return;
		initialTemplateRestoreDoneRef.current = true;

		const lastTemplateId = String(
			loadFromLocalStorage<string>(LAST_TEMPLATE_ID_STORAGE_KEY, "") || "",
		).trim();
		if (!lastTemplateId) return;
		const exists = savedTemplates.some(
			(t) => String(t.id) === String(lastTemplateId),
		);
		if (!exists) return;
		onSelectTemplate(lastTemplateId);
	}, [savedTemplates]);

	const toolbarTail = (
		<>
			<ButtonGroup>
				<Button
					variant="secondary"
					title="Template manager"
					onClick={() => setShowTemplateCrudModal(true)}
					disabled={isActionBusy}
				>
					<Icon icon={faFolderOpen} />
				</Button>
				<FormControl
					as="select"
					value={selectedSavedTemplateId}
					disabled={isActionBusy || isSavingTemplate || isDeletingTemplate}
					onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
						const templateId = String(e.target.value || "");
						if (!templateId) return;
						onSelectTemplate(templateId);
					}}
					style={{ minWidth: "220px", maxWidth: "320px" }}
				>
					<option value="">Select saved template...</option>
					{savedTemplates.map((t) => (
						<option key={String(t.id)} value={String(t.id)}>
							{String(t.name || "")}
						</option>
					))}
				</FormControl>
				<Button
					variant={livePreview ? "primary" : "secondary"}
					title={livePreview ? "Disable live preview" : "Enable live preview"}
					onClick={() => setLivePreview(!livePreview)}
					disabled={isActionBusy}
				>
					<Icon icon={livePreview ? faCircleCheck : faCircleXmark} />
				</Button>
				<Button
					variant="secondary"
					title="Dry run"
					onClick={() => runDryRunNow()}
					disabled={isActionBusy || isPreviewLoading}
				>
					{isDryRunBusy || isPreviewLoading ? (
						<Spinner animation="border" size="sm" role="status" />
					) : (
						<Icon icon={faTriangleExclamation} />
					)}
				</Button>
				<Button
					variant="primary"
					title="Rename"
					onClick={() => setShowRenameConfirm(true)}
					disabled={isActionBusy || !isDryRunReady}
				>
					{isRenameBusy ? (
						<Spinner animation="border" size="sm" role="status" />
					) : (
						<Icon icon={faCircleCheck} />
					)}
				</Button>
			</ButtonGroup>
		</>
	);

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
						Rename will run for the current filter minus selected scenes (
						{excludedSceneCount} excluded). Continue?
					</>
				}
				confirmLabel="Confirm Rename"
				staticBackdrop
				onCancel={() => setShowRenameConfirm(false)}
				onConfirm={() => {
					setShowRenameConfirm(false);
					submitRenameTask(false);
				}}
			/>
			<TemplateCrudModal
				show={showTemplateCrudModal}
				onHide={() => setShowTemplateCrudModal(false)}
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

			{filter ? (
				<ListActionToolbar
					filter={filter}
					onSetFilter={(next) => setFilter(next)}
					onEditFilter={() => setEditingCriterion("___open___")}
					afterContent={toolbarTail}
				/>
			) : null}

			<div className="mb-3">
				<InputGroup className="mb-2">
					<FormControl
						ref={templateInputRef}
						type="text"
						className="clearable-text-field"
						value={template}
						disabled={isActionBusy}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
							setTemplate(e.target.value)
						}
						onDragOver={(e: React.DragEvent<HTMLInputElement>) =>
							e.preventDefault()
						}
						onDrop={handleDropOnInput("filename")}
						placeholder="{{ scene.studio.name }} - {{ scene.date }} - {{ scene.title }}"
					/>

					<InputGroup.Text className="clearable-text-field">
						File Template
					</InputGroup.Text>

					<Button
						variant="secondary"
						title="Open file template editor"
						onClick={() => setShowTemplateEditorModal(true)}
					>
						<Icon icon={faPencil} />
					</Button>
				</InputGroup>

				<InputGroup className="mb-2">
					<FormControl
						ref={pathTemplateInputRef}
						type="text"
						disabled={isActionBusy}
						placeholder="e.g., /Library/{{ scene.studio.name }} or ../Archive/{{ scene.studio.name }}"
						value={pathTemplate}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
							setPathTemplate(e.target.value)
						}
						onDragOver={(e: React.DragEvent<HTMLInputElement>) =>
							e.preventDefault()
						}
						onDrop={handleDropOnInput("path")}
						className="clearable-text-field"
					/>
					<InputGroup.Text className="clearable-text-field">
						Path Template
					</InputGroup.Text>

					<Button
						variant="secondary"
						title="Open path template editor"
						onClick={() => setShowTemplateEditorModal(true)}
					>
						<Icon icon={faPencil} />
					</Button>
				</InputGroup>
			</div>

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

			<div className="pagination-index-container">
				{Pagination ? (
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
				) : null}
				{PaginationIndex ? (
					<PaginationIndex
						loading={loading}
						itemsPerPage={itemsPerPage}
						currentPage={currentPage}
						totalItems={effectiveTotalItems}
						metadataByline={metadataByline}
					/>
				) : null}
			</div>

			<div className="mb-2">
				<Alert variant="info" className="mb-0">
					{status || "Ready"}
				</Alert>
			</div>

			{shouldExcludeUnmodified ? (
				<div className="mb-2 text-muted small">
					{Array.isArray(changedIdPlan?.ids)
						? `Showing ${effectiveTotalItems} scene(s) with changed-only filter (${changedIdPlan?.mode === "exclude" ? "excluding unchanged IDs" : "including changed IDs"}).`
						: "Run dry run to limit results to changed scenes."}
				</div>
			) : null}

			{error ? (
				<div className="text-danger mb-2">
					{String(error || "Failed to load scenes")}
				</div>
			) : null}

			<SceneListTreeble
				scenes={effectiveScenes}
				sceneOperationById={sceneOperationById}
				selectedIds={selectedIds}
				onSelectChange={(id: string, checked: boolean) =>
					onSelectChange(id, checked)
				}
			/>

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
