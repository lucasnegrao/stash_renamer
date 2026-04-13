"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orientationStrings = exports.stringToOrientation = void 0;
const generated_graphql_1 = require("src/core/generated-graphql");
const stringOrientationMap = new Map([
    ["Landscape", generated_graphql_1.OrientationEnum.Landscape],
    ["Portrait", generated_graphql_1.OrientationEnum.Portrait],
    ["Square", generated_graphql_1.OrientationEnum.Square],
]);
const stringToOrientation = (value, caseInsensitive) => {
    if (!value) {
        return undefined;
    }
    const ret = stringOrientationMap.get(value);
    if (ret || !caseInsensitive) {
        return ret;
    }
    const asUpper = value.toUpperCase();
    const foundEntry = Array.from(stringOrientationMap.entries()).find((e) => {
        return e[0].toUpperCase() === asUpper;
    });
    if (foundEntry) {
        return foundEntry[1];
    }
};
exports.stringToOrientation = stringToOrientation;
exports.orientationStrings = Array.from(stringOrientationMap.keys());
//# sourceMappingURL=orientation.js.map