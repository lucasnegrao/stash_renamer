import {
	getCriteriaState,
	getScenePreviewByIdState,
	getSelectedSceneIdsState,
	requestResultsFocus,
	setActiveTabState,
	setScenePreviewByIdState,
} from "../services/renamerRuntimeState";
import {
	fetchOperationBatches,
	type IScenePreviewResult,
	queueRenameTask,
	runDryRunForFilteredScenes,
} from "../services/sceneRenamerApi";
import { trackTaskJob } from "../services/taskProgressService";

const PluginApi = window.PluginApi;
const React = PluginApi.React;

interface IUseEditorOperationsArgs {
	template: string;
	pathTemplate: string;
	debouncedTemplate: string;
	debouncedPathTemplate: string;
	sceneRuntimeToken: number;
	setStatus: (value: string) => void;
	onDryRunCompleted?: (rows: IScenePreviewResult[]) => void;
	getDryRunFindFilter?: () => any;
	getDryRunCriteria?: () => any;
	includeWarnErrorInDryRun?: boolean;
	renameTargetIds?: string[];
}

export function useEditorOperations({
	template,
	pathTemplate,
	debouncedTemplate,
	debouncedPathTemplate,
	sceneRuntimeToken,
	setStatus,
	onDryRunCompleted,
	getDryRunFindFilter,
	getDryRunCriteria,
	includeWarnErrorInDryRun,
	renameTargetIds,
}: IUseEditorOperationsArgs) {
	const [isActionBusy, setIsActionBusy] = React.useState(false);
	const [activeAction, setActiveAction] = React.useState<
		"" | "dry_run" | "rename"
	>("");
	const [isDryRunReady, setIsDryRunReady] = React.useState(false);
	const [taskProgress, setTaskProgress] = React.useState(0);
	const [taskProgressText, setTaskProgressText] = React.useState("");
	const activeTaskCleanupRef = React.useRef<(() => void) | null>(null);

	const getExcludedSceneIds = () => Array.from(getSelectedSceneIdsState());
	const excludedSceneCount = React.useMemo(
		() => getSelectedSceneIdsState().size,
		[sceneRuntimeToken],
	);
	const toErrorMessage = (value: unknown): string =>
		typeof value === "object" &&
		value !== null &&
		"message" in value &&
		typeof (value as { message?: unknown }).message === "string"
			? String((value as { message?: unknown }).message)
			: String(value);

	React.useEffect(() => {
		setIsDryRunReady(false);
	}, [template, pathTemplate]);

	const joinPath = (dir?: string, file?: string) => {
		const safeDir = String(dir || "").trim();
		const safeFile = String(file || "").trim();
		if (!safeDir) return safeFile;
		if (!safeFile) return safeDir;
		const normalizedDir = safeDir.replace(/[\\/]+$/, "");
		const normalizedFile = safeFile.replace(/[\\/]+$/, "");
		const pathParts = normalizedDir.split(/[\\/]/).filter(Boolean);
		const tail = pathParts.length > 0 ? pathParts[pathParts.length - 1] : "";
		if (tail.toLowerCase() === normalizedFile.toLowerCase()) {
			return normalizedDir;
		}
		const sep = normalizedDir.includes("\\") ? "\\" : "/";
		return `${normalizedDir}${sep}${normalizedFile}`;
	};

	const submitRenameTask = async (
		dryRun = false,
		renameTargetIds?: string[],
	) => {
		if (activeTaskCleanupRef.current) {
			activeTaskCleanupRef.current();
			activeTaskCleanupRef.current = null;
		}
		setIsActionBusy(true);
		setActiveAction(dryRun ? "dry_run" : "rename");
		try {
			if (dryRun) {
				setStatus("Running dry run for all filtered scenes...");
				const previewRows = await runDryRunForFilteredScenes({
					template,
					pathTemplate,
					criteria:
						typeof getDryRunCriteria === "function"
							? getDryRunCriteria()
							: getCriteriaState(),
					excludedSceneIds: [],
					findFilter:
						typeof getDryRunFindFilter === "function"
							? getDryRunFindFilter()
							: undefined,
					includeWarnError: Boolean(includeWarnErrorInDryRun),
				});
				const next = { ...getScenePreviewByIdState() } as Record<
					string,
					{
						status: "success" | "warn" | "fail";
						statusText: string;
						newPath: string;
					}
				>;
				(previewRows || []).forEach((row: IScenePreviewResult) => {
					const id = String(row?.scene_id || "");
					if (!id) return;
					const rawStatus = String(row?.status || "").toLowerCase();
					const mappedStatus =
						rawStatus === "success" || rawStatus === "pending"
							? "success"
							: rawStatus === "warn" ||
									rawStatus === "warning" ||
									rawStatus === "skipped"
								? "warn"
								: "fail";
					next[id] = {
						status: mappedStatus,
						statusText: String(row?.log || row?.error || ""),
						newPath: joinPath(
							row?.new_path,
							row?.new_filename || row?.new_name,
						),
					};
				});

				setScenePreviewByIdState(next);
				if (onDryRunCompleted) {
					onDryRunCompleted(previewRows || []);
				}
				setStatus(`Dry run ready for ${previewRows.length} scene(s)`);
				setIsDryRunReady(true);
				return;
			}

			setStatus("Queueing task...");
			console.log("ndskdls");
			console.log(renameTargetIds);
			const excluded = getExcludedSceneIds();
			const jobId = await queueRenameTask(
				renameTargetIds
					? {
							dryRun,
							template,
							pathTemplate,
							criteria: [],
							ids: renameTargetIds.filter((id) => !excluded.includes(id)),
						}
					: {
							dryRun,
							template,
							pathTemplate,
							criteria:
								typeof getDryRunCriteria === "function"
									? getDryRunCriteria()
									: getCriteriaState(),
							excludedSceneIds: excluded,
						},
			);
			if (!jobId) {
				setStatus("Queued (no job id returned)");
				return;
			}

			setTaskProgress(0);
			setTaskProgressText("Starting task...");
			setStatus(`Task queued (${jobId})`);
			const tracker = trackTaskJob(jobId, {
				onProgress: ({ progress, status, error }) => {
					setTaskProgress(progress);
					setTaskProgressText(`${status}${error ? ` - ${error}` : ""}`);
				},
			});
			activeTaskCleanupRef.current = tracker.stop;

			const final = await tracker.done;
			activeTaskCleanupRef.current = null;

			if (String(final.status).toUpperCase() === "FINISHED") {
				try {
					const batches = await fetchOperationBatches();
					const latestBatchId = batches.length > 0 ? String(batches[0].id) : "";
					requestResultsFocus(latestBatchId || null);
					setActiveTabState("results");
					setStatus(`Task ${jobId} finished.`);
				} catch {
					requestResultsFocus(null);
					setActiveTabState("results");
					setStatus(`Task ${jobId} finished.`);
				}
			} else {
				setStatus(
					`Task ${jobId} ended with status ${final.status}${final.error ? `: ${final.error}` : ""}.`,
				);
			}
			setIsActionBusy(false);
			setActiveAction("");
			return;
		} catch (e: unknown) {
			setStatus(`Error: ${toErrorMessage(e)}`);
			setIsActionBusy(false);
			setActiveAction("");
		} finally {
			if (dryRun) {
				setIsActionBusy(false);
				setActiveAction("");
			}
		}
	};

	React.useEffect(() => {
		return () => {
			if (activeTaskCleanupRef.current) {
				activeTaskCleanupRef.current();
				activeTaskCleanupRef.current = null;
			}
		};
	}, []);

	return {
		isActionBusy,
		activeAction,
		isDryRunReady,
		taskProgress,
		taskProgressText,
		excludedSceneCount,
		submitRenameTask,
	};
}
