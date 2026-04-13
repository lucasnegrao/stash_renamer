"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DisplayMode = void 0;
exports.criterionIsHierarchicalLabelValue = criterionIsHierarchicalLabelValue;
exports.criterionIsNumberValue = criterionIsNumberValue;
exports.criterionIsStashIDValue = criterionIsStashIDValue;
exports.criterionIsDateValue = criterionIsDateValue;
exports.criterionIsTimestampValue = criterionIsTimestampValue;
// NOTE: add new enum values to the end, to ensure existing data
// is not impacted
var DisplayMode;
(function (DisplayMode) {
    DisplayMode[DisplayMode["Grid"] = 0] = "Grid";
    DisplayMode[DisplayMode["List"] = 1] = "List";
    DisplayMode[DisplayMode["Wall"] = 2] = "Wall";
    DisplayMode[DisplayMode["Tagger"] = 3] = "Tagger";
})(DisplayMode || (exports.DisplayMode = DisplayMode = {}));
function criterionIsHierarchicalLabelValue(value) {
    return (typeof value === "object" && !!value && "items" in value && "depth" in value);
}
function criterionIsNumberValue(value) {
    return (typeof value === "object" &&
        !!value &&
        "value" in value &&
        "value2" in value);
}
function criterionIsStashIDValue(value) {
    return (typeof value === "object" &&
        !!value &&
        "endpoint" in value &&
        "stashID" in value);
}
function criterionIsDateValue(value) {
    return (typeof value === "object" &&
        !!value &&
        "value" in value &&
        "value2" in value);
}
function criterionIsTimestampValue(value) {
    return (typeof value === "object" &&
        !!value &&
        "value" in value &&
        "value2" in value);
}
//# sourceMappingURL=types.js.map