"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CountryCriterion = exports.CountryCriterionOption = void 0;
const generated_graphql_1 = require("src/core/generated-graphql");
const criterion_1 = require("./criterion");
exports.CountryCriterionOption = new criterion_1.StringCriterionOption({
    messageID: "country",
    type: "country",
    makeCriterion: () => new CountryCriterion(),
});
class CountryCriterion extends criterion_1.StringCriterion {
    constructor() {
        super(exports.CountryCriterionOption);
    }
    getLabelValue(intl) {
        if (this.modifier === generated_graphql_1.CriterionModifier.Equals ||
            this.modifier === generated_graphql_1.CriterionModifier.NotEquals) {
            return this.value;
        }
        return super.getLabelValue(intl);
    }
}
exports.CountryCriterion = CountryCriterion;
//# sourceMappingURL=country.js.map