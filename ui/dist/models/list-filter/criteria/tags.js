"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TagsCriterion = exports.ChildTagsCriterionOption = exports.ParentTagsCriterionOption = exports.PerformerTagsCriterionOption = exports.SceneTagsCriterionOption = exports.TagsCriterionOption = void 0;
const generated_graphql_1 = require("src/core/generated-graphql");
const criterion_1 = require("./criterion");
const defaultModifierOptions = [
    generated_graphql_1.CriterionModifier.IncludesAll,
    generated_graphql_1.CriterionModifier.Includes,
    generated_graphql_1.CriterionModifier.Equals,
    generated_graphql_1.CriterionModifier.IsNull,
    generated_graphql_1.CriterionModifier.NotNull,
];
const withoutEqualsModifierOptions = [
    generated_graphql_1.CriterionModifier.IncludesAll,
    generated_graphql_1.CriterionModifier.Includes,
    generated_graphql_1.CriterionModifier.IsNull,
    generated_graphql_1.CriterionModifier.NotNull,
];
const defaultModifier = generated_graphql_1.CriterionModifier.IncludesAll;
const inputType = "tags";
class BaseTagsCriterionOption extends criterion_1.ModifierCriterionOption {
    constructor(messageID, type, modifierOptions) {
        super({
            messageID,
            type,
            modifierOptions,
            defaultModifier,
            inputType,
            makeCriterion: () => new TagsCriterion(this),
        });
    }
}
exports.TagsCriterionOption = new BaseTagsCriterionOption("tags", "tags", defaultModifierOptions);
exports.SceneTagsCriterionOption = new BaseTagsCriterionOption("scene_tags", "scene_tags", defaultModifierOptions);
exports.PerformerTagsCriterionOption = new BaseTagsCriterionOption("performer_tags", "performer_tags", withoutEqualsModifierOptions);
// TODO - this requires using a nested studios_filter which needs to be added separately
// export const StudioTagsCriterionOption = new BaseTagsCriterionOption(
//   "studio_tags",
//   "studio_tags",
//   withoutEqualsModifierOptions
// );
exports.ParentTagsCriterionOption = new BaseTagsCriterionOption("parent_tags", "parents", withoutEqualsModifierOptions);
exports.ChildTagsCriterionOption = new BaseTagsCriterionOption("sub_tags", "children", withoutEqualsModifierOptions);
class TagsCriterion extends criterion_1.IHierarchicalLabeledIdCriterion {
}
exports.TagsCriterion = TagsCriterion;
//# sourceMappingURL=tags.js.map