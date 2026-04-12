"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const numberToString = (seconds) => {
    return seconds + "%";
};
const stringToNumber = (v) => {
    if (!v) {
        return 0;
    }
    const numStr = v.replace("%", "");
    return parseInt(numStr, 10);
};
const PercentUtils = {
    numberToString,
    stringToNumber,
};
exports.default = PercentUtils;
//# sourceMappingURL=percent.js.map