"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PerformerFavoriteCriterion = exports.PerformerFavoriteCriterionOption = exports.FavoriteStudioCriterion = exports.FavoriteStudioCriterionOption = exports.FavoriteTagCriterion = exports.FavoriteTagCriterionOption = exports.FavoritePerformerCriterion = exports.FavoritePerformerCriterionOption = void 0;
const criterion_1 = require("./criterion");
exports.FavoritePerformerCriterionOption = new criterion_1.BooleanCriterionOption("favourite", "filter_favorites", () => new FavoritePerformerCriterion());
class FavoritePerformerCriterion extends criterion_1.BooleanCriterion {
    constructor() {
        super(exports.FavoritePerformerCriterionOption);
    }
}
exports.FavoritePerformerCriterion = FavoritePerformerCriterion;
exports.FavoriteTagCriterionOption = new criterion_1.BooleanCriterionOption("favourite", "favorite", () => new FavoriteTagCriterion());
class FavoriteTagCriterion extends criterion_1.BooleanCriterion {
    constructor() {
        super(exports.FavoriteTagCriterionOption);
    }
}
exports.FavoriteTagCriterion = FavoriteTagCriterion;
exports.FavoriteStudioCriterionOption = new criterion_1.BooleanCriterionOption("favourite", "favorite", () => new FavoriteStudioCriterion());
class FavoriteStudioCriterion extends criterion_1.BooleanCriterion {
    constructor() {
        super(exports.FavoriteStudioCriterionOption);
    }
}
exports.FavoriteStudioCriterion = FavoriteStudioCriterion;
exports.PerformerFavoriteCriterionOption = new criterion_1.BooleanCriterionOption("performer_favorite", "performer_favorite", () => new PerformerFavoriteCriterion());
class PerformerFavoriteCriterion extends criterion_1.BooleanCriterion {
    constructor() {
        super(exports.PerformerFavoriteCriterionOption);
    }
}
exports.PerformerFavoriteCriterion = PerformerFavoriteCriterion;
//# sourceMappingURL=favorite.js.map