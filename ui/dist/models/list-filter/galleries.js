"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GalleryListFilterOptions = exports.PerformerAgeCriterionOption = void 0;
const criterion_1 = require("./criteria/criterion");
const favorite_1 = require("./criteria/favorite");
const is_missing_1 = require("./criteria/is-missing");
const organized_1 = require("./criteria/organized");
const has_chapters_1 = require("./criteria/has-chapters");
const performers_1 = require("./criteria/performers");
const resolution_1 = require("./criteria/resolution");
const scenes_1 = require("./criteria/scenes");
const studios_1 = require("./criteria/studios");
const tags_1 = require("./criteria/tags");
const filter_options_1 = require("./filter-options");
const types_1 = require("./types");
const rating_1 = require("./criteria/rating");
const path_1 = require("./criteria/path");
const custom_fields_1 = require("./criteria/custom-fields");
const folder_1 = require("./criteria/folder");
const defaultSortBy = "path";
const sortByOptions = ["date", ...filter_options_1.MediaSortByOptions]
    .map(filter_options_1.ListFilterOptions.createSortBy)
    .concat([
    {
        messageID: "image_count",
        value: "images_count",
    },
    {
        messageID: "zip_file_count",
        value: "file_count",
    },
]);
const displayModeOptions = [
    types_1.DisplayMode.Grid,
    types_1.DisplayMode.List,
    types_1.DisplayMode.Wall,
];
exports.PerformerAgeCriterionOption = (0, criterion_1.createMandatoryNumberCriterionOption)("performer_age");
const criterionOptions = [
    (0, criterion_1.createStringCriterionOption)("title"),
    (0, criterion_1.createStringCriterionOption)("code", "scene_code"),
    (0, criterion_1.createStringCriterionOption)("details"),
    (0, criterion_1.createStringCriterionOption)("photographer"),
    path_1.PathCriterionOption,
    folder_1.ParentFolderCriterionOption,
    (0, criterion_1.createStringCriterionOption)("checksum", "media_info.md5"),
    rating_1.RatingCriterionOption,
    organized_1.OrganizedCriterionOption,
    resolution_1.AverageResolutionCriterionOption,
    is_missing_1.GalleryIsMissingCriterionOption,
    tags_1.TagsCriterionOption,
    has_chapters_1.HasChaptersCriterionOption,
    (0, criterion_1.createMandatoryNumberCriterionOption)("tag_count"),
    tags_1.PerformerTagsCriterionOption,
    performers_1.PerformersCriterionOption,
    (0, criterion_1.createMandatoryNumberCriterionOption)("performer_count"),
    exports.PerformerAgeCriterionOption,
    favorite_1.PerformerFavoriteCriterionOption,
    (0, criterion_1.createMandatoryNumberCriterionOption)("image_count"),
    // StudioTagsCriterionOption,
    scenes_1.ScenesCriterionOption,
    studios_1.StudiosCriterionOption,
    (0, criterion_1.createStringCriterionOption)("url"),
    (0, criterion_1.createMandatoryNumberCriterionOption)("file_count", "zip_file_count"),
    (0, criterion_1.createDateCriterionOption)("date"),
    (0, criterion_1.createMandatoryTimestampCriterionOption)("created_at"),
    (0, criterion_1.createMandatoryTimestampCriterionOption)("updated_at"),
    custom_fields_1.CustomFieldsCriterionOption,
];
exports.GalleryListFilterOptions = new filter_options_1.ListFilterOptions(defaultSortBy, sortByOptions, displayModeOptions, criterionOptions);
//# sourceMappingURL=galleries.js.map