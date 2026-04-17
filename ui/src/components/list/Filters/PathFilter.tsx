import {
	CriterionValue,
	ModifierCriterion,
} from "src/models/list-filter/criteria/criterion";

const PluginApi = window.PluginApi;
const React = PluginApi.React;
const { Form } = PluginApi.libraries.Bootstrap;

interface IPathFilterProps {
	criterion: ModifierCriterion<CriterionValue>;
	onValueChanged: (value: string) => void;
}

export const PathFilter: React.FC<IPathFilterProps> = ({
	criterion,
	onValueChanged,
}) => (
	<Form.Group>
		<Form.Control
			className="btn-secondary"
			type="text"
			onChange={(event: any) =>
				onValueChanged(String(event.target.value || ""))
			}
			value={criterion.value ? String(criterion.value) : ""}
		/>
	</Form.Group>
);
