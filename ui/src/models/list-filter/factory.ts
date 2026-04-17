import { ListFilterOptions } from "./filter-options";
import { GalleryListFilterOptions } from "./galleries";
import { ImageListFilterOptions } from "./images";
import { GroupListFilterOptions } from "./groups";
import { PerformerListFilterOptions } from "./performers";
import { SceneMarkerListFilterOptions } from "./scene-markers";
import { SceneListFilterOptions } from "./scenes";
import { StudioListFilterOptions } from "./studios";
import { TagListFilterOptions } from "./tags";
import { FilterMode } from "src/core/generated-graphql";

function normalizeMode(mode: unknown): string {
	return String(mode || "")
		.trim()
		.toUpperCase()
		.replace(/[\s-]+/g, "_");
}

export function getFilterOptions(mode: FilterMode | string): ListFilterOptions {
	switch (normalizeMode(mode)) {
		case "SCENES":
			return SceneListFilterOptions;
		case "PERFORMERS":
			return PerformerListFilterOptions;
		case "STUDIOS":
			return StudioListFilterOptions;
		case "GALLERIES":
			return GalleryListFilterOptions;
		case "SCENE_MARKERS":
		case "SCENEMARKERS":
			return SceneMarkerListFilterOptions;
		case "MOVIES":
		case "GROUPS":
			return GroupListFilterOptions;
		case "TAGS":
			return TagListFilterOptions;
		case "IMAGES":
			return ImageListFilterOptions;
		default:
			return SceneListFilterOptions;
	}
}
