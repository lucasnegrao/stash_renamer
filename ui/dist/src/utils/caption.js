"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.valueToCode = exports.languageMap = void 0;
exports.languageMap = new Map([
    ["de", "Deutsche"],
    ["en", "English"],
    ["es", "Español"],
    ["fr", "Français"],
    ["it", "Italiano"],
    ["ja", "日本"],
    ["ko", "한국인"],
    ["nl", "Holandés"],
    ["pt", "Português"],
    ["ru", "Русский"],
    ["00", "Unknown"], // stash reserved language code
]);
const valueToCode = (value) => {
    if (!value) {
        return undefined;
    }
    return Array.from(exports.languageMap.keys()).find((v) => {
        return exports.languageMap.get(v) === value;
    });
};
exports.valueToCode = valueToCode;
//# sourceMappingURL=caption.js.map