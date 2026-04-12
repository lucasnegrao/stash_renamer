"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InteractiveCriterion = exports.InteractiveCriterionOption = void 0;
const criterion_1 = require("./criterion");
exports.InteractiveCriterionOption = new criterion_1.BooleanCriterionOption("interactive", "interactive", () => new InteractiveCriterion());
class InteractiveCriterion extends criterion_1.BooleanCriterion {
    constructor() {
        super(exports.InteractiveCriterionOption);
    }
}
exports.InteractiveCriterion = InteractiveCriterion;
//# sourceMappingURL=interactive.js.map