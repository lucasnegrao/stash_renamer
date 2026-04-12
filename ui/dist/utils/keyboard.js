"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.keyboardClickHandler = void 0;
function keyboardClickHandler(onClick) {
    function onKeyDown(e) {
        if (e.key === "Enter" || e.key === " ") {
            onClick();
        }
    }
    return onKeyDown;
}
exports.keyboardClickHandler = keyboardClickHandler;
//# sourceMappingURL=keyboard.js.map