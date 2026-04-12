// NOTE: add new enum values to the end, to ensure existing data
// is not impacted
export var DisplayMode;
(function (DisplayMode) {
    DisplayMode[DisplayMode["Grid"] = 0] = "Grid";
    DisplayMode[DisplayMode["List"] = 1] = "List";
    DisplayMode[DisplayMode["Wall"] = 2] = "Wall";
    DisplayMode[DisplayMode["Tagger"] = 3] = "Tagger";
})(DisplayMode || (DisplayMode = {}));
export function criterionIsHierarchicalLabelValue(value) {
    return (typeof value === "object" && !!value && "items" in value && "depth" in value);
}
export function criterionIsNumberValue(value) {
    return (typeof value === "object" &&
        !!value &&
        "value" in value &&
        "value2" in value);
}
export function criterionIsStashIDValue(value) {
    return (typeof value === "object" &&
        !!value &&
        "endpoint" in value &&
        "stashID" in value);
}
export function criterionIsDateValue(value) {
    return (typeof value === "object" &&
        !!value &&
        "value" in value &&
        "value2" in value);
}
export function criterionIsTimestampValue(value) {
    return (typeof value === "object" &&
        !!value &&
        "value" in value &&
        "value2" in value);
}
//# sourceMappingURL=types.js.map