import { GalleryListFilterOptions } from "./galleries";
import { ImageListFilterOptions } from "./images";
import { GroupListFilterOptions } from "./groups";
import { PerformerListFilterOptions } from "./performers";
import { SceneMarkerListFilterOptions } from "./scene-markers";
import { SceneListFilterOptions } from "./scenes";
import { StudioListFilterOptions } from "./studios";
import { TagListFilterOptions } from "./tags";
var FilterMode;
(function (FilterMode) {
    FilterMode["Scenes"] = "Scenes";
    FilterMode["Performers"] = "Performers";
    FilterMode["Studios"] = "Studios";
    FilterMode["Galleries"] = "Galleries";
    FilterMode["SceneMarkers"] = "SceneMarkers";
    FilterMode["Movies"] = "Movies";
    FilterMode["Groups"] = "Groups";
    FilterMode["Tags"] = "Tags";
    FilterMode["Images"] = "Images";
})(FilterMode || (FilterMode = {}));
export function getFilterOptions(mode) {
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
//# sourceMappingURL=factory.js.map