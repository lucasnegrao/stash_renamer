"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParentStudiosCriterion = exports.ParentStudiosCriterionOption = exports.StudiosCriterion = exports.StudiosCriterionOption = void 0;
const generated_graphql_1 = require("src/core/generated-graphql");
const criterion_1 = require("./criterion");
const modifierOptions = [
    generated_graphql_1.CriterionModifier.Includes,
    generated_graphql_1.CriterionModifier.IsNull,
    generated_graphql_1.CriterionModifier.NotNull,
];
const defaultModifier = generated_graphql_1.CriterionModifier.Includes;
const inputType = "studios";
exports.StudiosCriterionOption = new criterion_1.ModifierCriterionOption({
    messageID: "studios",
    type: "studios",
    modifierOptions,
    defaultModifier,
    inputType,
    makeCriterion: () => new StudiosCriterion(),
});
class StudiosCriterion extends criterion_1.IHierarchicalLabeledIdCriterion {
    constructor() {
        super(exports.StudiosCriterionOption);
    }
}
exports.StudiosCriterion = StudiosCriterion;
exports.ParentStudiosCriterionOption = new criterion_1.ILabeledIdCriterionOption("parent_studios", "parents", false, inputType, () => new ParentStudiosCriterion());
class ParentStudiosCriterion extends criterion_1.ILabeledIdCriterion {
    constructor() {
        super(exports.ParentStudiosCriterionOption);
    }
}
exports.ParentStudiosCriterion = ParentStudiosCriterion;
//# sourceMappingURL=studios.js.map