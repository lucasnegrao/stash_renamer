"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertFromRatingFormat = exports.convertToRatingFormat = exports.getRatingPrecision = exports.defaultRatingSystemOptions = exports.ratingStarPrecisionIntlMap = exports.ratingSystemIntlMap = exports.defaultRatingStarPrecision = exports.defaultRatingSystemType = exports.RatingStarPrecision = exports.RatingSystemType = void 0;
var RatingSystemType;
(function (RatingSystemType) {
    RatingSystemType["Stars"] = "stars";
    RatingSystemType["Decimal"] = "decimal";
})(RatingSystemType || (exports.RatingSystemType = RatingSystemType = {}));
var RatingStarPrecision;
(function (RatingStarPrecision) {
    RatingStarPrecision["Full"] = "full";
    RatingStarPrecision["Half"] = "half";
    RatingStarPrecision["Quarter"] = "quarter";
    RatingStarPrecision["Tenth"] = "tenth";
})(RatingStarPrecision || (exports.RatingStarPrecision = RatingStarPrecision = {}));
exports.defaultRatingSystemType = RatingSystemType.Stars;
exports.defaultRatingStarPrecision = RatingStarPrecision.Full;
exports.ratingSystemIntlMap = new Map([
    [
        RatingSystemType.Stars,
        "config.ui.editing.rating_system.type.options.stars",
    ],
    [
        RatingSystemType.Decimal,
        "config.ui.editing.rating_system.type.options.decimal",
    ],
]);
exports.ratingStarPrecisionIntlMap = new Map([
    [
        RatingStarPrecision.Full,
        "config.ui.editing.rating_system.star_precision.options.full",
    ],
    [
        RatingStarPrecision.Half,
        "config.ui.editing.rating_system.star_precision.options.half",
    ],
    [
        RatingStarPrecision.Quarter,
        "config.ui.editing.rating_system.star_precision.options.quarter",
    ],
    [
        RatingStarPrecision.Tenth,
        "config.ui.editing.rating_system.star_precision.options.tenth",
    ],
]);
exports.defaultRatingSystemOptions = {
    type: exports.defaultRatingSystemType,
    starPrecision: exports.defaultRatingStarPrecision,
};
function round(value, step) {
    let denom = step;
    if (!denom) {
        denom = 1.0;
    }
    const inv = 1.0 / denom;
    return Math.round(value * inv) / inv;
}
function getRatingPrecision(precision) {
    switch (precision) {
        case RatingStarPrecision.Full:
            return 1;
        case RatingStarPrecision.Half:
            return 0.5;
        case RatingStarPrecision.Quarter:
            return 0.25;
        case RatingStarPrecision.Tenth:
            return 0.1;
        default:
            return 1;
    }
}
exports.getRatingPrecision = getRatingPrecision;
function convertToRatingFormat(rating, ratingSystemOptions) {
    if (!rating) {
        return null;
    }
    const { type, starPrecision } = ratingSystemOptions;
    const precision = type === RatingSystemType.Decimal
        ? 0.1
        : getRatingPrecision(starPrecision !== null && starPrecision !== void 0 ? starPrecision : RatingStarPrecision.Full);
    const maxValue = type === RatingSystemType.Decimal ? 10 : 5;
    const denom = 100 / maxValue;
    return round(rating / denom, precision);
}
exports.convertToRatingFormat = convertToRatingFormat;
function convertFromRatingFormat(rating, ratingSystem) {
    const maxValue = (ratingSystem !== null && ratingSystem !== void 0 ? ratingSystem : RatingSystemType.Stars) === RatingSystemType.Decimal
        ? 10
        : 5;
    const factor = 100 / maxValue;
    return Math.round(rating * factor);
}
exports.convertFromRatingFormat = convertFromRatingFormat;
//# sourceMappingURL=rating.js.map