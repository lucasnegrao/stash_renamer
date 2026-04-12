import TextUtils from "src/utils/text";
export function objectTitle(s) {
    if (s.title) {
        return s.title;
    }
    if (s.files && s.files.length > 0) {
        return TextUtils.fileNameFromPath(s.files[0].path);
    }
    return "";
}
export function objectPath(s) {
    if (s.files && s.files.length > 0) {
        return s.files[0].path;
    }
    return "";
}
export function imageTitle(s) {
    if (s.title) {
        return s.title;
    }
    if (s.visual_files && s.visual_files.length > 0) {
        return TextUtils.fileNameFromPath(s.visual_files[0].path);
    }
    return "";
}
export function imagePath(s) {
    if (s.visual_files && s.visual_files.length > 0) {
        return s.visual_files[0].path;
    }
    return "";
}
//# sourceMappingURL=files.js.map