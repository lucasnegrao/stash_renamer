import { clearHistory } from "../services/sceneRenamerApi";
import { requestResultsFocus } from "../services/renamerRuntimeState";
import { HookSettingsModal } from "./HookSettingsModal";
import { ConfirmDialog } from "./ConfirmDialog";

const PluginApi = window.PluginApi;
const React = PluginApi.React;
const { Button, Card, Spinner } = PluginApi.libraries.Bootstrap;

interface IRenamerSettingsPanelProps {
	className?: string;
}

export const RenamerSettingsPanel: React.FC<IRenamerSettingsPanelProps> = ({
	className = "",
}) => {
	const [showHookModal, setShowHookModal] = React.useState(false);
	const [showClearConfirm, setShowClearConfirm] = React.useState(false);
	const [clearing, setClearing] = React.useState(false);
	const [status, setStatus] = React.useState("");

	const onConfirmClear = async () => {
		setClearing(true);
		setStatus("");
		try {
			const result = await clearHistory();
			const deletedOperations = Number(result?.deleted_operations || 0);
			const deletedBatches = Number(result?.deleted_batches || 0);
			setStatus(
				`History cleared. Removed ${deletedOperations} operations and ${deletedBatches} batches.`,
			);
			requestResultsFocus(null);
		} catch (e: unknown) {
			const message =
				typeof e === "object" && e && "message" in e
					? String((e as { message?: unknown }).message || "")
					: "";
			setStatus(`Failed to clear history: ${message || String(e)}`);
		} finally {
			setClearing(false);
			setShowClearConfirm(false);
		}
	};

	return (
		<div className={className}>
			<HookSettingsModal
				show={showHookModal}
				onHide={() => setShowHookModal(false)}
				hookType="Scene.Update.Post"
			/>
			<ConfirmDialog
				show={showClearConfirm}
				title="Clear Rename History?"
				body="This removes all saved operation batches and results. Templates and hook settings are kept."
				confirmLabel={clearing ? "Clearing..." : "Clear History"}
				confirmVariant="danger"
				closeButton={!clearing}
				staticBackdrop
				onCancel={() => {
					if (clearing) return;
					setShowClearConfirm(false);
				}}
				onConfirm={onConfirmClear}
			/>
			<Card>
				<Card.Body>
					<div className="d-flex flex-column gap-2">
						<div className="d-flex align-items-center gap-2">
							<Button
								variant="primary"
								onClick={() => setShowHookModal(true)}
								disabled={clearing}
							>
								Edit Hook Settings
							</Button>
							<Button
								variant="outline-danger"
								onClick={() => setShowClearConfirm(true)}
								disabled={clearing}
							>
								{clearing ? (
									<>
										<Spinner
											animation="border"
											size="sm"
											role="status"
											className="mr-1"
										/>
										Clearing...
									</>
								) : (
									"Clean Database History"
								)}
							</Button>
						</div>
						<div className="text-muted small">
							Hook settings control automatic rename on Scene update events.
						</div>
						{status ? <div className="small">{status}</div> : null}
					</div>
				</Card.Body>
			</Card>
		</div>
	);
};
