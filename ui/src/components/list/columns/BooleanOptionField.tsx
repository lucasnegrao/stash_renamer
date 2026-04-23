import { BooleanOptionColumnCell } from "./BooleanOptionColumnCell";

const PluginApi = window.PluginApi;
const React = PluginApi.React;
const { Form } = PluginApi.libraries.Bootstrap;

interface IBooleanOptionFieldProps {
	label: string;
	checked: boolean;
	disabled?: boolean;
	onChange: (nextValue: boolean) => void;
}

export const BooleanOptionField: React.FC<IBooleanOptionFieldProps> = ({
	label,
	checked,
	disabled,
	onChange,
}) => {
	return (
		<div className="d-flex align-items-center gap-2 mb-2">
			<Form.Label className="mb-0">{label}</Form.Label>
			<BooleanOptionColumnCell
				checked={checked}
				disabled={disabled}
				onChange={onChange}
			/>
		</div>
	);
};
