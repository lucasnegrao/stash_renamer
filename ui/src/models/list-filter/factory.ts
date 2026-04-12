import { ListFilterOptions } from "./filter-options";
import { GalleryListFilterOptions } from "./galleries";
import { ImageListFilterOptions } from "./images";
import { GroupListFilterOptions } from "./groups";
import { PerformerListFilterOptions } from "./performers";
import { SceneMarkerListFilterOptions } from "./scene-markers";
import { SceneListFilterOptions } from "./scenes";
import { StudioListFilterOptions } from "./studios";
import { TagListFilterOptions } from "./tags";
enum FilterMode {
  Scenes = "Scenes",
  Performers = "Performers",
  Studios = "Studios",
  Galleries = "Galleries",
  SceneMarkers = "SceneMarkers",
  Movies = "Movies",
  Groups = "Groups",
  Tags = "Tags",
  Images= "Images"
}
export function getFilterOptions(mode: FilterMode): ListFilterOptions {
  switch (mode) {
    case FilterMode.Scenes:
      return SceneListFilterOptions;
    case FilterMode.Performers:
      return PerformerListFilterOptions;
    case FilterMode.Studios:
      return StudioListFilterOptions;
    case FilterMode.Galleries:
      return GalleryListFilterOptions;
    case FilterMode.SceneMarkers:
      return SceneMarkerListFilterOptions;
    case FilterMode.Movies:
    case FilterMode.Groups:
      return GroupListFilterOptions;
    case FilterMode.Tags:
      return TagListFilterOptions;
    case FilterMode.Images:
      return ImageListFilterOptions;
  }
}
