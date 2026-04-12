export const languageMap = new Map([
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
export const valueToCode = (value) => {
    if (!value) {
        return undefined;
    }
    return Array.from(languageMap.keys()).find((v) => {
        return languageMap.get(v) === value;
    });
};
//# sourceMappingURL=caption.js.map