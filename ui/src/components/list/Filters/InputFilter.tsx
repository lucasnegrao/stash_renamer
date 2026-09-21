import type {
	CriterionValue,
	ModifierCriterion,
} from "src/models/list-filter/criteria/criterion";

const PluginApi = window.PluginApi;
const React = PluginApi.React;
const { Form } = PluginApi.libraries.Bootstrap;

interface IInputFilterProps {
	criterion: ModifierCriterion<CriterionValue>;
	onValueChanged: (value: string) => void;
}

export const InputFilter: React.FC<IInputFilterProps> = ({
	criterion,
	onValueChanged,
}) => (
	<Form.Group>
		<Form.Control
			className="btn-secondary"
			type={criterion.modifierCriterionOption().inputType || "text"}
			onChange={(event: any) =>
				onValueChanged(String(event.target.value || ""))
			}
			value={criterion.value ? String(criterion.value) : ""}
		/>
	</Form.Group>
);
