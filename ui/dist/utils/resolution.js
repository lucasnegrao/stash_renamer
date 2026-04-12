"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolutionStrings = exports.stringToResolution = void 0;
const generated_graphql_1 = require("src/core/generated-graphql");
const stringResolutionMap = new Map([
    ["144p", generated_graphql_1.ResolutionEnum.VeryLow],
    ["240p", generated_graphql_1.ResolutionEnum.Low],
    ["360p", generated_graphql_1.ResolutionEnum.R360P],
    ["480p", generated_graphql_1.ResolutionEnum.Standard],
    ["540p", generated_graphql_1.ResolutionEnum.WebHd],
    ["720p", generated_graphql_1.ResolutionEnum.StandardHd],
    ["1080p", generated_graphql_1.ResolutionEnum.FullHd],
    ["1440p", generated_graphql_1.ResolutionEnum.QuadHd],
    // ["1920p", ResolutionEnum.VrHd],
    ["4k", generated_graphql_1.ResolutionEnum.FourK],
    ["5k", generated_graphql_1.ResolutionEnum.FiveK],
    ["6k", generated_graphql_1.ResolutionEnum.SixK],
    ["7k", generated_graphql_1.ResolutionEnum.SevenK],
    ["8k", generated_graphql_1.ResolutionEnum.EightK],
    ["Huge", generated_graphql_1.ResolutionEnum.Huge],
]);
const stringToResolution = (value, caseInsensitive) => {
    if (!value) {
        return undefined;
    }
    const ret = stringResolutionMap.get(value);
    if (ret || !caseInsensitive) {
        return ret;
    }
    const asUpper = value.toUpperCase();
    const foundEntry = Array.from(stringResolutionMap.entries()).find((e) => {
        return e[0].toUpperCase() === asUpper;
    });
    if (foundEntry) {
        return foundEntry[1];
    }
};
exports.stringToResolution = stringToResolution;
exports.resolutionStrings = Array.from(stringResolutionMap.keys());
//# sourceMappingURL=resolution.js.map