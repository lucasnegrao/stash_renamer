"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupListFilterOptions = void 0;
const criterion_1 = require("./criteria/criterion");
const is_missing_1 = require("./criteria/is-missing");
const studios_1 = require("./criteria/studios");
const performers_1 = require("./criteria/performers");
const filter_options_1 = require("./filter-options");
const types_1 = require("./types");
const rating_1 = require("./criteria/rating");
// import { StudioTagsCriterionOption } from "./criteria/tags";
const tags_1 = require("./criteria/tags");
const groups_1 = require("./criteria/groups");
const custom_fields_1 = require("./criteria/custom-fields");
const defaultSortBy = "name";
const sortByOptions = [
    "name",
    "random",
    "date",
    "duration",
    "rating",
    "tag_count",
    "sub_group_order",
]
    .map(filter_options_1.ListFilterOptions.createSortBy)
    .concat([
    {
        messageID: "scene_count",
        value: "scenes_count",
    },
    {
        messageID: "o_count",
        value: "o_counter",
        sfwMessageID: "o_count_sfw",
    },
]);
const displayModeOptions = [types_1.DisplayMode.Grid];
const criterionOptions = [
    // StudioTagsCriterionOption,
    studios_1.StudiosCriterionOption,
    is_missing_1.GroupIsMissingCriterionOption,
    (0, criterion_1.createStringCriterionOption)("url"),
    (0, criterion_1.createStringCriterionOption)("name"),
    (0, criterion_1.createStringCriterionOption)("director"),
    (0, criterion_1.createStringCriterionOption)("synopsis"),
    (0, criterion_1.createDurationCriterionOption)("duration"),
    rating_1.RatingCriterionOption,
    performers_1.PerformersCriterionOption,
    (0, criterion_1.createDateCriterionOption)("date"),
    (0, criterion_1.createMandatoryNumberCriterionOption)("o_counter", "o_count", {
        sfwMessageID: "o_count_sfw",
    }),
    groups_1.ContainingGroupsCriterionOption,
    groups_1.SubGroupsCriterionOption,
    (0, criterion_1.createMandatoryNumberCriterionOption)("containing_group_count"),
    (0, criterion_1.createMandatoryNumberCriterionOption)("sub_group_count"),
    tags_1.TagsCriterionOption,
    (0, criterion_1.createMandatoryNumberCriterionOption)("tag_count"),
    (0, criterion_1.createMandatoryNumberCriterionOption)("scene_count"),
    (0, criterion_1.createMandatoryTimestampCriterionOption)("created_at"),
    (0, criterion_1.createMandatoryTimestampCriterionOption)("updated_at"),
    custom_fields_1.CustomFieldsCriterionOption,
];
exports.GroupListFilterOptions = new filter_options_1.ListFilterOptions(defaultSortBy, sortByOptions, displayModeOptions, criterionOptions);
//# sourceMappingURL=groups.js.map