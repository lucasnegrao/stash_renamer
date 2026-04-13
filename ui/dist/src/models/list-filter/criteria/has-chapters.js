"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HasChaptersCriterion = exports.HasChaptersCriterionOption = void 0;
const criterion_1 = require("./criterion");
exports.HasChaptersCriterionOption = new criterion_1.StringBooleanCriterionOption("hasChapters", "has_chapters", () => new HasChaptersCriterion());
class HasChaptersCriterion extends criterion_1.StringBooleanCriterion {
    constructor() {
        super(exports.HasChaptersCriterionOption);
    }
}
exports.HasChaptersCriterion = HasChaptersCriterion;
//# sourceMappingURL=has-chapters.js.map