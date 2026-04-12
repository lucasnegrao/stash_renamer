import { lazy } from "react";
export const isLazyComponentError = (e) => {
    return !!e.__lazyComponentError;
};
export const lazyComponent = (factory) => {
    return lazy(async () => {
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
//# sourceMappingURL=lazyComponent.js.map