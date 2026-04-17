import { RenamerSettingsPanel } from "../components/RenamerSettingsPanel";

const PluginApi = window.PluginApi;
const React = PluginApi.React;

export const RenamerSettings: React.FC = () => {
	return (
		<div className="container-fluid p-8">
			<RenamerSettingsPanel />
		</div>
	);
};
