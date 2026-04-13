"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PerformersCriterion = exports.PerformersCriterionOption = void 0;
const generated_graphql_1 = require("src/core/generated-graphql");
const criterion_1 = require("./criterion");
const modifierOptions = [
    generated_graphql_1.CriterionModifier.IncludesAll,
    generated_graphql_1.CriterionModifier.Includes,
    generated_graphql_1.CriterionModifier.Equals,
    generated_graphql_1.CriterionModifier.IsNull,
    generated_graphql_1.CriterionModifier.NotNull,
];
const defaultModifier = generated_graphql_1.CriterionModifier.IncludesAll;
const inputType = "performers";
exports.PerformersCriterionOption = new criterion_1.ModifierCriterionOption({
    messageID: "performers",
    type: "performers",
    modifierOptions,
    defaultModifier,
    inputType,
    makeCriterion: () => new PerformersCriterion(),
});
class PerformersCriterion extends criterion_1.ModifierCriterion {
    constructor() {
        super(exports.PerformersCriterionOption, { items: [], excluded: [] });
    }
    cloneValues() {
        this.value = {
            ...this.value,
            items: this.value.items.map((v) => ({ ...v })),
            excluded: this.value.excluded.map((v) => ({ ...v })),
        };
    }
    get modifier() {
        return this._modifier;
    }
    set modifier(value) {
        this._modifier = value;
        // excluded only makes sense for includes and includes all
        // reset it for other modifiers
        if (value !== generated_graphql_1.CriterionModifier.Includes &&
            value !== generated_graphql_1.CriterionModifier.IncludesAll) {
            this.value.excluded = [];
        }
    }
    setFromSavedCriterion(criterion) {
        const { modifier, value } = criterion;
        // #3619 - the format of performer value was changed from an array
        // to an object. Check for both formats.
        if (Array.isArray(value)) {
            this.value = { items: value, excluded: [] };
        }
        else if (value !== undefined) {
            this.value = {
                items: value.items || [],
                excluded: value.excluded || [],
            };
        }
        // if the previous modifier was excludes, replace it with the equivalent includes criterion
        // this is what is done on the backend
        if (modifier === generated_graphql_1.CriterionModifier.Excludes) {
            this.modifier = generated_graphql_1.CriterionModifier.Includes;
            this.value.excluded = [...this.value.excluded, ...this.value.items];
            this.value.items = [];
        }
        else {
            this.modifier = modifier;
        }
    }
    getLabelValue(_intl) {
        return this.value.items.map((v) => v.label).join(", ");
    }
    toCriterionInput() {
        let excludes = [];
        if (this.value.excluded) {
            excludes = this.value.excluded.map((v) => v.id);
        }
        return {
            value: this.value.items.map((v) => v.id),
            excludes: excludes,
            modifier: this.modifier,
        };
    }
    isValid() {
        if (this.modifier === generated_graphql_1.CriterionModifier.IsNull ||
            this.modifier === generated_graphql_1.CriterionModifier.NotNull) {
            return true;
        }
        return (this.value.items.length > 0 ||
            (this.value.excluded && this.value.excluded.length > 0));
    }
    getLabel(intl) {
        let id = "criterion_modifier.format_string";
        let modifierString = criterion_1.ModifierCriterion.getModifierLabel(intl, this.modifier);
        let valueString = "";
        let excludedString = "";
        if (this.modifier !== generated_graphql_1.CriterionModifier.IsNull &&
            this.modifier !== generated_graphql_1.CriterionModifier.NotNull) {
            valueString = this.value.items.map((v) => v.label).join(", ");
            if (this.value.excluded && this.value.excluded.length > 0) {
                if (this.value.items.length === 0) {
                    modifierString = criterion_1.ModifierCriterion.getModifierLabel(intl, generated_graphql_1.CriterionModifier.Excludes);
                    valueString = this.value.excluded.map((v) => v.label).join(", ");
                }
                else {
                    id = "criterion_modifier.format_string_excludes";
                    excludedString = this.value.excluded.map((v) => v.label).join(", ");
                }
            }
        }
        return intl.formatMessage({ id }, {
            criterion: intl.formatMessage({ id: this.criterionOption.messageID }),
            modifierString,
            valueString,
            excludedString,
        });
    }
}
exports.PerformersCriterion = PerformersCriterion;
//# sourceMappingURL=performers.js.map