"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HasMarkersCriterion = exports.HasMarkersCriterionOption = void 0;
const criterion_1 = require("./criterion");
exports.HasMarkersCriterionOption = new criterion_1.StringBooleanCriterionOption("hasMarkers", "has_markers", () => new HasMarkersCriterion());
class HasMarkersCriterion extends criterion_1.StringBooleanCriterion {
    constructor() {
        super(exports.HasMarkersCriterionOption);
    }
}
exports.HasMarkersCriterion = HasMarkersCriterion;
//# sourceMappingURL=has-markers.js.map