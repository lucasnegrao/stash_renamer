const PluginApi = window.PluginApi;
const React = PluginApi.React;
const { Form } = PluginApi.libraries.Bootstrap;

interface ISelectOption {
	value: string;
	label: string;
}

interface ISelectOptionColumnCellProps {
	value: string;
	options: ISelectOption[];
	placeholder?: string;
	disabled?: boolean;
	onChange: (nextValue: string) => void;
}

export const SelectOptionColumnCell: React.FC<ISelectOptionColumnCellProps> = ({
	value,
	options,
	placeholder = "Select option...",
	disabled,
	onChange,
}) => {
	return (
		<div
			data-row-drag-ignore="true"
			onMouseDown={(event: any) => event.stopPropagation()}
			onDragStart={(event: any) => {
				event.preventDefault();
				event.stopPropagation();
			}}
		>
			<Form.Control
				as="select"
				value={String(value || "")}
				disabled={disabled}
				onChange={(event: any) =>
					onChange(String(event?.currentTarget?.value || ""))
				}
			>
				<option value="">{placeholder}</option>
				{options.map((option) => (
					<option key={String(option.value)} value={String(option.value)}>
						{String(option.label)}
					</option>
				))}
			</Form.Control>
		</div>
	);
};
