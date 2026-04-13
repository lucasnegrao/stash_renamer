"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SceneMarkerListFilterOptions = void 0;
const performers_1 = require("./criteria/performers");
const scenes_1 = require("./criteria/scenes");
const tags_1 = require("./criteria/tags");
const filter_options_1 = require("./filter-options");
const types_1 = require("./types");
const criterion_1 = require("./criteria/criterion");
const defaultSortBy = "title";
const sortByOptions = [
    "duration",
    "title",
    "seconds",
    "scene_id",
    "random",
    "scenes_updated_at",
].map(filter_options_1.ListFilterOptions.createSortBy);
const displayModeOptions = [types_1.DisplayMode.Grid, types_1.DisplayMode.Wall];
const criterionOptions = [
    tags_1.TagsCriterionOption,
    scenes_1.MarkersScenesCriterionOption,
    tags_1.SceneTagsCriterionOption,
    performers_1.PerformersCriterionOption,
    (0, criterion_1.createNullDurationCriterionOption)("duration"),
    (0, criterion_1.createMandatoryTimestampCriterionOption)("created_at"),
    (0, criterion_1.createMandatoryTimestampCriterionOption)("updated_at"),
    (0, criterion_1.createDateCriterionOption)("scene_date"),
    (0, criterion_1.createMandatoryTimestampCriterionOption)("scene_created_at"),
    (0, criterion_1.createMandatoryTimestampCriterionOption)("scene_updated_at"),
];
exports.SceneMarkerListFilterOptions = new filter_options_1.ListFilterOptions(defaultSortBy, sortByOptions, displayModeOptions, criterionOptions);
//# sourceMappingURL=scene-markers.js.map