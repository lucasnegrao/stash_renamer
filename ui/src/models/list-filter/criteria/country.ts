import { IntlShape } from "react-intl";
import { CriterionModifier } from "src/core/generated-graphql";
import { StringCriterion, StringCriterionOption } from "./criterion";

export const CountryCriterionOption = new StringCriterionOption({
	messageID: "country",
	type: "country",
	makeCriterion: () => new CountryCriterion(),
});

export class CountryCriterion extends StringCriterion {
	constructor() {
		super(CountryCriterionOption);
	}

	protected getLabelValue(intl: IntlShape) {
		if (
			this.modifier === CriterionModifier.Equals ||
			this.modifier === CriterionModifier.NotEquals
		) {
			return this.value;
		}

		return super.getLabelValue(intl);
	}
}
