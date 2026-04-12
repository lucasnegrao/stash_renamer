"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SceneQueue = void 0;
const generated_graphql_1 = require("src/core/generated-graphql");
const filter_1 = require("./list-filter/filter");
class SceneQueue {
    constructor() {
        Object.defineProperty(this, "query", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "sceneIDs", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "originalQueryPage", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "originalQueryPageSize", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
    }
    static fromListFilterModel(filter) {
        const ret = new SceneQueue();
        const filterCopy = filter.clone();
        filterCopy.itemsPerPage = 40;
        ret.originalQueryPage = filter.currentPage;
        ret.originalQueryPageSize = filter.itemsPerPage;
        ret.query = filterCopy;
        return ret;
    }
    static fromSceneIDList(sceneIDs) {
        const ret = new SceneQueue();
        ret.sceneIDs = sceneIDs.map((v) => Number(v));
        return ret;
    }
    makeQueryParameters(sceneIndex, page) {
        var _a, _b;
        const ret = [];
        if (this.query) {
            const queryParams = this.query.getEncodedParams();
            if (queryParams.sortby) {
                ret.push(`qsort=${queryParams.sortby}`);
            }
            if (queryParams.sortdir) {
                ret.push(`qsortd=${queryParams.sortdir}`);
            }
            if (queryParams.q) {
                ret.push(`qfq=${queryParams.q}`);
            }
            for (const c of (_a = queryParams.c) !== null && _a !== void 0 ? _a : []) {
                ret.push(`qfc=${c}`);
            }
            let qfp = (_b = queryParams.p) !== null && _b !== void 0 ? _b : "1";
            if (page !== undefined) {
                qfp = String(page);
            }
            else if (sceneIndex !== undefined &&
                this.originalQueryPage !== undefined &&
                this.originalQueryPageSize !== undefined) {
                // adjust page to be correct for the index
                const filterIndex = sceneIndex +
                    (this.originalQueryPage - 1) * this.originalQueryPageSize;
                const newPage = Math.floor(filterIndex / this.query.itemsPerPage) + 1;
                qfp = String(newPage);
            }
            ret.push(`qfp=${qfp}`);
        }
        else if (this.sceneIDs && this.sceneIDs.length > 0) {
            for (const id of this.sceneIDs) {
                ret.push(`qs=${id}`);
            }
        }
        return ret.join("&");
    }
    static fromQueryParameters(params) {
        const ret = new SceneQueue();
        if (params.has("qfp")) {
            const translated = {
                sortby: params.get("qsort"),
                sortdir: params.get("qsortd"),
                q: params.get("qfq"),
                p: params.get("qfp"),
                c: params.getAll("qfc"),
            };
            const decoded = filter_1.ListFilterModel.decodeParams(translated);
            const query = new filter_1.ListFilterModel(generated_graphql_1.FilterMode.Scenes);
            query.configureFromDecodedParams(decoded);
            ret.query = query;
        }
        else if (params.has("qs")) {
            // must be scene list
            ret.sceneIDs = params.getAll("qs").map((v) => Number(v));
        }
        return ret;
    }
    makeLink(sceneID, options) {
        let params = [
            this.makeQueryParameters(options.sceneIndex, options.newPage),
        ];
        if (options.autoPlay) {
            params.push("autoplay=true");
        }
        if (options.continue !== undefined) {
            params.push("continue=" + options.continue);
        }
        if (options.start !== undefined) {
            params.push("t=" + options.start);
        }
        return `/scenes/${sceneID}${params.length ? "?" + params.join("&") : ""}`;
    }
}
exports.SceneQueue = SceneQueue;
exports.default = SceneQueue;
//# sourceMappingURL=SceneQueue.js.map