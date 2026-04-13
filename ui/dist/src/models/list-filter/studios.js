"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudioListFilterOptions = void 0;
const criterion_1 = require("./criteria/criterion");
const favorite_1 = require("./criteria/favorite");
const is_missing_1 = require("./criteria/is-missing");
const rating_1 = require("./criteria/rating");
const stash_ids_1 = require("./criteria/stash-ids");
const studios_1 = require("./criteria/studios");
const tags_1 = require("./criteria/tags");
const filter_options_1 = require("./filter-options");
const types_1 = require("./types");
const custom_fields_1 = require("./criteria/custom-fields");
const defaultSortBy = "name";
const sortByOptions = [
    "name",
    "tag_count",
    "random",
    "rating",
    "scenes_duration",
    "scenes_size",
    "latest_scene",
]
    .map(filter_options_1.ListFilterOptions.createSortBy)
    .concat([
    {
        messageID: "gallery_count",
        value: "galleries_count",
    },
    {
        messageID: "image_count",
        value: "images_count",
    },
    {
        messageID: "scene_count",
        value: "scenes_count",
    },
    {
        messageID: "subsidiary_studio_count",
        value: "child_count",
    },
]);
const displayModeOptions = [types_1.DisplayMode.Grid, types_1.DisplayMode.Tagger];
const criterionOptions = [
    favorite_1.FavoriteStudioCriterionOption,
    (0, criterion_1.createMandatoryStringCriterionOption)("name"),
    (0, criterion_1.createStringCriterionOption)("details"),
    studios_1.ParentStudiosCriterionOption,
    is_missing_1.StudioIsMissingCriterionOption,
    tags_1.TagsCriterionOption,
    rating_1.RatingCriterionOption,
    (0, criterion_1.createBooleanCriterionOption)("ignore_auto_tag"),
    (0, criterion_1.createBooleanCriterionOption)("organized"),
    (0, criterion_1.createMandatoryNumberCriterionOption)("tag_count"),
    (0, criterion_1.createMandatoryNumberCriterionOption)("scene_count"),
    (0, criterion_1.createMandatoryNumberCriterionOption)("image_count"),
    (0, criterion_1.createMandatoryNumberCriterionOption)("gallery_count"),
    (0, criterion_1.createStringCriterionOption)("url"),
    stash_ids_1.StashIDCriterionOption,
    (0, criterion_1.createStringCriterionOption)("aliases"),
    (0, criterion_1.createMandatoryNumberCriterionOption)("child_count", "subsidiary_studio_count"),
    (0, criterion_1.createMandatoryTimestampCriterionOption)("created_at"),
    (0, criterion_1.createMandatoryTimestampCriterionOption)("updated_at"),
    custom_fields_1.CustomFieldsCriterionOption,
];
exports.StudioListFilterOptions = new filter_options_1.ListFilterOptions(defaultSortBy, sortByOptions, displayModeOptions, criterionOptions);
//# sourceMappingURL=studios.js.map