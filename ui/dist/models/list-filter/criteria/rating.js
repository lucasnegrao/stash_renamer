"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RatingCriterion = exports.RatingCriterionOption = void 0;
const rating_1 = require("src/utils/rating");
const generated_graphql_1 = require("src/core/generated-graphql");
const criterion_1 = require("./criterion");
const modifierOptions = [
    generated_graphql_1.CriterionModifier.Equals,
    generated_graphql_1.CriterionModifier.NotEquals,
    generated_graphql_1.CriterionModifier.GreaterThan,
    generated_graphql_1.CriterionModifier.LessThan,
    generated_graphql_1.CriterionModifier.Between,
    generated_graphql_1.CriterionModifier.NotBetween,
    generated_graphql_1.CriterionModifier.IsNull,
    generated_graphql_1.CriterionModifier.NotNull,
];
function getRatingSystemOptions(config) {
    var _a;
    return (_a = config === null || config === void 0 ? void 0 : config.ui.ratingSystemOptions) !== null && _a !== void 0 ? _a : rating_1.defaultRatingSystemOptions;
}
exports.RatingCriterionOption = new criterion_1.ModifierCriterionOption({
    messageID: "rating",
    type: "rating100",
    modifierOptions,
    defaultModifier: generated_graphql_1.CriterionModifier.Equals,
    makeCriterion: (o, config) => new RatingCriterion(getRatingSystemOptions(config)),
    inputType: "number",
});
class RatingCriterion extends criterion_1.ModifierCriterion {
    constructor(ratingSystem) {
        super(exports.RatingCriterionOption, { value: 0, value2: undefined });
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
                value: (0, rating_1.convertFromRatingFormat)(newValue, this.ratingSystem.type),
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
        return (0, criterion_1.encodeRangeValue)(this.modifier, this.value);
    }
    getLabelValue() {
        var _a, _b, _c;
        const { value, value2 } = this.value;
        if (this.modifier === generated_graphql_1.CriterionModifier.Between ||
            this.modifier === generated_graphql_1.CriterionModifier.NotBetween) {
            return `${(_a = (0, rating_1.convertToRatingFormat)(value, this.ratingSystem)) !== null && _a !== void 0 ? _a : 0}, ${(_b = (0, rating_1.convertToRatingFormat)(value2, this.ratingSystem)) !== null && _b !== void 0 ? _b : 0}`;
        }
        else {
            return `${(_c = (0, rating_1.convertToRatingFormat)(value, this.ratingSystem)) !== null && _c !== void 0 ? _c : 0}`;
        }
    }
}
exports.RatingCriterion = RatingCriterion;
//# sourceMappingURL=rating.js.map