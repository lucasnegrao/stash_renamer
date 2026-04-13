"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterByStashID = filterByStashID;
const generated_graphql_1 = require("src/core/generated-graphql");
function filterByStashID(filter, stashID) {
    const stashCriterion = filter.makeCriterion("stash_id_endpoint");
    stashCriterion.modifier = generated_graphql_1.CriterionModifier.Equals;
    stashCriterion.value = { endpoint: "", stashID: stashID.trim() };
    filter.criteria = [stashCriterion];
}
//# sourceMappingURL=utils.js.map