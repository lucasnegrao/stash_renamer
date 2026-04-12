"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GalleriesCriterion = exports.GalleriesCriterionOption = void 0;
const criterion_1 = require("./criterion");
const inputType = "galleries";
exports.GalleriesCriterionOption = new criterion_1.ILabeledIdCriterionOption("galleries", "galleries", true, inputType, () => new GalleriesCriterion());
class GalleriesCriterion extends criterion_1.ILabeledIdCriterion {
    constructor() {
        super(exports.GalleriesCriterionOption);
    }
}
exports.GalleriesCriterion = GalleriesCriterion;
//# sourceMappingURL=galleries.js.map