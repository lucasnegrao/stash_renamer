"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterData = void 0;
exports.withoutTypename = withoutTypename;
exports.excludeFields = excludeFields;
exports.sortStoredIdObjects = sortStoredIdObjects;
exports.uniqIDStoredIDs = uniqIDStoredIDs;
const filterData = (data) => data ? data.filter((item) => item) : [];
exports.filterData = filterData;
const hasTypename = (value) => !!(value === null || value === void 0 ? void 0 : value.__typename);
const processNoneObjValue = (value) => Array.isArray(value)
    ? value.map((v) => hasTypename(v) ? withoutTypename(v) : processNoneObjValue(v))
    : value;
function withoutTypename(o) {
    const { __typename, ...data } = o;
    return Object.entries(data).reduce((ret, [key, value]) => ({
        ...ret,
        [key]: hasTypename(value)
            ? withoutTypename(value)
            : processNoneObjValue(value),
    }), {});
}
// excludeFields removes fields from data that are in the excluded object
function excludeFields(data, excluded) {
    Object.keys(data).forEach((k) => {
        if (excluded[k] || !data[k]) {
            data[k] = undefined;
        }
    });
}
function sortStoredIdObjects(scrapedObjects) {
    if (!scrapedObjects) {
        return undefined;
    }
    const ret = scrapedObjects.filter((p) => !!p.stored_id);
    if (ret.length === 0) {
        return undefined;
    }
    // sort by id numerically
    ret.sort((a, b) => {
        return parseInt(a.stored_id, 10) - parseInt(b.stored_id, 10);
    });
    return ret;
}
function uniqIDStoredIDs(objs) {
    return objs.filter((o, i) => {
        return objs.findIndex((oo) => oo.stored_id === o.stored_id) === i;
    });
}
//# sourceMappingURL=data.js.map