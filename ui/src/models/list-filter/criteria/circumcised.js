import { CriterionModifier, } from "src/core/generated-graphql";
import { circumcisedStrings, stringToCircumcised } from "src/utils/circumcised";
import { ModifierCriterionOption, MultiStringCriterion } from "./criterion";
export const CircumcisedCriterionOption = new ModifierCriterionOption({
    messageID: "circumcised",
    type: "circumcised",
    modifierOptions: [
        CriterionModifier.Includes,
        CriterionModifier.Excludes,
        CriterionModifier.IsNull,
        CriterionModifier.NotNull,
    ],
    defaultModifier: CriterionModifier.Includes,
    options: circumcisedStrings,
    makeCriterion: () => new CircumcisedCriterion(),
});
export class CircumcisedCriterion extends MultiStringCriterion {
    constructor() {
        super(CircumcisedCriterionOption);
    }
    toCriterionInput() {
        const value = this.value.map((v) => stringToCircumcised(v));
        return {
            value,
            modifier: this.modifier,
        };
    }
}
//# sourceMappingURL=circumcised.js.map