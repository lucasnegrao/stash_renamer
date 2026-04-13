"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFilterOptions = getFilterOptions;
const galleries_1 = require("./galleries");
const images_1 = require("./images");
const groups_1 = require("./groups");
const performers_1 = require("./performers");
const scene_markers_1 = require("./scene-markers");
const scenes_1 = require("./scenes");
const studios_1 = require("./studios");
const tags_1 = require("./tags");
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
function getFilterOptions(mode) {
    switch (mode) {
        case FilterMode.Scenes:
            return scenes_1.SceneListFilterOptions;
        case FilterMode.Performers:
            return performers_1.PerformerListFilterOptions;
        case FilterMode.Studios:
            return studios_1.StudioListFilterOptions;
        case FilterMode.Galleries:
            return galleries_1.GalleryListFilterOptions;
        case FilterMode.SceneMarkers:
            return scene_markers_1.SceneMarkerListFilterOptions;
        case FilterMode.Movies:
        case FilterMode.Groups:
            return groups_1.GroupListFilterOptions;
        case FilterMode.Tags:
            return tags_1.TagListFilterOptions;
        case FilterMode.Images:
            return images_1.ImageListFilterOptions;
    }
}
//# sourceMappingURL=factory.js.map