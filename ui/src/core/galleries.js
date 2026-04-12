import TextUtils from "src/utils/text";
export function galleryTitle(s) {
    if (s.title) {
        return s.title;
    }
    if (s.files && s.files.length > 0) {
        return TextUtils.fileNameFromPath(s.files[0].path);
    }
    if (s.folder) {
        return TextUtils.fileNameFromPath(s.folder.path);
    }
    return "";
}
export function galleryPath(s) {
    if (s.files && s.files.length > 0) {
        return s.files[0].path;
    }
    if (s.folder) {
        return s.folder.path;
    }
    return "";
}
//# sourceMappingURL=galleries.js.map