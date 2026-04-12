"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrganizedCriterion = exports.OrganizedCriterionOption = void 0;
const criterion_1 = require("./criterion");
exports.OrganizedCriterionOption = new criterion_1.BooleanCriterionOption("organized", "organized", () => new OrganizedCriterion());
class OrganizedCriterion extends criterion_1.BooleanCriterion {
    constructor() {
        super(exports.OrganizedCriterionOption);
    }
}
exports.OrganizedCriterion = OrganizedCriterion;
//# sourceMappingURL=organized.js.map