"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useFocusOnce = void 0;
const react_1 = require("react");
const useFocus = () => {
    const htmlElRef = (0, react_1.useRef)(null);
    const setFocus = (0, react_1.useCallback)((selectAll) => {
        const currentEl = htmlElRef.current;
        if (currentEl) {
            if (selectAll) {
                currentEl.select();
            }
            else {
                currentEl.focus();
            }
        }
    }, []);
    // eslint-disable-next-line no-undef
    return [htmlElRef, setFocus];
};
// focuses on the element only once on mount
const useFocusOnce = (active, override) => {
    const [htmlElRef, setFocus] = useFocus();
    const focused = (0, react_1.useRef)(false);
    (0, react_1.useEffect)(() => {
        if ((!focused.current || override) && active) {
            setFocus();
            focused.current = true;
        }
    }, [setFocus, active, override]);
    return [htmlElRef, setFocus];
};
exports.useFocusOnce = useFocusOnce;
exports.default = useFocus;
//# sourceMappingURL=focus.js.map