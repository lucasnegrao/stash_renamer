export function keyboardClickHandler(onClick) {
    function onKeyDown(e) {
        if (e.key === "Enter" || e.key === " ") {
            onClick();
        }
    }
    return onKeyDown;
}
//# sourceMappingURL=keyboard.js.map