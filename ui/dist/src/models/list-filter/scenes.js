"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SceneListFilterOptions = exports.DurationCriterionOption = exports.PerformerAgeCriterionOption = void 0;
const criterion_1 = require("./criteria/criterion");
const has_markers_1 = require("./criteria/has-markers");
const is_missing_1 = require("./criteria/is-missing");
const groups_1 = require("./criteria/groups");
const galleries_1 = require("./criteria/galleries");
const organized_1 = require("./criteria/organized");
const performers_1 = require("./criteria/performers");
const resolution_1 = require("./criteria/resolution");
const studios_1 = require("./criteria/studios");
const interactive_1 = require("./criteria/interactive");
const tags_1 = require("./criteria/tags");
const filter_options_1 = require("./filter-options");
const types_1 = require("./types");
const phash_1 = require("./criteria/phash");
const favorite_1 = require("./criteria/favorite");
const captions_1 = require("./criteria/captions");
const stash_ids_1 = require("./criteria/stash-ids");
const rating_1 = require("./criteria/rating");
const path_1 = require("./criteria/path");
const orientation_1 = require("./criteria/orientation");
const custom_fields_1 = require("./criteria/custom-fields");
const folder_1 = require("./criteria/folder");
const defaultSortBy = "date";
const sortByOptions = [
    "organized",
    "date",
    "file_count",
    "filesize",
    "duration",
    "framerate",
    "resolution",
    "bitrate",
    "last_played_at",
    "resume_time",
    "play_duration",
    "play_count",
    "interactive",
    "interactive_speed",
    "perceptual_similarity",
    "performer_age",
    "studio",
    ...filter_options_1.MediaSortByOptions,
]
    .map(filter_options_1.ListFilterOptions.createSortBy)
    .concat([
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
    {
        messageID: "group_scene_number",
        value: "group_scene_number",
    },
    {
        messageID: "scene_code",
        value: "code",
    },
]);
const displayModeOptions = [
    types_1.DisplayMode.Grid,
    types_1.DisplayMode.List,
    types_1.DisplayMode.Wall,
    types_1.DisplayMode.Tagger,
];
exports.PerformerAgeCriterionOption = (0, criterion_1.createMandatoryNumberCriterionOption)("performer_age");
exports.DurationCriterionOption = (0, criterion_1.createDurationCriterionOption)("duration");
const criterionOptions = [
    (0, criterion_1.createStringCriterionOption)("title"),
    (0, criterion_1.createStringCriterionOption)("code", "scene_code"),
    path_1.PathCriterionOption,
    folder_1.FolderCriterionOption,
    (0, criterion_1.createStringCriterionOption)("details"),
    (0, criterion_1.createStringCriterionOption)("director"),
    (0, criterion_1.createMandatoryStringCriterionOption)("oshash", "media_info.oshash"),
    (0, criterion_1.createStringCriterionOption)("checksum", "media_info.md5"),
    phash_1.PhashCriterionOption,
    phash_1.DuplicatedCriterionOption,
    organized_1.OrganizedCriterionOption,
    rating_1.RatingCriterionOption,
    (0, criterion_1.createMandatoryNumberCriterionOption)("o_counter", "o_count", {
        sfwMessageID: "o_count_sfw",
    }),
    resolution_1.ResolutionCriterionOption,
    orientation_1.OrientationCriterionOption,
    (0, criterion_1.createMandatoryNumberCriterionOption)("framerate"),
    (0, criterion_1.createMandatoryNumberCriterionOption)("bitrate"),
    (0, criterion_1.createStringCriterionOption)("video_codec"),
    (0, criterion_1.createStringCriterionOption)("audio_codec"),
    exports.DurationCriterionOption,
    (0, criterion_1.createDurationCriterionOption)("resume_time"),
    (0, criterion_1.createDurationCriterionOption)("play_duration"),
    (0, criterion_1.createMandatoryNumberCriterionOption)("play_count"),
    (0, criterion_1.createMandatoryTimestampCriterionOption)("last_played_at"),
    has_markers_1.HasMarkersCriterionOption,
    is_missing_1.SceneIsMissingCriterionOption,
    tags_1.TagsCriterionOption,
    (0, criterion_1.createMandatoryNumberCriterionOption)("tag_count"),
    tags_1.PerformerTagsCriterionOption,
    performers_1.PerformersCriterionOption,
    (0, criterion_1.createMandatoryNumberCriterionOption)("performer_count"),
    exports.PerformerAgeCriterionOption,
    favorite_1.PerformerFavoriteCriterionOption,
    // StudioTagsCriterionOption,
    studios_1.StudiosCriterionOption,
    groups_1.GroupsCriterionOption,
    groups_1.LegacyMoviesCriterionOption,
    galleries_1.GalleriesCriterionOption,
    (0, criterion_1.createStringCriterionOption)("url"),
    stash_ids_1.StashIDCriterionOption,
    (0, criterion_1.createMandatoryNumberCriterionOption)("stash_id_count"),
    interactive_1.InteractiveCriterionOption,
    captions_1.CaptionsCriterionOption,
    (0, criterion_1.createMandatoryNumberCriterionOption)("interactive_speed"),
    (0, criterion_1.createMandatoryNumberCriterionOption)("file_count"),
    (0, criterion_1.createDateCriterionOption)("date"),
    (0, criterion_1.createMandatoryTimestampCriterionOption)("created_at"),
    (0, criterion_1.createMandatoryTimestampCriterionOption)("updated_at"),
    custom_fields_1.CustomFieldsCriterionOption,
];
exports.SceneListFilterOptions = new filter_options_1.ListFilterOptions(defaultSortBy, sortByOptions, displayModeOptions, criterionOptions);
//# sourceMappingURL=scenes.js.map