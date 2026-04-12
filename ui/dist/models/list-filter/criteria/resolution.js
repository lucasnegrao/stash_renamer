"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AverageResolutionCriterion = exports.AverageResolutionCriterionOption = exports.ResolutionCriterion = exports.ResolutionCriterionOption = void 0;
const generated_graphql_1 = require("src/core/generated-graphql");
const resolution_1 = require("src/utils/resolution");
const criterion_1 = require("./criterion");
class BaseResolutionCriterionOption extends criterion_1.ModifierCriterionOption {
    constructor(value, makeCriterion) {
        super({
            messageID: value,
            type: value,
            modifierOptions: [
                generated_graphql_1.CriterionModifier.Equals,
                generated_graphql_1.CriterionModifier.NotEquals,
                generated_graphql_1.CriterionModifier.GreaterThan,
                generated_graphql_1.CriterionModifier.LessThan,
            ],
            options: resolution_1.resolutionStrings,
            makeCriterion,
        });
    }
}
class BaseResolutionCriterion extends criterion_1.StringCriterion {
    toCriterionInput() {
        const value = (0, resolution_1.stringToResolution)(this.value);
        if (value !== undefined) {
            return {
                value,
                modifier: this.modifier,
            };
        }
    }
}
exports.ResolutionCriterionOption = new BaseResolutionCriterionOption("resolution", () => new ResolutionCriterion());
class ResolutionCriterion extends BaseResolutionCriterion {
    constructor() {
        super(exports.ResolutionCriterionOption);
    }
}
exports.ResolutionCriterion = ResolutionCriterion;
exports.AverageResolutionCriterionOption = new BaseResolutionCriterionOption("average_resolution", () => new AverageResolutionCriterion());
class AverageResolutionCriterion extends BaseResolutionCriterion {
    constructor() {
        super(exports.AverageResolutionCriterionOption);
    }
}
exports.AverageResolutionCriterion = AverageResolutionCriterion;
//# sourceMappingURL=resolution.js.map