"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleUnsavedChanges = handleUnsavedChanges;
const GQL = __importStar(require("src/core/generated-graphql"));
const performers_1 = require("src/models/list-filter/criteria/performers");
const country_1 = require("src/models/list-filter/criteria/country");
const studios_1 = require("src/models/list-filter/criteria/studios");
const tags_1 = require("src/models/list-filter/criteria/tags");
const filter_1 = require("src/models/list-filter/filter");
const groups_1 = require("src/models/list-filter/criteria/groups");
const criterion_1 = require("src/models/list-filter/criteria/criterion");
const galleries_1 = require("src/models/list-filter/criteria/galleries");
const phash_1 = require("src/models/list-filter/criteria/phash");
const galleries_2 = require("src/core/galleries");
const scenes_1 = require("src/models/list-filter/criteria/scenes");
const files_1 = require("src/core/files");
function addExtraCriteria(dest, src) {
    if (src && src.length > 0) {
        dest.push(...src);
    }
}
const makePerformerScenesUrl = (performer, extraPerformer, extraCriteria) => {
    if (!performer.id)
        return "#";
    const filter = new filter_1.ListFilterModel(GQL.FilterMode.Scenes, undefined);
    const criterion = new performers_1.PerformersCriterion();
    criterion.value.items = [
        { id: performer.id, label: performer.name || `Performer ${performer.id}` },
    ];
    if (extraPerformer) {
        criterion.value.items.push(extraPerformer);
    }
    filter.criteria.push(criterion);
    addExtraCriteria(filter.criteria, extraCriteria);
    return `/scenes?${filter.makeQueryParameters()}`;
};
const makePerformerImagesUrl = (performer, extraPerformer, extraCriteria) => {
    if (!performer.id)
        return "#";
    const filter = new filter_1.ListFilterModel(GQL.FilterMode.Images, undefined);
    const criterion = new performers_1.PerformersCriterion();
    criterion.value.items = [
        { id: performer.id, label: performer.name || `Performer ${performer.id}` },
    ];
    if (extraPerformer) {
        criterion.value.items.push(extraPerformer);
    }
    filter.criteria.push(criterion);
    addExtraCriteria(filter.criteria, extraCriteria);
    return `/images?${filter.makeQueryParameters()}`;
};
const makePerformerGalleriesUrl = (performer, extraPerformer, extraCriteria) => {
    if (!performer.id)
        return "#";
    const filter = new filter_1.ListFilterModel(GQL.FilterMode.Galleries, undefined);
    const criterion = new performers_1.PerformersCriterion();
    criterion.value.items = [
        { id: performer.id, label: performer.name || `Performer ${performer.id}` },
    ];
    if (extraPerformer) {
        criterion.value.items.push(extraPerformer);
    }
    filter.criteria.push(criterion);
    addExtraCriteria(filter.criteria, extraCriteria);
    return `/galleries?${filter.makeQueryParameters()}`;
};
const makePerformerGroupsUrl = (performer, extraPerformer, extraCriteria) => {
    if (!performer.id)
        return "#";
    const filter = new filter_1.ListFilterModel(GQL.FilterMode.Groups, undefined);
    const criterion = new performers_1.PerformersCriterion();
    criterion.value.items = [
        { id: performer.id, label: performer.name || `Performer ${performer.id}` },
    ];
    if (extraPerformer) {
        criterion.value.items.push(extraPerformer);
    }
    filter.criteria.push(criterion);
    addExtraCriteria(filter.criteria, extraCriteria);
    return `/groups?${filter.makeQueryParameters()}`;
};
const makePerformerSceneMarkersUrl = (performer) => {
    if (!performer.id)
        return "#";
    const filter = new filter_1.ListFilterModel(GQL.FilterMode.SceneMarkers, undefined);
    const criterion = new performers_1.PerformersCriterion();
    criterion.value.items = [
        { id: performer.id, label: performer.name || `Performer ${performer.id}` },
    ];
    filter.criteria.push(criterion);
    return `/scenes/markers?${filter.makeQueryParameters()}`;
};
const makePerformersCountryUrl = (performer) => {
    if (!performer.id)
        return "#";
    const filter = new filter_1.ListFilterModel(GQL.FilterMode.Performers, undefined);
    const criterion = new country_1.CountryCriterion();
    criterion.value = `${performer.country}`;
    filter.criteria.push(criterion);
    return `/performers?${filter.makeQueryParameters()}`;
};
const makeStudioScenesUrl = (studio) => {
    if (!studio.id)
        return "#";
    const filter = new filter_1.ListFilterModel(GQL.FilterMode.Scenes, undefined);
    const criterion = new studios_1.StudiosCriterion();
    criterion.value = {
        items: [{ id: studio.id, label: studio.name || `Studio ${studio.id}` }],
        excluded: [],
        depth: 0,
    };
    filter.criteria.push(criterion);
    return `/scenes?${filter.makeQueryParameters()}`;
};
const makeStudioImagesUrl = (studio) => {
    if (!studio.id)
        return "#";
    const filter = new filter_1.ListFilterModel(GQL.FilterMode.Images, undefined);
    const criterion = new studios_1.StudiosCriterion();
    criterion.value = {
        items: [{ id: studio.id, label: studio.name || `Studio ${studio.id}` }],
        excluded: [],
        depth: 0,
    };
    filter.criteria.push(criterion);
    return `/images?${filter.makeQueryParameters()}`;
};
const makeStudioGalleriesUrl = (studio) => {
    if (!studio.id)
        return "#";
    const filter = new filter_1.ListFilterModel(GQL.FilterMode.Galleries, undefined);
    const criterion = new studios_1.StudiosCriterion();
    criterion.value = {
        items: [{ id: studio.id, label: studio.name || `Studio ${studio.id}` }],
        excluded: [],
        depth: 0,
    };
    filter.criteria.push(criterion);
    return `/galleries?${filter.makeQueryParameters()}`;
};
const makeStudioGroupsUrl = (studio) => {
    if (!studio.id)
        return "#";
    const filter = new filter_1.ListFilterModel(GQL.FilterMode.Groups, undefined);
    const criterion = new studios_1.StudiosCriterion();
    criterion.value = {
        items: [{ id: studio.id, label: studio.name || `Studio ${studio.id}` }],
        excluded: [],
        depth: 0,
    };
    filter.criteria.push(criterion);
    return `/groups?${filter.makeQueryParameters()}`;
};
const makeStudioPerformersUrl = (studio) => {
    if (!studio.id)
        return "#";
    const filter = new filter_1.ListFilterModel(GQL.FilterMode.Performers, undefined);
    const criterion = new studios_1.StudiosCriterion();
    criterion.value = {
        items: [{ id: studio.id, label: studio.name || `Studio ${studio.id}` }],
        excluded: [],
        depth: 0,
    };
    filter.criteria.push(criterion);
    return `/performers?${filter.makeQueryParameters()}`;
};
const makeChildStudiosUrl = (studio) => {
    if (!studio.id)
        return "#";
    const filter = new filter_1.ListFilterModel(GQL.FilterMode.Studios, undefined);
    const criterion = new studios_1.ParentStudiosCriterion();
    criterion.value = [
        { id: studio.id, label: studio.name || `Studio ${studio.id}` },
    ];
    filter.criteria.push(criterion);
    return `/studios?${filter.makeQueryParameters()}`;
};
const makeGroupScenesUrl = (group) => {
    if (!group.id)
        return "#";
    const filter = new filter_1.ListFilterModel(GQL.FilterMode.Scenes, undefined);
    const criterion = new groups_1.GroupsCriterion(groups_1.GroupsCriterionOption);
    criterion.value = {
        items: [{ id: group.id, label: group.name || `Group ${group.id}` }],
        excluded: [],
        depth: 0,
    };
    filter.criteria.push(criterion);
    return `/scenes?${filter.makeQueryParameters()}`;
};
const makeTagUrl = (id) => {
    return `/tags/${id}`;
};
const makeParentTagsUrl = (tag) => {
    if (!tag.id)
        return "#";
    const filter = new filter_1.ListFilterModel(GQL.FilterMode.Tags, undefined);
    const criterion = new tags_1.TagsCriterion(tags_1.ChildTagsCriterionOption);
    criterion.value = {
        items: [
            {
                id: tag.id,
                label: tag.name || `Tag ${tag.id}`,
            },
        ],
        excluded: [],
        depth: 0,
    };
    filter.criteria.push(criterion);
    return `/tags?${filter.makeQueryParameters()}`;
};
const makeChildTagsUrl = (tag) => {
    if (!tag.id)
        return "#";
    const filter = new filter_1.ListFilterModel(GQL.FilterMode.Tags, undefined);
    const criterion = new tags_1.TagsCriterion(tags_1.ParentTagsCriterionOption);
    criterion.value = {
        items: [
            {
                id: tag.id,
                label: tag.name || `Tag ${tag.id}`,
            },
        ],
        excluded: [],
        depth: 0,
    };
    filter.criteria.push(criterion);
    return `/tags?${filter.makeQueryParameters()}`;
};
function makeTagFilter(mode, tag) {
    const filter = new filter_1.ListFilterModel(mode, undefined);
    const criterion = new tags_1.TagsCriterion(tags_1.TagsCriterionOption);
    criterion.value = {
        items: [{ id: tag.id, label: tag.name || `Tag ${tag.id}` }],
        excluded: [],
        depth: 0,
    };
    filter.criteria.push(criterion);
    return filter.makeQueryParameters();
}
const makeTagScenesUrl = (tag) => {
    return `/scenes?${makeTagFilter(GQL.FilterMode.Scenes, tag)}`;
};
const makeTagPerformersUrl = (tag) => {
    return `/performers?${makeTagFilter(GQL.FilterMode.Performers, tag)}`;
};
const makeTagStudiosUrl = (tag) => {
    return `/studios?${makeTagFilter(GQL.FilterMode.Studios, tag)}`;
};
const makeTagSceneMarkersUrl = (tag) => {
    return `/scenes/markers?${makeTagFilter(GQL.FilterMode.SceneMarkers, tag)}`;
};
const makeTagGalleriesUrl = (tag) => {
    return `/galleries?${makeTagFilter(GQL.FilterMode.Galleries, tag)}`;
};
const makeTagImagesUrl = (tag) => {
    return `/images?${makeTagFilter(GQL.FilterMode.Images, tag)}`;
};
const makeTagGroupsUrl = (tag) => {
    return `/groups?${makeTagFilter(GQL.FilterMode.Groups, tag)}`;
};
const makeSceneMarkerUrl = (sceneMarker) => {
    if (!sceneMarker.id || !sceneMarker.scene)
        return "#";
    return `/scenes/${sceneMarker.scene.id}?t=${sceneMarker.seconds}`;
};
const makeScenesPHashMatchUrl = (phash) => {
    if (!phash)
        return "#";
    const filter = new filter_1.ListFilterModel(GQL.FilterMode.Scenes, undefined);
    const criterion = new phash_1.PhashCriterion();
    criterion.value = { value: phash };
    filter.criteria.push(criterion);
    return `/scenes?${filter.makeQueryParameters()}`;
};
const makeImagesPHashMatchUrl = (phash) => {
    if (!phash)
        return "#";
    const filter = new filter_1.ListFilterModel(GQL.FilterMode.Images, undefined);
    const criterion = new phash_1.PhashCriterion();
    criterion.value = { value: phash };
    filter.criteria.push(criterion);
    return `/images?${filter.makeQueryParameters()}`;
};
const makeGalleryImagesUrl = (gallery, extraCriteria) => {
    if (!gallery.id)
        return "#";
    const filter = new filter_1.ListFilterModel(GQL.FilterMode.Images, undefined);
    const criterion = new galleries_1.GalleriesCriterion();
    criterion.value = [{ id: gallery.id, label: (0, galleries_2.galleryTitle)(gallery) }];
    filter.criteria.push(criterion);
    addExtraCriteria(filter.criteria, extraCriteria);
    return `/images?${filter.makeQueryParameters()}`;
};
function stringEqualsCriterion(option, value) {
    const criterion = new criterion_1.StringCriterion(option);
    criterion.modifier = GQL.CriterionModifier.Equals;
    criterion.value = value;
    return criterion;
}
const makeDirectorScenesUrl = (director) => {
    if (director.length == 0)
        return "#";
    const filter = new filter_1.ListFilterModel(GQL.FilterMode.Scenes, undefined);
    filter.criteria.push(stringEqualsCriterion((0, criterion_1.createStringCriterionOption)("director"), director));
    return `/scenes?${filter.makeQueryParameters()}`;
};
const makeDirectorGroupsUrl = (director) => {
    if (director.length == 0)
        return "#";
    const filter = new filter_1.ListFilterModel(GQL.FilterMode.Groups, undefined);
    filter.criteria.push(stringEqualsCriterion((0, criterion_1.createStringCriterionOption)("director"), director));
    return `/groups?${filter.makeQueryParameters()}`;
};
const makePhotographerGalleriesUrl = (photographer) => {
    if (photographer.length == 0)
        return "#";
    const filter = new filter_1.ListFilterModel(GQL.FilterMode.Galleries, undefined);
    filter.criteria.push(stringEqualsCriterion((0, criterion_1.createStringCriterionOption)("photographer"), photographer));
    return `/galleries?${filter.makeQueryParameters()}`;
};
const makePhotographerImagesUrl = (photographer) => {
    if (photographer.length == 0)
        return "#";
    const filter = new filter_1.ListFilterModel(GQL.FilterMode.Images, undefined);
    filter.criteria.push(stringEqualsCriterion((0, criterion_1.createStringCriterionOption)("photographer"), photographer));
    return `/images?${filter.makeQueryParameters()}`;
};
const makeGroupUrl = (id) => {
    return `/groups/${id}`;
};
const makeContainingGroupsUrl = (group) => {
    if (!group.id)
        return "#";
    const filter = new filter_1.ListFilterModel(GQL.FilterMode.Groups, undefined);
    const criterion = new groups_1.GroupsCriterion(groups_1.SubGroupsCriterionOption);
    criterion.value = {
        items: [
            {
                id: group.id,
                label: group.name || `Group ${group.id}`,
            },
        ],
        excluded: [],
        depth: 0,
    };
    filter.criteria.push(criterion);
    return `/groups?${filter.makeQueryParameters()}`;
};
const makeSubGroupsUrl = (group) => {
    if (!group.id)
        return "#";
    const filter = new filter_1.ListFilterModel(GQL.FilterMode.Groups, undefined);
    const criterion = new groups_1.GroupsCriterion(groups_1.ContainingGroupsCriterionOption);
    criterion.value = {
        items: [
            {
                id: group.id,
                label: group.name || `Group ${group.id}`,
            },
        ],
        excluded: [],
        depth: 0,
    };
    filter.criteria.push(criterion);
    return `/groups?${filter.makeQueryParameters()}`;
};
const makeSceneMarkersSceneUrl = (scene) => {
    if (!scene.id)
        return "#";
    const filter = new filter_1.ListFilterModel(GQL.FilterMode.SceneMarkers, undefined);
    const criterion = new scenes_1.MarkersScenesCriterion();
    criterion.value = [{ id: scene.id, label: (0, files_1.objectTitle)(scene) }];
    filter.criteria.push(criterion);
    return `/scenes/markers?${filter.makeQueryParameters()}`;
};
function handleUnsavedChanges(intl, basepath, id) {
    return function (location) {
        // #2291 - don't prompt if we're navigating within the gallery being edited
        if (id !== undefined && location.pathname === `/${basepath}/${id}`) {
            return true;
        }
        return intl.formatMessage({ id: "dialogs.unsaved_changes" });
    };
}
const NavUtils = {
    makePerformerScenesUrl,
    makePerformerImagesUrl,
    makePerformerGalleriesUrl,
    makePerformerGroupsUrl,
    makePerformerSceneMarkersUrl,
    makePerformersCountryUrl,
    makeStudioScenesUrl,
    makeStudioImagesUrl,
    makeStudioGalleriesUrl,
    makeStudioGroupsUrl: makeStudioGroupsUrl,
    makeStudioPerformersUrl,
    makeTagUrl,
    makeGroupUrl,
    makeParentTagsUrl,
    makeChildTagsUrl,
    makeTagSceneMarkersUrl,
    makeTagScenesUrl,
    makeTagPerformersUrl,
    makeTagStudiosUrl,
    makeTagGalleriesUrl,
    makeTagImagesUrl,
    makeTagGroupsUrl,
    makeScenesPHashMatchUrl,
    makeSceneMarkerUrl,
    makeImagesPHashMatchUrl,
    makeGroupScenesUrl,
    makeChildStudiosUrl,
    makeGalleryImagesUrl,
    makeDirectorScenesUrl,
    makePhotographerGalleriesUrl,
    makePhotographerImagesUrl,
    makeDirectorGroupsUrl,
    makeContainingGroupsUrl,
    makeSubGroupsUrl,
    makeSceneMarkersSceneUrl,
};
exports.default = NavUtils;
//# sourceMappingURL=navigation.js.map