const PluginApi = window.PluginApi;
const React = PluginApi.React;
const { Form } = PluginApi.libraries.Bootstrap;

interface IBooleanOptionColumnCellProps {
	checked: boolean;
	disabled?: boolean;
	id?: string;
	onChange: (nextValue: boolean) => void;
}

export const BooleanOptionColumnCell: React.FC<
	IBooleanOptionColumnCellProps
> = ({ checked, disabled, id, onChange }) => {
	const fallbackId = React.useMemo(
		() => `scene-renamer-switch-${Math.random().toString(36).slice(2, 10)}`,
		[],
	);
	const inputId = String(id || fallbackId);

	return (
		<div
			data-row-drag-ignore="true"
			onMouseDown={(event: any) => event.stopPropagation()}
			onDragStart={(event: any) => {
				event.preventDefault();
				event.stopPropagation();
			}}
		>
			<Form.Check
				id={inputId}
				type="switch"
				checked={checked}
				onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
					onChange(e.target.checked);
				}}
				disabled={disabled}
			/>
		</div>
	);
};
