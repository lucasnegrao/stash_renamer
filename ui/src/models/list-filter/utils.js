import { CriterionModifier } from "src/core/generated-graphql";
export function filterByStashID(filter, stashID) {
    const stashCriterion = filter.makeCriterion("stash_id_endpoint");
    stashCriterion.modifier = CriterionModifier.Equals;
    stashCriterion.value = { endpoint: "", stashID: stashID.trim() };
    filter.criteria = [stashCriterion];
}
//# sourceMappingURL=utils.js.map