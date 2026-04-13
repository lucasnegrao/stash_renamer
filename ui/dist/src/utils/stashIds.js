"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addUpdateStashID = exports.separateNamesAndStashIds = exports.getStashIDs = void 0;
exports.isUUID = isUUID;
const getStashIDs = (ids) => (ids !== null && ids !== void 0 ? ids : []).map(({ stash_id, endpoint, updated_at }) => ({
    stash_id,
    endpoint,
    updated_at,
}));
exports.getStashIDs = getStashIDs;
// UUID regex pattern to detect StashIDs (supports v4 and v7)
const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[47][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
function isUUID(input) {
    return UUID_PATTERN.test(input.trim());
}
/**
 * Separates a list of inputs into names and StashIDs based on UUID pattern matching
 * @param inputs - Array of strings that could be either names or StashIDs
 * @returns Object containing separate arrays for names and stashIds
 */
const separateNamesAndStashIds = (inputs) => {
    const names = [];
    const stashIds = [];
    inputs.forEach((input) => {
        if (isUUID(input)) {
            stashIds.push(input);
        }
        else {
            names.push(input);
        }
    });
    return { names, stashIds };
};
exports.separateNamesAndStashIds = separateNamesAndStashIds;
/**
 * Utility to add or update a StashID in an array.
 * If a StashID with the same endpoint exists, it will be replaced.
 * Otherwise, the new StashID will be appended.
 */
const addUpdateStashID = (existingStashIDs, newItem, allowMultiple = false) => {
    const existingIndex = existingStashIDs.findIndex((s) => s.endpoint === newItem.endpoint);
    if (!allowMultiple && existingIndex >= 0) {
        const newStashIDs = [...existingStashIDs];
        newStashIDs[existingIndex] = newItem;
        return newStashIDs;
    }
    // ensure we don't add duplicates if allowMultiple is true
    if (allowMultiple &&
        existingStashIDs.some((s) => s.endpoint === newItem.endpoint && s.stash_id === newItem.stash_id)) {
        return existingStashIDs;
    }
    return [...existingStashIDs, newItem];
};
exports.addUpdateStashID = addUpdateStashID;
//# sourceMappingURL=stashIds.js.map