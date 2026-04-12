"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const downloadFile = (url) => {
    const a = document.createElement("a");
    a.href = url;
    a.click();
};
exports.default = downloadFile;
//# sourceMappingURL=download.js.map