import { StashEndpointSelect } from "../list/Filters/StashEndpointSelect";

const PluginApi = window.PluginApi;
const React = PluginApi.React;
const { Form } = PluginApi.libraries.Bootstrap;

interface IWatchdogEndpointSourcesOptionProps {
	label: string;
	value: unknown;
	onChange: (nextValue: unknown) => void;
}

function endpointListFromValue(value: unknown): string[] {
	if (!Array.isArray(value)) return [];
	return value
		.map((row: any) => String(row?.source?.endpoint || row || "").trim())
		.filter((entry: string) => Boolean(entry));
}

export const WatchdogEndpointSourcesOption: React.FC<
	IWatchdogEndpointSourcesOptionProps
> = ({ label, value, onChange }) => {
	const endpoints = endpointListFromValue(value);

	return (
		<div className="mb-2">
			<Form.Label>{label}</Form.Label>
			<StashEndpointSelect
				value={endpoints}
				onChange={(nextEndpoints: string[]) => {
					onChange(
						nextEndpoints.map((endpoint) => ({
							source: { endpoint },
						})),
					);
				}}
			/>
		</div>
	);
};
