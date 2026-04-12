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
export default PercentUtils;
//# sourceMappingURL=percent.js.map