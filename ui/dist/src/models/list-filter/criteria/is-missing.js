"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupIsMissingCriterionOption = exports.StudioIsMissingCriterionOption = exports.TagIsMissingCriterionOption = exports.GalleryIsMissingCriterionOption = exports.PerformerIsMissingCriterionOption = exports.ImageIsMissingCriterionOption = exports.SceneIsMissingCriterionOption = exports.IsMissingCriterion = void 0;
const generated_graphql_1 = require("src/core/generated-graphql");
const criterion_1 = require("./criterion");
class IsMissingCriterion extends criterion_1.StringCriterion {
    toCriterionInput() {
        return this.value;
    }
}
exports.IsMissingCriterion = IsMissingCriterion;
class IsMissingCriterionOption extends criterion_1.ModifierCriterionOption {
    constructor(messageID, type, options) {
        super({
            messageID,
            type,
            options,
            modifierOptions: [],
            defaultModifier: generated_graphql_1.CriterionModifier.Equals,
            makeCriterion: () => new IsMissingCriterion(this),
        });
    }
}
exports.SceneIsMissingCriterionOption = new IsMissingCriterionOption("isMissing", "is_missing", [
    "title",
    "code",
    "details",
    "director",
    "url",
    "date",
    "rating",
    "cover",
    "galleries",
    "studio",
    "group",
    "performers",
    "tags",
    "stash_id",
]);
exports.ImageIsMissingCriterionOption = new IsMissingCriterionOption("isMissing", "is_missing", [
    "title",
    "details",
    "photographer",
    "url",
    "date",
    "code",
    "rating",
    "galleries",
    "studio",
    "performers",
    "tags",
]);
exports.PerformerIsMissingCriterionOption = new IsMissingCriterionOption("isMissing", "is_missing", [
    "url",
    "ethnicity",
    "country",
    "hair_color",
    "eye_color",
    "height",
    "weight",
    "measurements",
    "fake_tits",
    "penis_length",
    "circumcised",
    "career_start",
    "career_end",
    "tattoos",
    "piercings",
    "aliases",
    "gender",
    "birthdate",
    "death_date",
    "disambiguation",
    "tags",
    "image",
    "details",
    "rating",
    "stash_id",
]);
exports.GalleryIsMissingCriterionOption = new IsMissingCriterionOption("isMissing", "is_missing", [
    "title",
    "code",
    "details",
    "photographer",
    "url",
    "date",
    "rating",
    "cover",
    "studio",
    "performers",
    "tags",
    "scenes",
]);
exports.TagIsMissingCriterionOption = new IsMissingCriterionOption("isMissing", "is_missing", ["image", "aliases", "description", "stash_id"]);
exports.StudioIsMissingCriterionOption = new IsMissingCriterionOption("isMissing", "is_missing", ["image", "stash_id", "details", "url", "aliases", "tags", "rating"]);
exports.GroupIsMissingCriterionOption = new IsMissingCriterionOption("isMissing", "is_missing", [
    "aliases",
    "description",
    "director",
    "date",
    "url",
    "rating",
    "studio",
    "performers",
    "tags",
    "front_image",
    "back_image",
    "scenes",
]);
//# sourceMappingURL=is-missing.js.map