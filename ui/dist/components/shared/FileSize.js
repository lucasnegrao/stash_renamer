"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileSize = void 0;
const react_1 = __importDefault(require("react"));
const text_1 = __importDefault(require("src/utils/text"));
const FileSize = ({ size: fileSize }) => {
    const { size, unit } = text_1.default.fileSize(fileSize);
    const PluginApi = window.PluginApi;
    const { FormattedNumber } = PluginApi.libraries.Intl;
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(FormattedNumber, { value: size, maximumFractionDigits: text_1.default.fileSizeFractionalDigits(unit) }),
        ` ${text_1.default.formatFileSizeUnit(unit)}`));
};
exports.FileSize = FileSize;
//# sourceMappingURL=FileSize.js.map