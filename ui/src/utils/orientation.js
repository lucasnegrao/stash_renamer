import { OrientationEnum } from "src/core/generated-graphql";
const stringOrientationMap = new Map([
    ["Landscape", OrientationEnum.Landscape],
    ["Portrait", OrientationEnum.Portrait],
    ["Square", OrientationEnum.Square],
]);
export const stringToOrientation = (value, caseInsensitive) => {
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
export const orientationStrings = Array.from(stringOrientationMap.keys());
//# sourceMappingURL=orientation.js.map