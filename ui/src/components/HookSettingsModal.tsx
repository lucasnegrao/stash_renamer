import {
	fetchHookSettings,
	fetchSavedTemplates,
	type IRenamerTemplate,
	saveHookSettings,
} from "../services/sceneRenamerApi";

const PluginApi = window.PluginApi;
const React = PluginApi.React;
const { Button, Form, Modal, InputGroup, Spinner } =
	PluginApi.libraries.Bootstrap;

interface IHookSettingsModalProps {
	show: boolean;
	hookType?: string;
	onHide: () => void;
	onSaved?: () => void;
}

export const HookSettingsModal: React.FC<IHookSettingsModalProps> = ({
	show,
	hookType = "Scene.Update.Post",
	onHide,
	onSaved,
}) => {
	const [templates, setTemplates] = React.useState<IRenamerTemplate[]>([]);
	const [enabled, setEnabled] = React.useState(false);
	const [templateIds, setTemplateIds] = React.useState<string[]>([""]);
	const [loading, setLoading] = React.useState(false);
	const [saving, setSaving] = React.useState(false);
	const [status, setStatus] = React.useState("");

	const load = React.useCallback(async () => {
		setLoading(true);
		setStatus("");
		try {
			const [allTemplates, hook] = await Promise.all([
				fetchSavedTemplates(),
				fetchHookSettings(hookType),
			]);
			setTemplates(allTemplates);
			setEnabled(Boolean(hook.enabled));
			const nextIds = Array.isArray(hook.template_ids) ? hook.template_ids : [];
			setTemplateIds(nextIds.length > 0 ? nextIds : [""]);
		} catch (e: any) {
			setStatus(`Error loading hook settings: ${e?.message || String(e)}`);
		} finally {
			setLoading(false);
		}
	}, [hookType]);

	React.useEffect(() => {
		if (!show) return;
		load();
	}, [show, load]);

	const setRow = (index: number, value: string) => {
		setTemplateIds((prev: string[]) =>
			prev.map((row: string, i: number) =>
				i === index ? String(value || "") : row,
			),
		);
	};

	const addRow = () => {
		setTemplateIds((prev: string[]) => [...prev, ""]);
	};

	const removeRow = (index: number) => {
		setTemplateIds((prev: string[]) => {
			const next = prev.filter((_: string, i: number) => i !== index);
			return next.length > 0 ? next : [""];
		});
	};

	const moveRow = (index: number, direction: -1 | 1) => {
		setTemplateIds((prev: string[]) => {
			const target = index + direction;
			if (target < 0 || target >= prev.length) return prev;
			const next = [...prev];
			const current = next[index];
			next[index] = next[target];
			next[target] = current;
			return next;
		});
	};

	const save = async () => {
		setSaving(true);
		setStatus("");
		try {
			const filteredIds = templateIds
				.map((id: string) => String(id || "").trim())
				.filter((id: string) => Boolean(id));
			await saveHookSettings({
				hookType,
				enabled,
				templateIds: filteredIds,
			});
			setStatus("Hook settings saved.");
			if (onSaved) onSaved();
			onHide();
		} catch (e: any) {
			setStatus(`Error saving hook settings: ${e?.message || String(e)}`);
		} finally {
			setSaving(false);
		}
	};

	return (
		<Modal show={show} onHide={saving ? undefined : onHide} centered size="lg">
			<Modal.Header closeButton={!saving}>
				<Modal.Title>Hook Settings ({hookType})</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				{loading ? (
					<div className="d-flex align-items-center gap-2">
						<Spinner animation="border" size="sm" role="status" />
						<span>Loading hook settings...</span>
					</div>
				) : (
					<>
						<Form.Group className="mb-3">
							<Form.Check
								id="scene-renamer-hook-enabled"
								type="switch"
								checked={enabled}
								onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
									setEnabled(e.target.checked)
								}
								disabled={saving}
								label="Enable Scene.Update.Post hook"
							/>
						</Form.Group>

						<div className="mb-2 fw-bold">Templates to run (in order)</div>
						{templateIds.map((templateId: string, index: number) => (
							<InputGroup className="mb-2" key={`hook-template-${index}`}>
								<InputGroup.Text>#{index + 1}</InputGroup.Text>
								<Form.Control
									as="select"
									value={templateId}
									onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
										setRow(index, e.target.value)
									}
									disabled={saving}
								>
									<option value="">Select template...</option>
									{templates.map((tpl: IRenamerTemplate) => (
										<option key={String(tpl.id)} value={String(tpl.id)}>
											{String(tpl.name)}
										</option>
									))}
								</Form.Control>
								<Button
									variant="outline-secondary"
									onClick={() => moveRow(index, -1)}
									disabled={saving || index === 0}
									title="Move up"
								>
									Up
								</Button>
								<Button
									variant="outline-secondary"
									onClick={() => moveRow(index, 1)}
									disabled={saving || index === templateIds.length - 1}
									title="Move down"
								>
									Down
								</Button>
								<Button
									variant="outline-danger"
									onClick={() => removeRow(index)}
									disabled={saving}
									title="Remove row"
								>
									Remove
								</Button>
							</InputGroup>
						))}

						<Button
							variant="outline-primary"
							onClick={addRow}
							disabled={saving}
						>
							Add Template Row
						</Button>

						{status ? <div className="mt-3 text-muted">{status}</div> : null}
					</>
				)}
			</Modal.Body>
			<Modal.Footer>
				<Button variant="secondary" onClick={onHide} disabled={saving}>
					Cancel
				</Button>
				<Button variant="primary" onClick={save} disabled={loading || saving}>
					{saving ? "Saving..." : "Save"}
				</Button>
			</Modal.Footer>
		</Modal>
	);
};
