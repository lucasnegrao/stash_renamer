"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStashboxBase = void 0;
exports.stashboxDisplayName = stashboxDisplayName;
exports.mergeStashIDs = mergeStashIDs;
function stashboxDisplayName(name, index) {
    return name || `Stash-Box #${index + 1}`;
}
const getStashboxBase = (endpoint) => { var _a; return (_a = endpoint.match(/(https?:\/\/.*?\/)graphql/)) === null || _a === void 0 ? void 0 : _a[1]; };
exports.getStashboxBase = getStashboxBase;
// mergeStashIDs merges the src stash ID into the dest stash IDs.
// If the src stash ID is already in dest, the src stash ID overwrites the dest stash ID.
function mergeStashIDs(dest, src) {
    return dest
        .filter((i) => !src.find((j) => i.endpoint === j.endpoint))
        .concat(src);
}
//# sourceMappingURL=stashbox.js.map