"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageListFilterOptions = exports.PerformerAgeCriterionOption = void 0;
const criterion_1 = require("./criteria/criterion");
const favorite_1 = require("./criteria/favorite");
const is_missing_1 = require("./criteria/is-missing");
const organized_1 = require("./criteria/organized");
const path_1 = require("./criteria/path");
const performers_1 = require("./criteria/performers");
const rating_1 = require("./criteria/rating");
const resolution_1 = require("./criteria/resolution");
const orientation_1 = require("./criteria/orientation");
const studios_1 = require("./criteria/studios");
const tags_1 = require("./criteria/tags");
const filter_options_1 = require("./filter-options");
const types_1 = require("./types");
const galleries_1 = require("./criteria/galleries");
const phash_1 = require("./criteria/phash");
const custom_fields_1 = require("./criteria/custom-fields");
const folder_1 = require("./criteria/folder");
const defaultSortBy = "path";
const sortByOptions = [
    "filesize",
    "file_count",
    "date",
    "resolution",
    ...filter_options_1.MediaSortByOptions,
]
    .map(filter_options_1.ListFilterOptions.createSortBy)
    .concat([
    {
        messageID: "o_count",
        value: "o_counter",
        sfwMessageID: "o_count_sfw",
    },
]);
const displayModeOptions = [types_1.DisplayMode.Grid, types_1.DisplayMode.Wall];
exports.PerformerAgeCriterionOption = (0, criterion_1.createMandatoryNumberCriterionOption)("performer_age");
const criterionOptions = [
    (0, criterion_1.createStringCriterionOption)("title"),
    (0, criterion_1.createStringCriterionOption)("code", "scene_code"),
    (0, criterion_1.createStringCriterionOption)("details"),
    (0, criterion_1.createStringCriterionOption)("photographer"),
    (0, criterion_1.createMandatoryStringCriterionOption)("checksum", "media_info.md5"),
    phash_1.PhashCriterionOption,
    path_1.PathCriterionOption,
    folder_1.FolderCriterionOption,
    galleries_1.GalleriesCriterionOption,
    organized_1.OrganizedCriterionOption,
    (0, criterion_1.createMandatoryNumberCriterionOption)("o_counter", "o_count", {
        sfwMessageID: "o_count_sfw",
    }),
    resolution_1.ResolutionCriterionOption,
    orientation_1.OrientationCriterionOption,
    is_missing_1.ImageIsMissingCriterionOption,
    tags_1.TagsCriterionOption,
    rating_1.RatingCriterionOption,
    (0, criterion_1.createMandatoryNumberCriterionOption)("tag_count"),
    tags_1.PerformerTagsCriterionOption,
    performers_1.PerformersCriterionOption,
    (0, criterion_1.createMandatoryNumberCriterionOption)("performer_count"),
    exports.PerformerAgeCriterionOption,
    favorite_1.PerformerFavoriteCriterionOption,
    // StudioTagsCriterionOption,
    studios_1.StudiosCriterionOption,
    (0, criterion_1.createStringCriterionOption)("url"),
    (0, criterion_1.createDateCriterionOption)("date"),
    (0, criterion_1.createMandatoryNumberCriterionOption)("file_count"),
    (0, criterion_1.createMandatoryTimestampCriterionOption)("created_at"),
    (0, criterion_1.createMandatoryTimestampCriterionOption)("updated_at"),
    custom_fields_1.CustomFieldsCriterionOption,
];
exports.ImageListFilterOptions = new filter_options_1.ListFilterOptions(defaultSortBy, sortByOptions, displayModeOptions, criterionOptions);
//# sourceMappingURL=images.js.map