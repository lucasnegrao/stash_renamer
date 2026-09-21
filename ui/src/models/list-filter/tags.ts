import {
	createBooleanCriterionOption,
	createMandatoryNumberCriterionOption,
	createMandatoryStringCriterionOption,
	createMandatoryTimestampCriterionOption,
	createStringCriterionOption,
	MandatoryNumberCriterionOption,
} from "./criteria/criterion";
import { CustomFieldsCriterionOption } from "./criteria/custom-fields";
import { FavoriteTagCriterionOption } from "./criteria/favorite";
import { TagIsMissingCriterionOption } from "./criteria/is-missing";
import { StashIDCriterionOption } from "./criteria/stash-ids";
import {
	ChildTagsCriterionOption,
	ParentTagsCriterionOption,
} from "./criteria/tags";
import { ListFilterOptions } from "./filter-options";
import { DisplayMode } from "./types";

const defaultSortBy = "name";
const sortByOptions = ["name", "random", "scenes_duration", "scenes_size"]
	.map(ListFilterOptions.createSortBy)
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
	DisplayMode.Grid,
	DisplayMode.List,
	DisplayMode.Tagger,
];
const criterionOptions = [
	FavoriteTagCriterionOption,
	createMandatoryStringCriterionOption("name"),
	createStringCriterionOption("sort_name"),
	TagIsMissingCriterionOption,
	createStringCriterionOption("aliases"),
	createStringCriterionOption("description"),
	createBooleanCriterionOption("ignore_auto_tag"),
	StashIDCriterionOption,
	createMandatoryNumberCriterionOption("scene_count"),
	createMandatoryNumberCriterionOption("image_count"),
	createMandatoryNumberCriterionOption("gallery_count"),
	createMandatoryNumberCriterionOption("performer_count"),
	createMandatoryNumberCriterionOption("studio_count"),
	createMandatoryNumberCriterionOption("group_count"),
	createMandatoryNumberCriterionOption("marker_count"),
	ParentTagsCriterionOption,
	new MandatoryNumberCriterionOption("parent_tag_count", "parent_count"),
	ChildTagsCriterionOption,
	new MandatoryNumberCriterionOption("sub_tag_count", "child_count"),
	createMandatoryTimestampCriterionOption("created_at"),
	createMandatoryTimestampCriterionOption("updated_at"),
	CustomFieldsCriterionOption,
];

export const TagListFilterOptions = new ListFilterOptions(
	defaultSortBy,
	sortByOptions,
	displayModeOptions,
	criterionOptions,
);
