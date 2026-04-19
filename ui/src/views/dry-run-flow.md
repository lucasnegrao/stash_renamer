# Dry Run & Preview Flow Architecture

The Stash Renamer application utilizes a distinct flow to simulate renaming operations (Dry Run) and display the resulting previews to the user without permanently altering the database. This document details the step-by-step architecture of how the frontend requests, processes, and displays these previews.

## 1. Triggering the Dry Run
**File:** `EditorView.tsx` -> `useEditorLogic.ts`

The flow begins when the user clicks the "Dry Run" button in the `EditorView`. 
1. The button invokes the `runDryRunNow()` action.
2. `runDryRunNow()` resets any existing changed ID plans (`setChangedIdPlan(null)`) and calls `submitRenameTask(true)`.
3. `submitRenameTask(true)` (defined in `useEditorOperations.ts`) contacts the backend to start a background task simulating the rename process using the current `template` and `pathTemplate`.
4. While the backend processes the task, the UI reflects a busy state (`isDryRunBusy`).

## 2. Processing the Dry Run Results
**File:** `useEditorLogic.ts` (`onDryRunCompleted` callback)

Once the backend finishes the dry run task, it returns a batch of operation rows. 
1. The `onDryRunCompleted` callback analyzes these rows.
2. It iterates through the results, ignoring rows where no change would occur (using the `isDryRunRowChanged` helper).
3. It extracts the `scene_id` for every successfully changed scene and stores them in an ordered array (`orderedChangedSceneIds`).
4. It updates the state `changedIdPlan` to `{ mode: "include", ids: [...] }`.

*Note: Setting `changedIdPlan` is the crucial trigger that switches the UI from "Standard Query Mode" to "Changed-Only Mode".*

## 3. Intercepting the Standard GraphQL Query
**File:** `useEditorLogic.ts` (GraphQL vs Custom API)

Normally, the scene list is populated by standard GraphQL queries (`PluginApi.GQL.useFindScenesQuery`).
* When `changedIdPlan` is `null`, the GraphQL query runs normally, fetching scenes based on the user's list filter.
* When `changedIdPlan` is populated (i.e., `hasChangedIdFilter` is `true`), the standard GraphQL query is skipped (`skip: ... || hasChangedIdFilter`).

## 4. Fetching Preview Data by IDs
**File:** `useEditorLogic.ts` (Pagination `useEffect`)

Because the dry run only returns operation results (status, old path, new path) and not the full scene metadata (thumbnails, titles, etc.), the frontend must fetch the `SlimSceneData` for the changed scenes.

1. A `useEffect` hook monitors `hasChangedIdFilter`, `filter` (for pagination), and `orderedChangedSceneIds`.
2. It calculates the current page slice:
   ```typescript
   const start = Math.max(0, (currentPage - 1) * itemsPerPage);
   const end = start + itemsPerPage;
   const pageIds = orderedChangedSceneIds.slice(start, end);
   ```
3. It sets `changedScenesResult.loading` to `true`.
4. It makes a direct REST API call via `queryFindScenesByIds(pageIds)`.
5. When the response arrives, it reconstructs the array of scenes in the exact order of `pageIds` and updates the `changedScenesResult` state.

## 5. Merging State for UI Rendering
**File:** `useEditorLogic.ts` -> `EditorView.tsx` -> `SceneListTable.tsx`

The UI relies on a unified variable called `effectiveScenes` and `effectiveTotalItems`.
* **`effectiveScenes`**: Dynamically points to either the GraphQL results or the custom `changedScenesResult.scenes`.
* **`effectiveTotalItems`**: Points to the total GraphQL count or the length of `orderedChangedSceneIds`.

These effective properties are passed down to `EditorView` and then into `SceneListTreeble`.

## 6. Synchronizing Preview Statuses
**File:** `renamerRuntimeState.ts` -> `SceneListTable.tsx`

While `effectiveScenes` provides the scene metadata (thumbnails, title), it doesn't contain the "New Path" or the "Success/Warning/Fail" status of the dry run.

1. The actual dry run statuses are persisted globally in `renamerRuntimeState.ts` (via `setScenePreviewByIdState`).
2. `useEditorLogic` subscribes to this state and exposes it as `sceneOperationById`.
3. The `SceneListTreeble` component uses `sceneOperationById` during rendering to augment the scene rows:
   * **StatusCell / SelectStatusCell:** Looks up `props.sceneOperationById?.[scene.id]?.status` to display a green check, a warning triangle, or a red X.
   * **NewPathCell:** Looks up `props.sceneOperationById?.[scene.id]?.newPath` to display the predicted new file path.

## Summary of the Data Flow

1. User clicks **Dry Run**.
2. Backend runs simulation -> Returns `[ { scene_id: 1, new_path: "...", status: "success" } ]`.
3. Frontend extracts changed IDs -> `[1]`.
4. Frontend sets `changedIdPlan` to trigger "Changed-Only Mode".
5. Frontend pauses regular GraphQL queries.
6. Frontend calculates pagination and fetches full scene metadata for ID `[1]` via REST API.
7. `effectiveScenes` is updated with the fetched metadata.
8. Table renders, combining `effectiveScenes` (for covers/titles) and `sceneOperationById` (for new paths and status icons).

## Race Conditions & Considerations
* **Debouncing**: If a user is typing in the template editor, `debouncedTemplate` may lag behind `template`. If "Dry Run" is clicked before the debounce settles, it will execute using the stale template. The UI disables the "Dry Run" and "Rename" buttons while `isDebouncing` is true to prevent this.
* **Filter Changes**: If the user modifies the filter (changing the `sortSignature`), the existing dry run results become invalid. `useEditorLogic.ts` tracks `lastDryRunSortSignatureRef` and automatically clears `changedIdPlan` and re-runs the Dry Run if the filter changes while in "Changed-Only Mode".