import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import TextUtils from "src/utils/text";
export const FileSize = ({ size: fileSize }) => {
    const { size, unit } = TextUtils.fileSize(fileSize);
    const PluginApi = window.PluginApi;
    const { FormattedNumber } = PluginApi.libraries.Intl;
    return (_jsxs(_Fragment, { children: [_jsx(FormattedNumber, { value: size, maximumFractionDigits: TextUtils.fileSizeFractionalDigits(unit) }), ` ${TextUtils.formatFileSizeUnit(unit)}`] }));
};
//# sourceMappingURL=FileSize.js.map