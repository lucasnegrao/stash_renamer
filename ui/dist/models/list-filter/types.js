"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.criterionIsTimestampValue = exports.criterionIsDateValue = exports.criterionIsStashIDValue = exports.criterionIsNumberValue = exports.criterionIsHierarchicalLabelValue = exports.DisplayMode = void 0;
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
exports.criterionIsHierarchicalLabelValue = criterionIsHierarchicalLabelValue;
function criterionIsNumberValue(value) {
    return (typeof value === "object" &&
        !!value &&
        "value" in value &&
        "value2" in value);
}
exports.criterionIsNumberValue = criterionIsNumberValue;
function criterionIsStashIDValue(value) {
    return (typeof value === "object" &&
        !!value &&
        "endpoint" in value &&
        "stashID" in value);
}
exports.criterionIsStashIDValue = criterionIsStashIDValue;
function criterionIsDateValue(value) {
    return (typeof value === "object" &&
        !!value &&
        "value" in value &&
        "value2" in value);
}
exports.criterionIsDateValue = criterionIsDateValue;
function criterionIsTimestampValue(value) {
    return (typeof value === "object" &&
        !!value &&
        "value" in value &&
        "value2" in value);
}
exports.criterionIsTimestampValue = criterionIsTimestampValue;
//# sourceMappingURL=types.js.map