import { CaptionsCriterionOption } from "./criteria/captions";
import {
	createDateCriterionOption,
	createDurationCriterionOption,
	createMandatoryNumberCriterionOption,
	createMandatoryStringCriterionOption,
	createMandatoryTimestampCriterionOption,
	createStringCriterionOption,
} from "./criteria/criterion";
import { CustomFieldsCriterionOption } from "./criteria/custom-fields";
import { PerformerFavoriteCriterionOption } from "./criteria/favorite";
import { FolderCriterionOption } from "./criteria/folder";
import { GalleriesCriterionOption } from "./criteria/galleries";
import {
	GroupsCriterionOption,
	LegacyMoviesCriterionOption,
} from "./criteria/groups";
import { HasMarkersCriterionOption } from "./criteria/has-markers";
import { InteractiveCriterionOption } from "./criteria/interactive";
import { SceneIsMissingCriterionOption } from "./criteria/is-missing";
import { OrganizedCriterionOption } from "./criteria/organized";
import { OrientationCriterionOption } from "./criteria/orientation";
import { PathCriterionOption } from "./criteria/path";
import { PerformersCriterionOption } from "./criteria/performers";
import {
	DuplicatedCriterionOption,
	PhashCriterionOption,
} from "./criteria/phash";
import { RatingCriterionOption } from "./criteria/rating";
import { ResolutionCriterionOption } from "./criteria/resolution";
import { StashIDCriterionOption } from "./criteria/stash-ids";
import { StudiosCriterionOption } from "./criteria/studios";
import {
	PerformerTagsCriterionOption,
	// StudioTagsCriterionOption,
	TagsCriterionOption,
} from "./criteria/tags";
import { ListFilterOptions, MediaSortByOptions } from "./filter-options";
import { DisplayMode } from "./types";

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
	...MediaSortByOptions,
]
	.map(ListFilterOptions.createSortBy)
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
	DisplayMode.Grid,
	DisplayMode.List,
	DisplayMode.Wall,
	DisplayMode.Tagger,
];

export const PerformerAgeCriterionOption =
	createMandatoryNumberCriterionOption("performer_age");

export const DurationCriterionOption =
	createDurationCriterionOption("duration");

const criterionOptions = [
	createStringCriterionOption("title"),
	createStringCriterionOption("code", "scene_code"),
	PathCriterionOption,
	FolderCriterionOption,
	createStringCriterionOption("details"),
	createStringCriterionOption("director"),
	createMandatoryStringCriterionOption("oshash", "media_info.oshash"),
	createStringCriterionOption("checksum", "media_info.md5"),
	PhashCriterionOption,
	DuplicatedCriterionOption,
	OrganizedCriterionOption,
	RatingCriterionOption,
	createMandatoryNumberCriterionOption("o_counter", "o_count", {
		sfwMessageID: "o_count_sfw",
	}),
	ResolutionCriterionOption,
	OrientationCriterionOption,
	createMandatoryNumberCriterionOption("framerate"),
	createMandatoryNumberCriterionOption("bitrate"),
	createStringCriterionOption("video_codec"),
	createStringCriterionOption("audio_codec"),
	DurationCriterionOption,
	createDurationCriterionOption("resume_time"),
	createDurationCriterionOption("play_duration"),
	createMandatoryNumberCriterionOption("play_count"),
	createMandatoryTimestampCriterionOption("last_played_at"),
	HasMarkersCriterionOption,
	SceneIsMissingCriterionOption,
	TagsCriterionOption,
	createMandatoryNumberCriterionOption("tag_count"),
	PerformerTagsCriterionOption,
	PerformersCriterionOption,
	createMandatoryNumberCriterionOption("performer_count"),
	PerformerAgeCriterionOption,
	PerformerFavoriteCriterionOption,
	// StudioTagsCriterionOption,
	StudiosCriterionOption,
	GroupsCriterionOption,
	LegacyMoviesCriterionOption,
	GalleriesCriterionOption,
	createStringCriterionOption("url"),
	StashIDCriterionOption,
	createMandatoryNumberCriterionOption("stash_id_count"),
	InteractiveCriterionOption,
	CaptionsCriterionOption,
	createMandatoryNumberCriterionOption("interactive_speed"),
	createMandatoryNumberCriterionOption("file_count"),
	createDateCriterionOption("date"),
	createMandatoryTimestampCriterionOption("created_at"),
	createMandatoryTimestampCriterionOption("updated_at"),
	CustomFieldsCriterionOption,
];

export const SceneListFilterOptions = new ListFilterOptions(
	defaultSortBy,
	sortByOptions,
	displayModeOptions,
	criterionOptions,
);
