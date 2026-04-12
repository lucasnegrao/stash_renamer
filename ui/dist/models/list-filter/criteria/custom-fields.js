"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomFieldsCriterion = exports.CustomFieldsCriterionOption = void 0;
const criterion_1 = require("./criterion");
const generated_graphql_1 = require("src/core/generated-graphql");
const utilities_1 = require("@apollo/client/utilities");
function valueToString(value) {
    if (!value)
        return "";
    return value.map((v) => v).join(", ");
}
exports.CustomFieldsCriterionOption = new criterion_1.CriterionOption({
    type: "custom_fields",
    messageID: "custom_fields.title",
    makeCriterion: () => new CustomFieldsCriterion(),
});
class CustomFieldsCriterion extends criterion_1.Criterion {
    constructor() {
        super(exports.CustomFieldsCriterionOption);
        Object.defineProperty(this, "value", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: []
        });
    }
    isValid() {
        return this.value.length > 0;
    }
    applyToCriterionInput(input) {
        input.custom_fields = (0, utilities_1.cloneDeep)(this.value);
    }
    applyToSavedCriterion(input) {
        input.custom_fields = (0, utilities_1.cloneDeep)(this.value);
    }
    getLabel(intl) {
        var _a, _b;
        // show first criterion
        if (this.value.length === 0) {
            return "";
        }
        const first = this.value[0];
        let messageID;
        let valueString = "";
        if (first.modifier !== generated_graphql_1.CriterionModifier.IsNull &&
            first.modifier !== generated_graphql_1.CriterionModifier.NotNull &&
            ((_b = (_a = first.value) === null || _a === void 0 ? void 0 : _a.length) !== null && _b !== void 0 ? _b : 0) > 0) {
            valueString = valueToString(first.value);
        }
        const modifierString = criterion_1.ModifierCriterion.getModifierLabel(intl, first.modifier);
        const opts = {
            criterion: first.field,
            modifierString,
            valueString,
            others: "",
        };
        if (this.value.length === 1) {
            messageID = "custom_fields.criteria_format_string";
        }
        else {
            messageID = "custom_fields.criteria_format_string_others";
            opts.others = (this.value.length - 1).toString();
        }
        return intl.formatMessage({ id: messageID }, opts);
    }
    getValueLabel(intl, v) {
        var _a, _b;
        let valueString = "";
        if (v.modifier !== generated_graphql_1.CriterionModifier.IsNull &&
            v.modifier !== generated_graphql_1.CriterionModifier.NotNull &&
            ((_b = (_a = v.value) === null || _a === void 0 ? void 0 : _a.length) !== null && _b !== void 0 ? _b : 0) > 0) {
            valueString = valueToString(v.value);
        }
        const modifierString = criterion_1.ModifierCriterion.getModifierLabel(intl, v.modifier);
        const opts = {
            criterion: v.field,
            modifierString,
            valueString,
        };
        return intl.formatMessage({ id: "custom_fields.criteria_format_string" }, opts);
    }
    toQueryParams() {
        const encodedCriterion = {
            type: this.criterionOption.type,
            value: this.value,
        };
        return encodedCriterion;
    }
    fromDecodedParams(i) {
        const criterion = i;
        this.value = (0, utilities_1.cloneDeep)(criterion.value);
    }
    setFromSavedCriterion(input) {
        this.value = (0, utilities_1.cloneDeep)(input);
    }
}
exports.CustomFieldsCriterion = CustomFieldsCriterion;
//# sourceMappingURL=custom-fields.js.map