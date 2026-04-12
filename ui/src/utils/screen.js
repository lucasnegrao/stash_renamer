import { useEffect, useState } from "react";
const isMobile = () => window.matchMedia("only screen and (max-width: 576px)").matches;
const isTouch = () => window.matchMedia("(pointer: coarse)").matches;
function matchesMediaQuery(query) {
    return window.matchMedia(query).matches;
}
// from: https://dev.to/salimzade/handle-media-query-in-react-with-hooks-3cp3
export const useMediaQuery = (query) => {
    const [matches, setMatches] = useState(false);
    useEffect(() => {
        const media = window.matchMedia(query);
        setMatches(media.matches);
        // Define the listener as a separate function to avoid recreating it on each render
        const listener = () => setMatches(media.matches);
        // Use 'change' instead of 'resize' for better performance
        media.addEventListener("change", listener);
        // Cleanup function to remove the event listener
        return () => media.removeEventListener("change", listener);
    }, [query]); // Only recreate the listener when 'matches' or 'query' changes
    return matches;
};
const ScreenUtils = {
    isMobile,
    isTouch,
    matchesMediaQuery,
};
export default ScreenUtils;
//# sourceMappingURL=screen.js.map