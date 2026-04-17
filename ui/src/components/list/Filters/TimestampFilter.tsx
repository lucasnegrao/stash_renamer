import { CriterionModifier } from "src/core/generated-graphql";
import { ModifierCriterion } from "src/models/list-filter/criteria/criterion";
import { ITimestampValue } from "src/models/list-filter/types";

const PluginApi = window.PluginApi;
const React = PluginApi.React;
const { Form } = PluginApi.libraries.Bootstrap;
const { useIntl } = PluginApi.libraries.Intl;

interface ITimestampFilterProps {
	criterion: ModifierCriterion<ITimestampValue>;
	onValueChanged: (value: ITimestampValue) => void;
}

export const TimestampFilter: React.FC<ITimestampFilterProps> = ({
	criterion,
	onValueChanged,
}) => {
	const intl = useIntl();
	const value = criterion.value || { value: "", value2: "" };
	const DateInput = PluginApi.components.DateInput;

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
				<DateInput
					value={value?.value ?? ""}
					onValueChange={(v) => onChanged(v, "value")}
					placeholder={intl.formatMessage({ id: "criterion.value" })}
					isTime
				/>
				{/* <Form.Control
					className="btn-secondary"
					type="datetime-local"
					onChange={(e: any) => onChanged(String(e.target.value || ""), key)}
					value={current ?? ""}
					placeholder={placeholder}
				/> */}
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
