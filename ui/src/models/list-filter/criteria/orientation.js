import { orientationStrings, stringToOrientation } from "src/utils/orientation";
import { ModifierCriterionOption, MultiStringCriterion } from "./criterion";
export class OrientationCriterion extends MultiStringCriterion {
    toCriterionInput() {
        return {
            value: this.value
                .map((v) => stringToOrientation(v))
                .filter((v) => v),
        };
    }
}
class BaseOrientationCriterionOption extends ModifierCriterionOption {
    constructor(value) {
        super({
            messageID: value,
            type: value,
            options: orientationStrings,
            makeCriterion: () => new OrientationCriterion(this),
        });
    }
}
export const OrientationCriterionOption = new BaseOrientationCriterionOption("orientation");
//# sourceMappingURL=orientation.js.map