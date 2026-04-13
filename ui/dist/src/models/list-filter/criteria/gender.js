"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenderCriterion = exports.GenderCriterionOption = void 0;
const generated_graphql_1 = require("src/core/generated-graphql");
const gender_1 = require("src/utils/gender");
const criterion_1 = require("./criterion");
exports.GenderCriterionOption = new criterion_1.ModifierCriterionOption({
    messageID: "gender",
    type: "gender",
    options: gender_1.genderStrings,
    modifierOptions: [
        generated_graphql_1.CriterionModifier.Includes,
        generated_graphql_1.CriterionModifier.Excludes,
        generated_graphql_1.CriterionModifier.IsNull,
        generated_graphql_1.CriterionModifier.NotNull,
    ],
    defaultModifier: generated_graphql_1.CriterionModifier.Includes,
    makeCriterion: () => new GenderCriterion(),
});
class GenderCriterion extends criterion_1.MultiStringCriterion {
    constructor(value = []) {
        super(exports.GenderCriterionOption, value);
    }
    toCriterionInput() {
        const value = this.value.map((v) => (0, gender_1.stringToGender)(v));
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
exports.GenderCriterion = GenderCriterion;
//# sourceMappingURL=gender.js.map