"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListFilterOptions = exports.MediaSortByOptions = void 0;
exports.MediaSortByOptions = [
    "title",
    "path",
    "rating",
    "file_mod_time",
    "tag_count",
    "performer_count",
    "random",
];
class ListFilterOptions {
    static createSortBy(value) {
        return {
            messageID: value,
            value,
        };
    }
    constructor(defaultSortBy, sortByOptions, displayModeOptions, criterionOptions) {
        Object.defineProperty(this, "defaultSortBy", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ""
        });
        Object.defineProperty(this, "sortByOptions", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: []
        });
        Object.defineProperty(this, "displayModeOptions", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: []
        });
        Object.defineProperty(this, "criterionOptions", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: []
        });
        this.defaultSortBy = defaultSortBy;
        this.sortByOptions = [
            ...sortByOptions,
            ListFilterOptions.createSortBy("created_at"),
            ListFilterOptions.createSortBy("updated_at"),
        ];
        this.displayModeOptions = displayModeOptions;
        this.criterionOptions = criterionOptions;
    }
}
exports.ListFilterOptions = ListFilterOptions;
//# sourceMappingURL=filter-options.js.map