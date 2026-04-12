import { useCallback, useEffect } from "react";
const blobToDataURL = (blob) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
});
const readImage = (file, onLoadEnd) => {
    // only proceed if no error encountered
    blobToDataURL(file)
        .then(onLoadEnd)
        .catch(() => { });
};
const onImageChange = (event, onLoadEnd) => {
    var _a, _b;
    const file = (_b = (_a = event === null || event === void 0 ? void 0 : event.currentTarget) === null || _a === void 0 ? void 0 : _a.files) === null || _b === void 0 ? void 0 : _b[0];
    if (file)
        readImage(file, onLoadEnd);
};
const imageToDataURL = async (url) => {
    const response = await fetch(url);
    const blob = await response.blob();
    return blobToDataURL(blob);
};
// uses event.clipboardData which works in all contexts including insecure HTTP
const pasteImage = (event, onLoadEnd) => {
    var _a;
    const files = (_a = event === null || event === void 0 ? void 0 : event.clipboardData) === null || _a === void 0 ? void 0 : _a.files;
    if (!(files === null || files === void 0 ? void 0 : files.length))
        return;
    if (document.activeElement instanceof HTMLInputElement) {
        // don't interfere with pasting text into inputs
        return;
    }
    const file = Array.from(files).find((f) => f.type.startsWith("image/"));
    if (file)
        readImage(file, onLoadEnd);
};
// uses Clipboard API which requires secure context (HTTPS or localhost)
const readClipboardImage = async () => {
    if (!window.isSecureContext) {
        return null;
    }
    const items = await navigator.clipboard.read();
    for (const item of items) {
        const imageType = item.types.find((t) => t.startsWith("image/"));
        if (imageType) {
            const blob = await item.getType(imageType);
            return blobToDataURL(blob);
        }
    }
    return null;
};
const usePasteImage = (onLoadEnd, isActive = true) => {
    const encodeImage = useCallback((data) => {
        onLoadEnd(data);
    }, [onLoadEnd]);
    useEffect(() => {
        const paste = (event) => pasteImage(event, encodeImage);
        if (isActive) {
            document.addEventListener("paste", paste);
        }
        return () => document.removeEventListener("paste", paste);
    }, [isActive, encodeImage]);
    return false;
};
const ImageUtils = {
    onImageChange,
    usePasteImage,
    imageToDataURL,
    readClipboardImage,
};
export default ImageUtils;
//# sourceMappingURL=image.js.map