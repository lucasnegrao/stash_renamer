import { BooleanCriterion } from "src/models/list-filter/criteria/criterion";

const PluginApi = window.PluginApi;
const React = PluginApi.React;
const { Form } = PluginApi.libraries.Bootstrap;

interface IBooleanFilterProps {
	criterion: BooleanCriterion;
	setCriterion: (c: BooleanCriterion) => void;
}

export const BooleanFilter: React.FC<IBooleanFilterProps> = ({
	criterion,
	setCriterion,
}) => {
	function onSelect(raw: string) {
		const next = criterion.clone();
		next.value = raw;
		setCriterion(next);
	}

	return (
		<div className="boolean-filter">
			<Form.Check
				id={`${criterion.getId()}-true`}
				onChange={() => onSelect("true")}
				checked={criterion.value === "true"}
				type="radio"
				label="true"
			/>
			<Form.Check
				id={`${criterion.getId()}-false`}
				onChange={() => onSelect("false")}
				checked={criterion.value === "false"}
				type="radio"
				label="false"
			/>
		</div>
	);
};
