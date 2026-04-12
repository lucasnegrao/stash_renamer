"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.imagePath = exports.imageTitle = exports.objectPath = exports.objectTitle = void 0;
const text_1 = __importDefault(require("src/utils/text"));
function objectTitle(s) {
    if (s.title) {
        return s.title;
    }
    if (s.files && s.files.length > 0) {
        return text_1.default.fileNameFromPath(s.files[0].path);
    }
    return "";
}
exports.objectTitle = objectTitle;
function objectPath(s) {
    if (s.files && s.files.length > 0) {
        return s.files[0].path;
    }
    return "";
}
exports.objectPath = objectPath;
function imageTitle(s) {
    if (s.title) {
        return s.title;
    }
    if (s.visual_files && s.visual_files.length > 0) {
        return text_1.default.fileNameFromPath(s.visual_files[0].path);
    }
    return "";
}
exports.imageTitle = imageTitle;
function imagePath(s) {
    if (s.visual_files && s.visual_files.length > 0) {
        return s.visual_files[0].path;
    }
    return "";
}
exports.imagePath = imagePath;
//# sourceMappingURL=files.js.map