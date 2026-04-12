import { convertFromRatingFormat, convertToRatingFormat, defaultRatingSystemOptions, } from "src/utils/rating";
import { CriterionModifier, } from "src/core/generated-graphql";
import { encodeRangeValue, ModifierCriterion, ModifierCriterionOption, } from "./criterion";
const modifierOptions = [
    CriterionModifier.Equals,
    CriterionModifier.NotEquals,
    CriterionModifier.GreaterThan,
    CriterionModifier.LessThan,
    CriterionModifier.Between,
    CriterionModifier.NotBetween,
    CriterionModifier.IsNull,
    CriterionModifier.NotNull,
];
function getRatingSystemOptions(config) {
    var _a;
    return (_a = config === null || config === void 0 ? void 0 : config.ui.ratingSystemOptions) !== null && _a !== void 0 ? _a : defaultRatingSystemOptions;
}
export const RatingCriterionOption = new ModifierCriterionOption({
    messageID: "rating",
    type: "rating100",
    modifierOptions,
    defaultModifier: CriterionModifier.Equals,
    makeCriterion: (o, config) => new RatingCriterion(getRatingSystemOptions(config)),
    inputType: "number",
});
export class RatingCriterion extends ModifierCriterion {
    constructor(ratingSystem) {
        super(RatingCriterionOption, { value: 0, value2: undefined });
        Object.defineProperty(this, "ratingSystem", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.ratingSystem = ratingSystem;
    }
    cloneValues() {
        this.value = { ...this.value };
    }
    get value() {
        return this._value;
    }
    set value(newValue) {
        // backwards compatibility - if this.value is a number, use that
        if (typeof newValue !== "object") {
            this._value = {
                value: convertFromRatingFormat(newValue, this.ratingSystem.type),
                value2: undefined,
            };
        }
        else {
            this._value = newValue;
        }
    }
    toCriterionInput() {
        var _a;
        return {
            modifier: this.modifier,
            value: (_a = this.value.value) !== null && _a !== void 0 ? _a : 0,
            value2: this.value.value2,
        };
    }
    setFromSavedCriterion(c) {
        super.setFromSavedCriterion(c);
        // this.value = decodeRangeValue(c);
    }
    encodeValue() {
        return encodeRangeValue(this.modifier, this.value);
    }
    getLabelValue() {
        var _a, _b, _c;
        const { value, value2 } = this.value;
        if (this.modifier === CriterionModifier.Between ||
            this.modifier === CriterionModifier.NotBetween) {
            return `${(_a = convertToRatingFormat(value, this.ratingSystem)) !== null && _a !== void 0 ? _a : 0}, ${(_b = convertToRatingFormat(value2, this.ratingSystem)) !== null && _b !== void 0 ? _b : 0}`;
        }
        else {
            return `${(_c = convertToRatingFormat(value, this.ratingSystem)) !== null && _c !== void 0 ? _c : 0}`;
        }
    }
}
//# sourceMappingURL=rating.js.map