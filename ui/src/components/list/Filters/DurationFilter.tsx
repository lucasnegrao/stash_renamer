import { DurationInput } from "src/components/shared/DurationInput";
import { CriterionModifier } from "src/core/generated-graphql";
import type { ModifierCriterion } from "src/models/list-filter/criteria/criterion";
import type { INumberValue } from "src/models/list-filter/types";

const PluginApi = window.PluginApi;
const React = PluginApi.React;
const { Form } = PluginApi.libraries.Bootstrap;
const { useIntl } = PluginApi.libraries.Intl;

interface IDurationFilterProps {
	criterion: ModifierCriterion<INumberValue>;
	onValueChanged: (value: INumberValue) => void;
}

export const DurationFilter: React.FC<IDurationFilterProps> = ({
	criterion,
	onValueChanged,
}) => {
	const intl = useIntl();
	const value = criterion.value || { value: undefined, value2: undefined };

	function onChanged(raw: string, key: "value" | "value2") {
		const parsed = Number(raw);
		onValueChanged({
			...value,
			[key]: Number.isNaN(parsed) ? undefined : parsed,
		});
	}

	function renderInput(
		key: "value" | "value2",
		placeholder: string,
		current: number | undefined,
	) {
		return (
			<Form.Group>
				<DurationInput
					value={criterion.value?.value}
					setValue={(v) => onChanged(v, "value")}
					placeholder={placeholder}
				/>
			</Form.Group>
		);
	}

	const modifier = criterion.modifier;
	return (
		<>
			{(modifier === CriterionModifier.Equals ||
				modifier === CriterionModifier.NotEquals) &&
				renderInput(
					"value",
					intl.formatMessage({ id: "criterion.value" }),
					value.value,
				)}
			{(modifier === CriterionModifier.GreaterThan ||
				modifier === CriterionModifier.Between ||
				modifier === CriterionModifier.NotBetween) &&
				renderInput(
					"value",
					intl.formatMessage({ id: "criterion.greater_than" }),
					value.value,
				)}
			{(modifier === CriterionModifier.LessThan ||
				modifier === CriterionModifier.Between ||
				modifier === CriterionModifier.NotBetween) &&
				renderInput(
					modifier === CriterionModifier.LessThan ? "value" : "value2",
					intl.formatMessage({ id: "criterion.less_than" }),
					modifier === CriterionModifier.LessThan ? value.value : value.value2,
				)}
		</>
	);
};
