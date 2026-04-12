"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LegacyMoviesCriterionOption = exports.SubGroupsCriterionOption = exports.ContainingGroupsCriterionOption = exports.GroupsCriterion = exports.GroupsCriterionOption = void 0;
const generated_graphql_1 = require("src/core/generated-graphql");
const criterion_1 = require("./criterion");
const inputType = "groups";
const modifierOptions = [
    generated_graphql_1.CriterionModifier.Includes,
    generated_graphql_1.CriterionModifier.Excludes,
    generated_graphql_1.CriterionModifier.IsNull,
    generated_graphql_1.CriterionModifier.NotNull,
];
const defaultModifier = generated_graphql_1.CriterionModifier.Includes;
class BaseGroupsCriterionOption extends criterion_1.ModifierCriterionOption {
    constructor(messageID, type) {
        super({
            messageID,
            type,
            modifierOptions,
            defaultModifier,
            inputType,
            makeCriterion: () => new GroupsCriterion(this),
        });
    }
}
exports.GroupsCriterionOption = new BaseGroupsCriterionOption("groups", "groups");
class GroupsCriterion extends criterion_1.IHierarchicalLabeledIdCriterion {
}
exports.GroupsCriterion = GroupsCriterion;
exports.ContainingGroupsCriterionOption = new BaseGroupsCriterionOption("containing_groups", "containing_groups");
exports.SubGroupsCriterionOption = new BaseGroupsCriterionOption("sub_groups", "sub_groups");
// redirects to GroupsCriterion
exports.LegacyMoviesCriterionOption = new criterion_1.ModifierCriterionOption({
    messageID: "groups",
    type: "movies",
    modifierOptions,
    defaultModifier,
    inputType,
    hidden: true,
    makeCriterion: () => new GroupsCriterion(exports.GroupsCriterionOption),
});
//# sourceMappingURL=groups.js.map