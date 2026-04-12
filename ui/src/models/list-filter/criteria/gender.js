import { CriterionModifier, } from "src/core/generated-graphql";
import { genderStrings, stringToGender } from "src/utils/gender";
import { ModifierCriterionOption, MultiStringCriterion, } from "./criterion";
export const GenderCriterionOption = new ModifierCriterionOption({
    messageID: "gender",
    type: "gender",
    options: genderStrings,
    modifierOptions: [
        CriterionModifier.Includes,
        CriterionModifier.Excludes,
        CriterionModifier.IsNull,
        CriterionModifier.NotNull,
    ],
    defaultModifier: CriterionModifier.Includes,
    makeCriterion: () => new GenderCriterion(),
});
export class GenderCriterion extends MultiStringCriterion {
    constructor(value = []) {
        super(GenderCriterionOption, value);
    }
    toCriterionInput() {
        const value = this.value.map((v) => stringToGender(v));
        return {
            value_list: value,
            modifier: this.modifier,
        };
    }
    setFromSavedCriterion(criterion) {
        // backwards compatibility - if the value is a string, convert it to an array
        if (typeof criterion.value === "string") {
            criterion = {
                ...criterion,
                value: [criterion.value],
            };
        }
        super.setFromSavedCriterion(criterion);
    }
}
//# sourceMappingURL=gender.js.map