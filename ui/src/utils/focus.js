import { useRef, useEffect, useCallback } from "react";
const useFocus = () => {
    const htmlElRef = useRef(null);
    const setFocus = useCallback((selectAll) => {
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
export const useFocusOnce = (active, override) => {
    const [htmlElRef, setFocus] = useFocus();
    const focused = useRef(false);
    useEffect(() => {
        if ((!focused.current || override) && active) {
            setFocus();
            focused.current = true;
        }
    }, [setFocus, active, override]);
    return [htmlElRef, setFocus];
};
export default useFocus;
//# sourceMappingURL=focus.js.map