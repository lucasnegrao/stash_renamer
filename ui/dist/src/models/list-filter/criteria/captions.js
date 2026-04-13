"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CaptionCriterion = exports.CaptionsCriterionOption = void 0;
const generated_graphql_1 = require("src/core/generated-graphql");
const caption_1 = require("src/utils/caption");
const criterion_1 = require("./criterion");
const languageStrings = Array.from(caption_1.languageMap.values());
exports.CaptionsCriterionOption = new criterion_1.ModifierCriterionOption({
    messageID: "captions",
    type: "captions",
    modifierOptions: [
        generated_graphql_1.CriterionModifier.Includes,
        generated_graphql_1.CriterionModifier.Excludes,
        generated_graphql_1.CriterionModifier.IsNull,
        generated_graphql_1.CriterionModifier.NotNull,
    ],
    defaultModifier: generated_graphql_1.CriterionModifier.Includes,
    options: languageStrings,
    makeCriterion: () => new CaptionCriterion(),
});
class CaptionCriterion extends criterion_1.StringCriterion {
    constructor() {
        super(exports.CaptionsCriterionOption);
    }
    toCriterionInput() {
        var _a;
        const value = (_a = (0, caption_1.valueToCode)(this.value)) !== null && _a !== void 0 ? _a : "";
        return {
            value,
            modifier: this.modifier,
        };
    }
}
exports.CaptionCriterion = CaptionCriterion;
//# sourceMappingURL=captions.js.map