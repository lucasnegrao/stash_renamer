import { CriterionModifier } from "src/core/generated-graphql";
import { languageMap, valueToCode } from "src/utils/caption";
import { ModifierCriterionOption, StringCriterion } from "./criterion";
const languageStrings = Array.from(languageMap.values());
export const CaptionsCriterionOption = new ModifierCriterionOption({
    messageID: "captions",
    type: "captions",
    modifierOptions: [
        CriterionModifier.Includes,
        CriterionModifier.Excludes,
        CriterionModifier.IsNull,
        CriterionModifier.NotNull,
    ],
    defaultModifier: CriterionModifier.Includes,
    options: languageStrings,
    makeCriterion: () => new CaptionCriterion(),
});
export class CaptionCriterion extends StringCriterion {
    constructor() {
        super(CaptionsCriterionOption);
    }
    toCriterionInput() {
        var _a;
        const value = (_a = valueToCode(this.value)) !== null && _a !== void 0 ? _a : "";
        return {
            value,
            modifier: this.modifier,
        };
    }
}
//# sourceMappingURL=captions.js.map