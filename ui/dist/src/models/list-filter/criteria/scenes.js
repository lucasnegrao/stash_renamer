"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarkersScenesCriterion = exports.MarkersScenesCriterionOption = exports.ScenesCriterion = exports.ScenesCriterionOption = void 0;
const criterion_1 = require("./criterion");
const generated_graphql_1 = require("src/core/generated-graphql");
const inputType = "scenes";
exports.ScenesCriterionOption = new criterion_1.ILabeledIdCriterionOption("scenes", "scenes", true, inputType, () => new ScenesCriterion());
class ScenesCriterion extends criterion_1.ILabeledIdCriterion {
    constructor() {
        super(exports.ScenesCriterionOption);
    }
}
exports.ScenesCriterion = ScenesCriterion;
const modifierOptions = [
    generated_graphql_1.CriterionModifier.Includes,
    generated_graphql_1.CriterionModifier.Excludes,
];
const defaultModifier = generated_graphql_1.CriterionModifier.Includes;
exports.MarkersScenesCriterionOption = new criterion_1.ModifierCriterionOption({
    messageID: "scenes",
    type: "scenes",
    modifierOptions,
    defaultModifier,
    inputType,
    makeCriterion: () => new MarkersScenesCriterion(),
});
class MarkersScenesCriterion extends criterion_1.ILabeledIdCriterion {
    constructor() {
        super(exports.MarkersScenesCriterionOption);
    }
}
exports.MarkersScenesCriterion = MarkersScenesCriterion;
//# sourceMappingURL=scenes.js.map