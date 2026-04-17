const PluginApi = window.PluginApi;
const React = PluginApi.React;
const { Button, Modal, Form } = PluginApi.libraries.Bootstrap;

interface ITemplateSaveAsModalProps {
	show: boolean;
	initialName?: string;
	saving?: boolean;
	onCancel: () => void;
	onSave: (name: string) => void;
}

export const TemplateSaveAsModal: React.FC<ITemplateSaveAsModalProps> = ({
	show,
	initialName = "",
	saving = false,
	onCancel,
	onSave,
}) => {
	const [name, setName] = React.useState(initialName);

	React.useEffect(() => {
		if (!show) return;
		setName(initialName || "");
	}, [show, initialName]);

	const submit = () => {
		const trimmed = String(name || "").trim();
		if (!trimmed) return;
		onSave(trimmed);
	};

	return (
		<Modal show={show} onHide={onCancel} centered>
			<Modal.Header closeButton>
				<Modal.Title>Save Template As</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form.Group className="mb-0">
					<Form.Label>Template name</Form.Label>
					<Form.Control
						type="text"
						value={name}
						disabled={saving}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
							setName(e.target.value)
						}
						onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
							if (e.key === "Enter") {
								e.preventDefault();
								submit();
							}
						}}
						autoFocus
					/>
				</Form.Group>
			</Modal.Body>
			<Modal.Footer>
				<Button variant="secondary" onClick={onCancel} disabled={saving}>
					Cancel
				</Button>
				<Button
					variant="primary"
					onClick={submit}
					disabled={saving || !String(name || "").trim()}
				>
					{saving ? "Saving..." : "Save"}
				</Button>
			</Modal.Footer>
		</Modal>
	);
};
