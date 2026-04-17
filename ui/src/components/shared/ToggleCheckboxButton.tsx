const PluginApi = window.PluginApi;
const React = PluginApi.React;
const { ToggleButton } = PluginApi.libraries.Bootstrap;

type TToggleButtonProps = React.ComponentProps<typeof ToggleButton>;

export const ToggleCheckboxButton: React.FC<TToggleButtonProps> = ({
	className = "",
	...props
}) => {
	const mergedClassName =
		`mb-0 sr-toggle-checkbox-btn ${String(className || "")}`.trim();
	return <ToggleButton {...props} className={mergedClassName} />;
};
