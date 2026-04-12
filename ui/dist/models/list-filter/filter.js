"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListFilterModel = void 0;
const generated_graphql_1 = require("src/core/generated-graphql");
const criterion_1 = require("./criteria/criterion");
const factory_1 = require("./factory");
const types_1 = require("./types");
const custom_fields_1 = require("./criteria/custom-fields");
const DEFAULT_PARAMS = {
    sortDirection: generated_graphql_1.SortDirectionEnum.Asc,
    displayMode: types_1.DisplayMode.Grid,
    currentPage: 1,
    itemsPerPage: 40,
};
// TODO: handle customCriteria
class ListFilterModel {
    constructor(mode, config, options) {
        Object.defineProperty(this, "mode", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "options", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "config", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "searchTerm", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ""
        });
        Object.defineProperty(this, "currentPage", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: DEFAULT_PARAMS.currentPage
        });
        Object.defineProperty(this, "itemsPerPage", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: DEFAULT_PARAMS.itemsPerPage
        });
        Object.defineProperty(this, "sortDirection", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: DEFAULT_PARAMS.sortDirection
        });
        Object.defineProperty(this, "sortBy", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "displayMode", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: DEFAULT_PARAMS.displayMode
        });
        Object.defineProperty(this, "zoomIndex", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 1
        });
        Object.defineProperty(this, "criteria", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: []
        });
        Object.defineProperty(this, "randomSeed", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: -1
        });
        Object.defineProperty(this, "defaultZoomIndex", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 1
        });
        this.mode = mode;
        this.config = config;
        this.options = (0, factory_1.getFilterOptions)(mode);
        const { defaultSortBy, displayModeOptions } = this.options;
        if (options === null || options === void 0 ? void 0 : options.defaultSortBy) {
            this.sortBy = options.defaultSortBy;
            if (options.defaultSortDir) {
                this.sortDirection = options.defaultSortDir;
            }
        }
        else {
            this.sortBy = defaultSortBy;
            if (this.sortBy === "date") {
                this.sortDirection = generated_graphql_1.SortDirectionEnum.Desc;
            }
        }
        this.displayMode = displayModeOptions[0];
        if ((options === null || options === void 0 ? void 0 : options.defaultZoomIndex) !== undefined) {
            this.defaultZoomIndex = options.defaultZoomIndex;
            this.zoomIndex = options.defaultZoomIndex;
        }
    }
    clone() {
        const ret = Object.assign(new ListFilterModel(this.mode, this.config), this);
        ret.criteria = this.criteria.map((c) => c.clone());
        return ret;
    }
    empty() {
        return new ListFilterModel(this.mode, this.config, {
            defaultZoomIndex: this.defaultZoomIndex,
        });
    }
    // returns a clone of the filter for metadata fetching
    // this removes the sort, page size and page number and zoom index
    metadataInfo() {
        const clone = this.clone();
        clone.sortBy = undefined;
        clone.randomSeed = -1;
        clone.currentPage = 1;
        clone.sortDirection = DEFAULT_PARAMS.sortDirection;
        clone.itemsPerPage = 0;
        clone.zoomIndex = 1;
        clone.displayMode = DEFAULT_PARAMS.displayMode;
        return clone;
    }
    // returns the number of filters applied
    count() {
        // don't include search term
        return this.criteria.length;
    }
    configureFromDecodedParams(params) {
        var _a;
        if (params.perPage !== undefined) {
            this.itemsPerPage = params.perPage;
        }
        if (params.sortby !== undefined) {
            this.sortBy = params.sortby;
            // parse the random seed if provided
            const match = this.sortBy.match(/^random_(\d+)$/);
            if (match) {
                this.sortBy = "random";
                this.randomSeed = Number.parseInt(match[1], 10);
            }
        }
        if (params.sortdir !== undefined) {
            this.sortDirection =
                params.sortdir === "desc"
                    ? generated_graphql_1.SortDirectionEnum.Desc
                    : generated_graphql_1.SortDirectionEnum.Asc;
        }
        else {
            // #3193 - sortdir undefined means asc
            // #3559 - unless sortby is date, then desc
            this.sortDirection =
                params.sortby === "date"
                    ? generated_graphql_1.SortDirectionEnum.Desc
                    : generated_graphql_1.SortDirectionEnum.Asc;
        }
        if (params.disp !== undefined) {
            this.displayMode = params.disp;
        }
        if (params.q !== undefined) {
            this.searchTerm = params.q;
        }
        this.currentPage = (_a = params.p) !== null && _a !== void 0 ? _a : 1;
        if (params.z !== undefined) {
            this.zoomIndex = params.z;
        }
        this.criteria = [];
        if (params.c !== undefined) {
            for (const jsonString of params.c) {
                try {
                    const { type: criterionType, ...savedCriterion } = JSON.parse(jsonString);
                    const criterion = this.makeCriterion(criterionType);
                    criterion.fromDecodedParams(savedCriterion);
                    this.criteria.push(criterion);
                }
                catch (err) {
                    // eslint-disable-next-line no-console
                    console.error("Failed to parse encoded criterion:", err);
                }
            }
        }
    }
    // Does not decode any URL-encoding, only type conversions
    static decodeParams(params) {
        const ret = {};
        if (params.perPage) {
            ret.perPage = Number.parseInt(params.perPage, 10);
        }
        if (params.sortby) {
            ret.sortby = params.sortby;
        }
        if (params.sortdir) {
            ret.sortdir = params.sortdir;
        }
        if (params.disp) {
            ret.disp = Number.parseInt(params.disp, 10);
        }
        if (params.q) {
            ret.q = params.q;
        }
        if (params.p) {
            ret.p = Number.parseInt(params.p, 10);
        }
        if (params.z) {
            const zoomIndex = Number.parseInt(params.z, 10);
            if (zoomIndex >= 0) {
                ret.z = zoomIndex;
            }
        }
        if (params.c && params.c.length !== 0) {
            ret.c = params.c.map((jsonString) => ListFilterModel.translateJSON(jsonString, true));
        }
        return ret;
    }
    static translateJSON(jsonString, decoding) {
        let inString = false;
        let escape = false;
        return [...jsonString]
            .map((c) => {
            if (escape) {
                // this character has been escaped, skip
                escape = false;
                return c;
            }
            switch (c) {
                case "\\":
                    // escape the next character if in a string
                    if (inString) {
                        escape = true;
                    }
                    break;
                case '"':
                    // unescaped quote, toggle inString
                    inString = !inString;
                    break;
                case "(":
                    // decode only: restore ( to { if not in a string
                    if (decoding && !inString) {
                        return "{";
                    }
                    break;
                case ")":
                    // decode only: restore ) to } if not in a string
                    if (decoding && !inString) {
                        return "}";
                    }
                    break;
                case "{":
                    // encode only: replace { with ( if not in a string
                    if (!decoding && !inString) {
                        return "(";
                    }
                    break;
                case "}":
                    // encode only: replace } with ) if not in a string
                    if (!decoding && !inString) {
                        return ")";
                    }
                    break;
            }
            return c;
        })
            .join("");
    }
    configureFromQueryString(queryString) {
        const query = new URLSearchParams(queryString);
        const params = {
            perPage: query.get("perPage"),
            sortby: query.get("sortby"),
            sortdir: query.get("sortdir"),
            disp: query.get("disp"),
            q: query.get("q"),
            p: query.get("p"),
            z: query.get("z"),
            c: query.getAll("c"),
        };
        const decoded = ListFilterModel.decodeParams(params);
        this.configureFromDecodedParams(decoded);
    }
    configureFromSavedFilter(savedFilter) {
        var _a, _b, _c, _d, _e, _f, _g;
        const { find_filter: findFilter, object_filter: objectFilter, ui_options: uiOptions, } = savedFilter;
        this.itemsPerPage = (_a = findFilter === null || findFilter === void 0 ? void 0 : findFilter.per_page) !== null && _a !== void 0 ? _a : this.itemsPerPage;
        this.sortBy = (_b = findFilter === null || findFilter === void 0 ? void 0 : findFilter.sort) !== null && _b !== void 0 ? _b : this.sortBy;
        // parse the random seed if provided
        const match = (_c = this.sortBy) === null || _c === void 0 ? void 0 : _c.match(/^random_(\d+)$/);
        if (match) {
            this.sortBy = "random";
            this.randomSeed = Number.parseInt(match[1], 10);
        }
        this.sortDirection = (_d = findFilter === null || findFilter === void 0 ? void 0 : findFilter.direction) !== null && _d !== void 0 ? _d : this.sortDirection;
        this.searchTerm = (_e = findFilter === null || findFilter === void 0 ? void 0 : findFilter.q) !== null && _e !== void 0 ? _e : this.searchTerm;
        this.displayMode = (_f = uiOptions === null || uiOptions === void 0 ? void 0 : uiOptions.display_mode) !== null && _f !== void 0 ? _f : this.displayMode;
        this.zoomIndex = (_g = uiOptions === null || uiOptions === void 0 ? void 0 : uiOptions.zoom_index) !== null && _g !== void 0 ? _g : this.zoomIndex;
        this.currentPage = 1;
        this.criteria = [];
        if (objectFilter) {
            for (const [k, v] of Object.entries(objectFilter)) {
                const criterion = this.makeCriterion(k);
                criterion.setFromSavedCriterion(v);
                this.criteria.push(criterion);
            }
        }
    }
    setRandomSeed() {
        if (this.sortBy === "random") {
            // #321 - set the random seed if it is not set
            if (this.randomSeed === -1) {
                // generate 8-digit seed
                this.randomSeed = Math.floor(Math.random() * 10 ** 8);
            }
        }
        else {
            this.randomSeed = -1;
        }
    }
    getSortBy() {
        this.setRandomSeed();
        if (this.sortBy === "random") {
            return `random_${this.randomSeed.toString()}`;
        }
        return this.sortBy;
    }
    // Returns query parameters with necessary parts URL-encoded
    getEncodedParams() {
        const encodedCriteria = this.criteria.map((criterion) => {
            const queryParams = criterion.toQueryParams();
            let str = ListFilterModel.translateJSON(JSON.stringify(queryParams), false);
            // URL-encode other characters
            str = encodeURI(str);
            // only the reserved characters ?#&;=+ need to be URL-encoded
            // as they have special meaning in query strings
            // str = str.replaceAll("?", encodeURIComponent("?"));
            // str = str.replaceAll("#", encodeURIComponent("#"));
            // str = str.replaceAll("&", encodeURIComponent("&"));
            // str = str.replaceAll(";", encodeURIComponent(";"));
            // str = str.replaceAll("=", encodeURIComponent("="));
            // str = str.replaceAll("+", encodeURIComponent("+"));
            return str;
        });
        return {
            perPage: this.itemsPerPage !== DEFAULT_PARAMS.itemsPerPage
                ? String(this.itemsPerPage)
                : undefined,
            sortby: this.getSortBy(),
            sortdir: this.sortBy === "date"
                ? this.sortDirection === generated_graphql_1.SortDirectionEnum.Asc
                    ? "asc"
                    : undefined
                : this.sortDirection === generated_graphql_1.SortDirectionEnum.Desc
                    ? "desc"
                    : undefined,
            disp: this.displayMode !== DEFAULT_PARAMS.displayMode
                ? String(this.displayMode)
                : undefined,
            q: this.searchTerm ? encodeURIComponent(this.searchTerm) : undefined,
            p: this.currentPage !== DEFAULT_PARAMS.currentPage
                ? String(this.currentPage)
                : undefined,
            z: this.zoomIndex !== this.defaultZoomIndex
                ? String(this.zoomIndex)
                : undefined,
            c: encodedCriteria,
        };
    }
    makeQueryParameters() {
        const query = [];
        const params = this.getEncodedParams();
        if (params.q) {
            query.push(`q=${params.q}`);
        }
        if (params.c) {
            for (const c of params.c) {
                query.push(`c=${c}`);
            }
        }
        if (params.sortby) {
            query.push(`sortby=${params.sortby}`);
        }
        if (params.sortdir) {
            query.push(`sortdir=${params.sortdir}`);
        }
        if (params.perPage) {
            query.push(`perPage=${params.perPage}`);
        }
        if (params.disp) {
            query.push(`disp=${params.disp}`);
        }
        if (params.z) {
            query.push(`z=${params.z}`);
        }
        if (params.p) {
            query.push(`p=${params.p}`);
        }
        return query.join("&");
    }
    makeCriterion(type) {
        const { criterionOptions } = (0, factory_1.getFilterOptions)(this.mode);
        const option = criterionOptions.find((o) => o.type === type);
        if (!option) {
            return new criterion_1.UnsupportedCriterionOption(type).makeCriterion(this.config);
        }
        return option.makeCriterion(this.config);
    }
    makeFindFilter() {
        return {
            q: this.searchTerm,
            page: this.currentPage,
            per_page: this.itemsPerPage,
            sort: this.getSortBy(),
            direction: this.sortDirection,
        };
    }
    makeFilter() {
        const output = {};
        for (const c of this.criteria) {
            c.applyToCriterionInput(output);
        }
        return output;
    }
    // TODO - this needs to just use makeFilter, but it needs a migration
    makeSavedFilter() {
        const output = {};
        for (const c of this.criteria) {
            c.applyToSavedCriterion(output);
        }
        return output;
    }
    makeSavedUIOptions() {
        return {
            display_mode: this.displayMode,
            zoom_index: this.zoomIndex,
        };
    }
    criteriaFor(type) {
        return this.criteria.filter((c) => c.criterionOption.type === type);
    }
    replaceCriteria(type, newCriteria) {
        const criteria = [
            ...this.criteria.filter((c) => c.criterionOption.type !== type),
            ...newCriteria,
        ];
        return this.setCriteria(criteria);
    }
    clearCriteria(clearSearchTerm = false) {
        const ret = this.clone();
        if (clearSearchTerm) {
            ret.searchTerm = "";
        }
        ret.criteria = [];
        ret.currentPage = 1;
        return ret;
    }
    clearSearchTerm() {
        const ret = this.clone();
        ret.searchTerm = "";
        ret.currentPage = 1; // reset to first page
        return ret;
    }
    setCriteria(criteria) {
        const ret = this.clone();
        ret.criteria = criteria;
        ret.currentPage = 1; // reset to first page
        return ret;
    }
    removeCriterion(type) {
        const ret = this.clone();
        const c = ret.criteria.find((cc) => cc.criterionOption.type === type);
        if (!c)
            return ret;
        const newCriteria = ret.criteria.filter((cc) => {
            return cc.getId() !== c.getId();
        });
        ret.criteria = newCriteria;
        ret.currentPage = 1;
        return ret;
    }
    removeCustomFieldCriterion(type, index) {
        const ret = this.clone();
        const c = ret.criteria.find((cc) => cc.criterionOption.type === type);
        if (!c)
            return ret;
        if (c instanceof custom_fields_1.CustomFieldsCriterion) {
            const newCriteria = c.value.filter((_, i) => i !== index);
            c.value = newCriteria;
        }
        return ret;
    }
    setPageSize(pageSize) {
        const ret = this.clone();
        ret.itemsPerPage = pageSize;
        ret.currentPage = 1; // reset to first page
        return ret;
    }
    setSortBy(sortBy) {
        const ret = this.clone();
        ret.sortBy = sortBy;
        ret.currentPage = 1; // reset to first page
        return ret;
    }
    toggleSortDirection() {
        const ret = this.clone();
        if (ret.sortDirection === generated_graphql_1.SortDirectionEnum.Asc) {
            ret.sortDirection = generated_graphql_1.SortDirectionEnum.Desc;
        }
        else {
            ret.sortDirection = generated_graphql_1.SortDirectionEnum.Asc;
        }
        ret.currentPage = 1; // reset to first page
        return ret;
    }
    reshuffleRandomSort() {
        const ret = this.clone();
        ret.currentPage = 1;
        ret.randomSeed = -1;
        return ret;
    }
    changePage(page) {
        const ret = this.clone();
        ret.currentPage = page;
        return ret;
    }
    setZoom(zoomIndex) {
        const ret = this.clone();
        ret.zoomIndex = zoomIndex;
        return ret;
    }
    setDisplayMode(displayMode) {
        const ret = this.clone();
        ret.displayMode = displayMode;
        return ret;
    }
}
exports.ListFilterModel = ListFilterModel;
//# sourceMappingURL=filter.js.map