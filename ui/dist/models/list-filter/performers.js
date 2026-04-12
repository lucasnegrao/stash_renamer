"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PerformerListFilterOptions = void 0;
const criterion_1 = require("./criteria/criterion");
const favorite_1 = require("./criteria/favorite");
const gender_1 = require("./criteria/gender");
const circumcised_1 = require("./criteria/circumcised");
const is_missing_1 = require("./criteria/is-missing");
const stash_ids_1 = require("./criteria/stash-ids");
const studios_1 = require("./criteria/studios");
const tags_1 = require("./criteria/tags");
const filter_options_1 = require("./filter-options");
const types_1 = require("./types");
const country_1 = require("./criteria/country");
const rating_1 = require("./criteria/rating");
const custom_fields_1 = require("./criteria/custom-fields");
const groups_1 = require("./criteria/groups");
const defaultSortBy = "name";
const sortByOptions = [
    "name",
    "height",
    "birthdate",
    "tag_count",
    "random",
    "rating",
    "penis_length",
    "play_count",
    "last_played_at",
    "latest_scene",
    "career_start",
    "career_end",
    "weight",
    "measurements",
    "scenes_duration",
    "scenes_size",
]
    .map(filter_options_1.ListFilterOptions.createSortBy)
    .concat([
    {
        messageID: "scene_count",
        value: "scenes_count",
    },
    {
        messageID: "image_count",
        value: "images_count",
    },
    {
        messageID: "gallery_count",
        value: "galleries_count",
    },
    {
        messageID: "o_count",
        value: "o_counter",
        sfwMessageID: "o_count_sfw",
    },
    {
        messageID: "last_o_at",
        value: "last_o_at",
        sfwMessageID: "last_o_at_sfw",
    },
]);
const displayModeOptions = [
    types_1.DisplayMode.Grid,
    types_1.DisplayMode.List,
    types_1.DisplayMode.Tagger,
];
const numberCriteria = [
    "birth_year",
    "death_year",
    "age",
    "weight",
    "penis_length",
];
const stringCriteria = [
    "name",
    "disambiguation",
    "details",
    "ethnicity",
    "hair_color",
    "eye_color",
    "measurements",
    "fake_tits",
    "tattoos",
    "piercings",
    "aliases",
];
const criterionOptions = [
    favorite_1.FavoritePerformerCriterionOption,
    gender_1.GenderCriterionOption,
    circumcised_1.CircumcisedCriterionOption,
    is_missing_1.PerformerIsMissingCriterionOption,
    tags_1.TagsCriterionOption,
    groups_1.GroupsCriterionOption,
    studios_1.StudiosCriterionOption,
    stash_ids_1.StashIDCriterionOption,
    (0, criterion_1.createStringCriterionOption)("url"),
    rating_1.RatingCriterionOption,
    (0, criterion_1.createMandatoryNumberCriterionOption)("tag_count"),
    (0, criterion_1.createMandatoryNumberCriterionOption)("scene_count"),
    (0, criterion_1.createMandatoryNumberCriterionOption)("image_count"),
    (0, criterion_1.createMandatoryNumberCriterionOption)("gallery_count"),
    (0, criterion_1.createMandatoryNumberCriterionOption)("play_count"),
    (0, criterion_1.createMandatoryNumberCriterionOption)("o_counter", "o_count", {
        sfwMessageID: "o_count_sfw",
    }),
    (0, criterion_1.createBooleanCriterionOption)("ignore_auto_tag"),
    country_1.CountryCriterionOption,
    (0, criterion_1.createNumberCriterionOption)("height_cm", "height"),
    ...numberCriteria.map((c) => (0, criterion_1.createNumberCriterionOption)(c)),
    ...stringCriteria.map((c) => (0, criterion_1.createStringCriterionOption)(c)),
    (0, criterion_1.createDateCriterionOption)("birthdate"),
    (0, criterion_1.createDateCriterionOption)("death_date"),
    (0, criterion_1.createDateCriterionOption)("career_start"),
    (0, criterion_1.createDateCriterionOption)("career_end"),
    (0, criterion_1.createMandatoryTimestampCriterionOption)("created_at"),
    (0, criterion_1.createMandatoryTimestampCriterionOption)("updated_at"),
    custom_fields_1.CustomFieldsCriterionOption,
];
exports.PerformerListFilterOptions = new filter_options_1.ListFilterOptions(defaultSortBy, sortByOptions, displayModeOptions, criterionOptions);
//# sourceMappingURL=performers.js.map