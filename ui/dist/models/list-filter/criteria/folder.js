"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParentFolderCriterion = exports.FolderCriterion = exports.ParentFolderCriterionOption = exports.FolderCriterionOption = void 0;
const generated_graphql_1 = require("src/core/generated-graphql");
const criterion_1 = require("./criterion");
const modifierOptions = [generated_graphql_1.CriterionModifier.Includes];
const defaultModifier = generated_graphql_1.CriterionModifier.Includes;
const inputType = "folders";
exports.FolderCriterionOption = new criterion_1.ModifierCriterionOption({
    messageID: "folder",
    type: "folder",
    modifierOptions,
    defaultModifier,
    inputType,
    makeCriterion: () => new FolderCriterion(),
});
// for galleries, we should use parent folder to distinguish between gallery folder
// and parent folder of the gallery folder
exports.ParentFolderCriterionOption = new criterion_1.ModifierCriterionOption({
    messageID: "parent_folder",
    type: "parent_folder",
    modifierOptions,
    defaultModifier,
    inputType,
    makeCriterion: () => new ParentFolderCriterion(),
});
class FolderCriterion extends criterion_1.IHierarchicalLabeledIdCriterion {
    constructor() {
        super(exports.FolderCriterionOption);
    }
    applyToCriterionInput(input) {
        input.files_filter = {
            parent_folder: this.toCriterionInput(),
        };
    }
}
exports.FolderCriterion = FolderCriterion;
class ParentFolderCriterion extends criterion_1.IHierarchicalLabeledIdCriterion {
    constructor() {
        super(exports.ParentFolderCriterionOption);
    }
    applyToCriterionInput(input) {
        input.parent_folder = this.toCriterionInput();
    }
}
exports.ParentFolderCriterion = ParentFolderCriterion;
//# sourceMappingURL=folder.js.map