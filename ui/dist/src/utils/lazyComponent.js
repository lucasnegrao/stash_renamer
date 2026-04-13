"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lazyComponent = exports.isLazyComponentError = void 0;
const react_1 = require("react");
const isLazyComponentError = (e) => {
    return !!e.__lazyComponentError;
};
exports.isLazyComponentError = isLazyComponentError;
const lazyComponent = (factory) => {
    return (0, react_1.lazy)(async () => {
        try {
            return await factory();
        }
        catch (e) {
            // set flag to identify lazy component loading errors
            e.__lazyComponentError = true;
            throw e;
        }
    });
};
exports.lazyComponent = lazyComponent;
//# sourceMappingURL=lazyComponent.js.map