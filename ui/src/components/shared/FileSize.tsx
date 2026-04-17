import TextUtils from "../../utils/text";

export const FileSize: React.FC<{ size: number }> = ({ size: fileSize }) => {
	const PluginApi = window.PluginApi;
	const React = PluginApi.React;
	const { size, unit } = TextUtils.fileSize(fileSize);
	const { FormattedNumber } = PluginApi.libraries.Intl;
	return (
		<>
			<FormattedNumber
				value={size}
				maximumFractionDigits={TextUtils.fileSizeFractionalDigits(unit)}
			/>
			{` ${TextUtils.formatFileSizeUnit(unit)}`}
		</>
	);
};
