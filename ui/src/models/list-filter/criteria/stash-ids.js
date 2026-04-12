import { CriterionModifier, } from "src/core/generated-graphql";
import { ModifierCriterion, ModifierCriterionOption, } from "./criterion";
export const StashIDCriterionOption = new ModifierCriterionOption({
    messageID: "stash_id",
    type: "stash_id_endpoint",
    modifierOptions: [
        CriterionModifier.Equals,
        CriterionModifier.NotEquals,
        CriterionModifier.IsNull,
        CriterionModifier.NotNull,
    ],
    makeCriterion: () => new StashIDCriterion(),
});
export class StashIDCriterion extends ModifierCriterion {
    constructor() {
        super(StashIDCriterionOption, {
            endpoint: "",
            stashID: "",
        });
    }
    cloneValues() {
        this.value = { ...this.value };
    }
    get value() {
        return this._value;
    }
    set value(newValue) {
        // backwards compatibility - if this.value is a string, use that as stash_id
        if (typeof newValue !== "object") {
            this._value = {
                endpoint: "",
                stashID: newValue,
            };
        }
        else {
            this._value = newValue;
        }
    }
    toCriterionInput() {
        return {
            endpoint: this.value.endpoint,
            stash_id: this.value.stashID,
            modifier: this.modifier,
        };
    }
    getLabel(intl) {
        const modifierString = ModifierCriterion.getModifierLabel(intl, this.modifier);
        let valueString = "";
        if (this.modifier !== CriterionModifier.IsNull &&
            this.modifier !== CriterionModifier.NotNull) {
            valueString = this.getLabelValue(intl);
        }
        else if (this.value.endpoint) {
            valueString = "(" + this.value.endpoint + ")";
        }
        return intl.formatMessage({ id: "criterion_modifier.format_string" }, {
            criterion: intl.formatMessage({ id: this.criterionOption.messageID }),
            modifierString,
            valueString,
        });
    }
    getLabelValue(_intl) {
        let ret = this.value.stashID;
        if (this.value.endpoint) {
            ret += " (" + this.value.endpoint + ")";
        }
        return ret;
    }
    setFromSavedCriterion(criterion) {
        super.setFromSavedCriterion(criterion);
        // const asStashIDValue = criterion as StashIdCriterionInput;
        // const asSavedCriterion =
        //   criterion as ISavedCriterion<StashIdCriterionInput>;
        // if (asStashIDValue.endpoint || asStashIDValue.stash_id) {
        //   this.value = {
        //     endpoint: asStashIDValue.endpoint ?? "",
        //     stashID: asStashIDValue.stash_id ?? "",
        //   };
        // } else if (asSavedCriterion.value) {
        //   this.value = {
        //     endpoint: asSavedCriterion.value.endpoint ?? "",
        //     stashID: asSavedCriterion.value.stash_id ?? "",
        //   };
        // }
    }
    toQueryParams() {
        super.toQueryParams();
        let encodedCriterion;
        if ((this.modifier === CriterionModifier.IsNull ||
            this.modifier === CriterionModifier.NotNull) &&
            !this.value.endpoint) {
            encodedCriterion = {
                type: this.criterionOption.type,
                modifier: this.modifier,
            };
        }
        else {
            encodedCriterion = {
                type: this.criterionOption.type,
                value: this.value,
                modifier: this.modifier,
            };
        }
        return encodedCriterion;
    }
    isValid() {
        return (this.modifier === CriterionModifier.IsNull ||
            this.modifier === CriterionModifier.NotNull ||
            this.value.stashID.length > 0);
    }
}
//# sourceMappingURL=stash-ids.js.map