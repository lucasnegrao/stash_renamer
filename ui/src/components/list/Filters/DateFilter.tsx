import { CriterionModifier } from "src/core/generated-graphql";
import { ModifierCriterion } from "src/models/list-filter/criteria/criterion";
import { IDateValue } from "src/models/list-filter/types";

const PluginApi = window.PluginApi;
const React = PluginApi.React;
const { Form } = PluginApi.libraries.Bootstrap;
const { useIntl } = PluginApi.libraries.Intl;

interface IDateFilterProps {
	criterion: ModifierCriterion<IDateValue>;
	onValueChanged: (value: IDateValue) => void;
}

export const DateFilter: React.FC<IDateFilterProps> = ({
	criterion,
	onValueChanged,
}) => {
	const intl = useIntl();
	const value = criterion.value || { value: "", value2: "" };

	function onChanged(nextRaw: string, key: "value" | "value2") {
		onValueChanged({ ...value, [key]: nextRaw });
	}

	function renderInput(
		key: "value" | "value2",
		placeholder: string,
		current: string | undefined,
	) {
		return (
			<Form.Group>
				<Form.Control
					className="btn-secondary"
					type="date"
					onChange={(e: any) => onChanged(String(e.target.value || ""), key)}
					value={current ?? ""}
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
