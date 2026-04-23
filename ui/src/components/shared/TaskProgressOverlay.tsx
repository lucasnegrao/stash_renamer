const PluginApi = window.PluginApi;
const React = PluginApi.React;

interface ITaskProgressOverlayProps {
	show: boolean;
	progress: number;
	text?: string;
}

export const TaskProgressOverlay: React.FC<ITaskProgressOverlayProps> = ({
	show,
	progress,
	text,
}) => {
	if (!show) return null;
	return (
		<div
			style={{
				position: "absolute",
				inset: 0,
				background: "rgba(0, 0, 0, 0.55)",
				zIndex: 1200,
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
			}}
		>
			<div
				className="bg-dark text-light p-3 rounded"
				style={{ minWidth: "360px", maxWidth: "520px", width: "80%" }}
			>
				<div className="mb-2">Task Running</div>
				<div className="progress mb-2" style={{ height: "18px" }}>
					<div
						className="progress-bar progress-bar-striped progress-bar-animated"
						role="progressbar"
						style={{ width: `${progress}%` }}
						aria-valuemin={0}
						aria-valuemax={100}
						aria-valuenow={progress}
					>
						{progress}%
					</div>
				</div>
				<div className="small text-muted">{text || "Running..."}</div>
			</div>
		</div>
	);
};
