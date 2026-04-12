"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TagListFilterOptions = void 0;
const criterion_1 = require("./criteria/criterion");
const is_missing_1 = require("./criteria/is-missing");
const filter_options_1 = require("./filter-options");
const types_1 = require("./types");
const tags_1 = require("./criteria/tags");
const favorite_1 = require("./criteria/favorite");
const stash_ids_1 = require("./criteria/stash-ids");
const custom_fields_1 = require("./criteria/custom-fields");
const defaultSortBy = "name";
const sortByOptions = ["name", "random", "scenes_duration", "scenes_size"]
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
        messageID: "performer_count",
        value: "performers_count",
    },
    {
        messageID: "scene_count",
        value: "scenes_count",
    },
    {
        messageID: "group_count",
        value: "groups_count",
    },
    {
        messageID: "marker_count",
        value: "scene_markers_count",
    },
    {
        messageID: "studio_count",
        value: "studios_count",
    },
]);
const displayModeOptions = [
    types_1.DisplayMode.Grid,
    types_1.DisplayMode.List,
    types_1.DisplayMode.Tagger,
];
const criterionOptions = [
    favorite_1.FavoriteTagCriterionOption,
    (0, criterion_1.createMandatoryStringCriterionOption)("name"),
    (0, criterion_1.createStringCriterionOption)("sort_name"),
    is_missing_1.TagIsMissingCriterionOption,
    (0, criterion_1.createStringCriterionOption)("aliases"),
    (0, criterion_1.createStringCriterionOption)("description"),
    (0, criterion_1.createBooleanCriterionOption)("ignore_auto_tag"),
    stash_ids_1.StashIDCriterionOption,
    (0, criterion_1.createMandatoryNumberCriterionOption)("scene_count"),
    (0, criterion_1.createMandatoryNumberCriterionOption)("image_count"),
    (0, criterion_1.createMandatoryNumberCriterionOption)("gallery_count"),
    (0, criterion_1.createMandatoryNumberCriterionOption)("performer_count"),
    (0, criterion_1.createMandatoryNumberCriterionOption)("studio_count"),
    (0, criterion_1.createMandatoryNumberCriterionOption)("group_count"),
    (0, criterion_1.createMandatoryNumberCriterionOption)("marker_count"),
    tags_1.ParentTagsCriterionOption,
    new criterion_1.MandatoryNumberCriterionOption("parent_tag_count", "parent_count"),
    tags_1.ChildTagsCriterionOption,
    new criterion_1.MandatoryNumberCriterionOption("sub_tag_count", "child_count"),
    (0, criterion_1.createMandatoryTimestampCriterionOption)("created_at"),
    (0, criterion_1.createMandatoryTimestampCriterionOption)("updated_at"),
    custom_fields_1.CustomFieldsCriterionOption,
];
exports.TagListFilterOptions = new filter_options_1.ListFilterOptions(defaultSortBy, sortByOptions, displayModeOptions, criterionOptions);
//# sourceMappingURL=tags.js.map