"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CircumcisedCriterion = exports.CircumcisedCriterionOption = void 0;
const generated_graphql_1 = require("src/core/generated-graphql");
const circumcised_1 = require("src/utils/circumcised");
const criterion_1 = require("./criterion");
exports.CircumcisedCriterionOption = new criterion_1.ModifierCriterionOption({
    messageID: "circumcised",
    type: "circumcised",
    modifierOptions: [
        generated_graphql_1.CriterionModifier.Includes,
        generated_graphql_1.CriterionModifier.Excludes,
        generated_graphql_1.CriterionModifier.IsNull,
        generated_graphql_1.CriterionModifier.NotNull,
    ],
    defaultModifier: generated_graphql_1.CriterionModifier.Includes,
    options: circumcised_1.circumcisedStrings,
    makeCriterion: () => new CircumcisedCriterion(),
});
class CircumcisedCriterion extends criterion_1.MultiStringCriterion {
    constructor() {
        super(exports.CircumcisedCriterionOption);
    }
    toCriterionInput() {
        const value = this.value.map((v) => (0, circumcised_1.stringToCircumcised)(v));
        return {
            value,
            modifier: this.modifier,
        };
    }
}
exports.CircumcisedCriterion = CircumcisedCriterion;
//# sourceMappingURL=circumcised.js.map