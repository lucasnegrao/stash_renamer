const PluginApi = window.PluginApi;
const React = PluginApi.React;
const { Button, Modal } = PluginApi.libraries.Bootstrap;

interface IConfirmDialogProps {
	show: boolean;
	title: string;
	body: React.ReactNode;
	confirmLabel?: string;
	cancelLabel?: string;
	confirmVariant?: string;
	closeButton?: boolean;
	staticBackdrop?: boolean;
	onCancel: () => void;
	onConfirm: () => void;
}

export const ConfirmDialog: React.FC<IConfirmDialogProps> = ({
	show,
	title,
	body,
	confirmLabel = "Confirm",
	cancelLabel = "Cancel",
	confirmVariant = "primary",
	closeButton = true,
	staticBackdrop = false,
	onCancel,
	onConfirm,
}) => {
	const handleCancel = (e?: any) => {
		if (e?.preventDefault) e.preventDefault();
		if (e?.stopPropagation) e.stopPropagation();
		onCancel();
	};

	const handleConfirm = (e?: any) => {
		if (e?.preventDefault) e.preventDefault();
		if (e?.stopPropagation) e.stopPropagation();
		onConfirm();
	};

	return (
		<Modal
			show={show}
			onHide={handleCancel}
			centered
			backdrop={staticBackdrop ? "static" : true}
			keyboard={!staticBackdrop}
		>
			<Modal.Header closeButton={closeButton}>
				<Modal.Title>{title}</Modal.Title>
			</Modal.Header>
			<Modal.Body>{body}</Modal.Body>
			<Modal.Footer>
				<Button variant="secondary" onClick={handleCancel}>
					{cancelLabel}
				</Button>
				<Button variant={confirmVariant} onClick={handleConfirm}>
					{confirmLabel}
				</Button>
			</Modal.Footer>
		</Modal>
	);
};
