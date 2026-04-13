export type TScenePreviewStatus = "success" | "warn" | "fail";

export interface IScenePreviewEntry {
  status: TScenePreviewStatus;
  statusText: string;
  newPath: string;
}

type TActiveTab = "editor" | "results";
type TActiveTabListener = (tab: TActiveTab) => void;
type TResultFocusListener = (payload: { batchId?: string | null; token: number }) => void;
type TSceneRuntimeListener = (payload: { token: number }) => void;

let criteriaState: any[] = [];
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

export function setSceneListRuntimeFromProps(props: any): void {
  const nextCriteria = Array.isArray(props?.filter?.criteria) ? props.filter.criteria : [];
  const nextScenes = Array.isArray(props?.scenes) ? props.scenes : [];
  const selectedIds = props?.selectedIds;
  let nextSelected = new Set<string>();
  if (selectedIds instanceof Set) {
    nextSelected = new Set(Array.from(selectedIds).map((id) => String(id)));
  }

  const criteriaSig = JSON.stringify(nextCriteria);
  const scenesSig = nextScenes.map((s: any) => String(s?.id || "")).join(",");
  const signature = `${criteriaSig}::${scenesSig}`;

  criteriaState = nextCriteria;
  sceneListForPreviewState = nextScenes;
  selectedSceneIdsState = nextSelected;

  if (signature === lastSceneRuntimeSignature) return;
  lastSceneRuntimeSignature = signature;
  sceneRuntimeToken += 1;
  const payload = { token: sceneRuntimeToken };
  sceneRuntimeListeners.forEach((cb) => cb(payload));
}

export function getCriteriaState(): any[] {
  return criteriaState;
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

export function setScenePreviewByIdState(next: Record<string, IScenePreviewEntry>): void {
  scenePreviewByIdState = next;
}

export function resetRenamerRuntimeState(): void {
  criteriaState = [];
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

export function subscribeSceneRuntimeState(cb: TSceneRuntimeListener): () => void {
  sceneRuntimeListeners.push(cb);
  return () => {
    sceneRuntimeListeners = sceneRuntimeListeners.filter((x) => x !== cb);
  };
}
