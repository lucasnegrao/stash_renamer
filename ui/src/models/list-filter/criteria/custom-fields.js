import { Criterion, CriterionOption, ModifierCriterion } from "./criterion";
import { CriterionModifier, } from "src/core/generated-graphql";
import { cloneDeep } from "@apollo/client/utilities";
function valueToString(value) {
    if (!value)
        return "";
    return value.map((v) => v).join(", ");
}
export const CustomFieldsCriterionOption = new CriterionOption({
    type: "custom_fields",
    messageID: "custom_fields.title",
    makeCriterion: () => new CustomFieldsCriterion(),
});
export class CustomFieldsCriterion extends Criterion {
    constructor() {
        super(CustomFieldsCriterionOption);
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
        input.custom_fields = cloneDeep(this.value);
    }
    applyToSavedCriterion(input) {
        input.custom_fields = cloneDeep(this.value);
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
        if (first.modifier !== CriterionModifier.IsNull &&
            first.modifier !== CriterionModifier.NotNull &&
            ((_b = (_a = first.value) === null || _a === void 0 ? void 0 : _a.length) !== null && _b !== void 0 ? _b : 0) > 0) {
            valueString = valueToString(first.value);
        }
        const modifierString = ModifierCriterion.getModifierLabel(intl, first.modifier);
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
        if (v.modifier !== CriterionModifier.IsNull &&
            v.modifier !== CriterionModifier.NotNull &&
            ((_b = (_a = v.value) === null || _a === void 0 ? void 0 : _a.length) !== null && _b !== void 0 ? _b : 0) > 0) {
            valueString = valueToString(v.value);
        }
        const modifierString = ModifierCriterion.getModifierLabel(intl, v.modifier);
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
        this.value = cloneDeep(criterion.value);
    }
    setFromSavedCriterion(input) {
        this.value = cloneDeep(input);
    }
}
//# sourceMappingURL=custom-fields.js.map