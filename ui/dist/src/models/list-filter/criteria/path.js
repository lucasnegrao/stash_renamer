"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PathCriterion = exports.PathCriterionOption = void 0;
const generated_graphql_1 = require("src/core/generated-graphql");
const criterion_1 = require("./criterion");
exports.PathCriterionOption = new criterion_1.StringCriterionOption({
    messageID: "path",
    type: "path",
    defaultModifier: generated_graphql_1.CriterionModifier.Includes,
    makeCriterion: () => new PathCriterion(),
});
class PathCriterion extends criterion_1.StringCriterion {
    constructor() {
        super(exports.PathCriterionOption);
    }
}
exports.PathCriterion = PathCriterion;
//# sourceMappingURL=path.js.map