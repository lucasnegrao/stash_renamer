export const filterData = (data) => data ? data.filter((item) => item) : [];
const hasTypename = (value) => !!(value === null || value === void 0 ? void 0 : value.__typename);
const processNoneObjValue = (value) => Array.isArray(value)
    ? value.map((v) => hasTypename(v) ? withoutTypename(v) : processNoneObjValue(v))
    : value;
export function withoutTypename(o) {
    const { __typename, ...data } = o;
    return Object.entries(data).reduce((ret, [key, value]) => ({
        ...ret,
        [key]: hasTypename(value)
            ? withoutTypename(value)
            : processNoneObjValue(value),
    }), {});
}
// excludeFields removes fields from data that are in the excluded object
export function excludeFields(data, excluded) {
    Object.keys(data).forEach((k) => {
        if (excluded[k] || !data[k]) {
            data[k] = undefined;
        }
    });
}
export function sortStoredIdObjects(scrapedObjects) {
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
export function uniqIDStoredIDs(objs) {
    return objs.filter((o, i) => {
        return objs.findIndex((oo) => oo.stored_id === o.stored_id) === i;
    });
}
//# sourceMappingURL=data.js.map