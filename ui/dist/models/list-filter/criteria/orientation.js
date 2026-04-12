"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrientationCriterionOption = exports.OrientationCriterion = void 0;
const orientation_1 = require("src/utils/orientation");
const criterion_1 = require("./criterion");
class OrientationCriterion extends criterion_1.MultiStringCriterion {
    toCriterionInput() {
        return {
            value: this.value
                .map((v) => (0, orientation_1.stringToOrientation)(v))
                .filter((v) => v),
        };
    }
}
exports.OrientationCriterion = OrientationCriterion;
class BaseOrientationCriterionOption extends criterion_1.ModifierCriterionOption {
    constructor(value) {
        super({
            messageID: value,
            type: value,
            options: orientation_1.orientationStrings,
            makeCriterion: () => new OrientationCriterion(this),
        });
    }
}
exports.OrientationCriterionOption = new BaseOrientationCriterionOption("orientation");
//# sourceMappingURL=orientation.js.map