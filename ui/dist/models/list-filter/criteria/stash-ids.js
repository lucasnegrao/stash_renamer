"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StashIDCriterion = exports.StashIDCriterionOption = void 0;
const generated_graphql_1 = require("src/core/generated-graphql");
const criterion_1 = require("./criterion");
exports.StashIDCriterionOption = new criterion_1.ModifierCriterionOption({
    messageID: "stash_id",
    type: "stash_id_endpoint",
    modifierOptions: [
        generated_graphql_1.CriterionModifier.Equals,
        generated_graphql_1.CriterionModifier.NotEquals,
        generated_graphql_1.CriterionModifier.IsNull,
        generated_graphql_1.CriterionModifier.NotNull,
    ],
    makeCriterion: () => new StashIDCriterion(),
});
class StashIDCriterion extends criterion_1.ModifierCriterion {
    constructor() {
        super(exports.StashIDCriterionOption, {
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
        const modifierString = criterion_1.ModifierCriterion.getModifierLabel(intl, this.modifier);
        let valueString = "";
        if (this.modifier !== generated_graphql_1.CriterionModifier.IsNull &&
            this.modifier !== generated_graphql_1.CriterionModifier.NotNull) {
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
        if ((this.modifier === generated_graphql_1.CriterionModifier.IsNull ||
            this.modifier === generated_graphql_1.CriterionModifier.NotNull) &&
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
        return (this.modifier === generated_graphql_1.CriterionModifier.IsNull ||
            this.modifier === generated_graphql_1.CriterionModifier.NotNull ||
            this.value.stashID.length > 0);
    }
}
exports.StashIDCriterion = StashIDCriterion;
//# sourceMappingURL=stash-ids.js.map