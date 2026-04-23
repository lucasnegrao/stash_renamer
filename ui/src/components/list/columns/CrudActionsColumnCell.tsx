const PluginApi = window.PluginApi;
const React = PluginApi.React;
const { Button, ButtonGroup } = PluginApi.libraries.Bootstrap;
const { Icon } = PluginApi.components;
const { faEdit, faTrash } = PluginApi.libraries.FontAwesomeSolid;

interface ICrudActionsColumnCellProps {
	disabled?: boolean;
	onEdit?: () => void;
	onRemove?: () => void;
}

export const CrudActionsColumnCell: React.FC<ICrudActionsColumnCellProps> = ({
	disabled,
	onEdit,
	onRemove,
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
			<ButtonGroup size="sm">
				<Button
					variant="secondary"
					disabled={disabled || !onEdit}
					onClick={(event: any) => {
						event.stopPropagation();
						if (onEdit) onEdit();
					}}
					title="Edit"
				>
					<Icon icon={faEdit} />
				</Button>
				<Button
					variant="danger"
					disabled={disabled || !onRemove}
					onClick={(event: any) => {
						event.stopPropagation();
						if (onRemove) onRemove();
					}}
					title="Remove"
				>
					<Icon icon={faTrash} />
				</Button>
			</ButtonGroup>
		</div>
	);
};
