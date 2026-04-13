"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.galleryTitle = galleryTitle;
exports.galleryPath = galleryPath;
const text_1 = __importDefault(require("../utils/text"));
function galleryTitle(s) {
    if (s.title) {
        return s.title;
    }
    if (s.files && s.files.length > 0) {
        return text_1.default.fileNameFromPath(s.files[0].path);
    }
    if (s.folder) {
        return text_1.default.fileNameFromPath(s.folder.path);
    }
    return "";
}
function galleryPath(s) {
    if (s.files && s.files.length > 0) {
        return s.files[0].path;
    }
    if (s.folder) {
        return s.folder.path;
    }
    return "";
}
//# sourceMappingURL=galleries.js.map