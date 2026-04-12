"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.remToPx = exports.cmToInches = exports.kgToLbs = exports.cmToImperial = void 0;
function cmToImperial(cm) {
    const cmInInches = 0.393700787;
    const inchesInFeet = 12;
    const inches = Math.round(cm * cmInInches);
    const feet = Math.floor(inches / inchesInFeet);
    return [feet, inches % inchesInFeet];
}
exports.cmToImperial = cmToImperial;
function kgToLbs(kg) {
    return Math.round(kg * 2.20462262185);
}
exports.kgToLbs = kgToLbs;
function cmToInches(cm) {
    const cmInInches = 0.393700787;
    const inches = cm * cmInInches;
    return inches;
}
exports.cmToInches = cmToInches;
function remToPx(rem) {
    return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
}
exports.remToPx = remToPx;
//# sourceMappingURL=units.js.map