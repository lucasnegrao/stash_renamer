import { CriterionModifier } from "src/core/generated-graphql";
import type { NumberCriterion } from "src/models/list-filter/criteria/criterion";
import type { INumberValue } from "src/models/list-filter/types";

const PluginApi = window.PluginApi;
const React = PluginApi.React;
const { Form } = PluginApi.libraries.Bootstrap;
const { useIntl } = PluginApi.libraries.Intl;

interface INumberFilterProps {
	criterion: NumberCriterion;
	onValueChanged: (value: INumberValue) => void;
}

export const NumberFilter: React.FC<INumberFilterProps> = ({
	criterion,
	onValueChanged,
}) => {
	const intl = useIntl();
	const value = criterion.value || { value: undefined, value2: undefined };

	function setField(raw: string, key: "value" | "value2") {
		const parsed = Number(raw);
		const next = { ...value, [key]: Number.isNaN(parsed) ? undefined : parsed };
		onValueChanged(next);
	}

	function renderInput(
		key: "value" | "value2",
		placeholder: string,
		current: number | undefined,
	) {
		return (
			<Form.Group>
				eeeeee
				<Form.Control
					className="btn-secondary"
					type="number"
					onChange={(e: any) => setField(String(e.target.value || ""), key)}
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
