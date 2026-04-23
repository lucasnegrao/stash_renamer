const PluginApi = window.PluginApi;
const React = PluginApi.React;
const { Button, ButtonGroup } = PluginApi.libraries.Bootstrap;
const { Icon } = PluginApi.components;
const { faEdit, faTrash, faCheck, faBan } =
	PluginApi.libraries.FontAwesomeSolid;

interface ICrudActionsColumnCellProps {
	disabled?: boolean;
	enabled?: boolean;
	onToggleEnabled?: (nextValue: boolean) => void;
	onEdit?: () => void;
	onRemove?: () => void;
}

export const CrudActionsColumnCell: React.FC<ICrudActionsColumnCellProps> = ({
	disabled,
	enabled,
	onToggleEnabled,
	onEdit,
	onRemove,
}) => {
	const hasAnyAction = Boolean(onToggleEnabled || onEdit || onRemove);
	if (!hasAnyAction) return null;

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
				{onToggleEnabled ? (
					<Button
						variant="secondary"
						disabled={disabled}
						onClick={(event: any) => {
							event.stopPropagation();
							onToggleEnabled(!Boolean(enabled));
						}}
						title={enabled ? "Disable" : "Enable"}
						aria-label={enabled ? "Disable" : "Enable"}
					>
						<Icon icon={enabled ? faCheck : faBan} />
					</Button>
				) : null}
				{onEdit ? (
					<Button
						variant="secondary"
						disabled={disabled}
						onClick={(event: any) => {
							event.stopPropagation();
							onEdit();
						}}
						title="Edit"
					>
						<Icon icon={faEdit} />
					</Button>
				) : null}
				{onRemove ? (
					<Button
						variant="secondary"
						disabled={disabled}
						onClick={(event: any) => {
							event.stopPropagation();
							onRemove();
						}}
						title="Remove"
					>
						<Icon icon={faTrash} />
					</Button>
				) : null}
			</ButtonGroup>
		</div>
	);
};
