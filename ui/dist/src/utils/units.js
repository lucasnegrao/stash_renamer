"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cmToImperial = cmToImperial;
exports.kgToLbs = kgToLbs;
exports.cmToInches = cmToInches;
exports.remToPx = remToPx;
function cmToImperial(cm) {
    const cmInInches = 0.393700787;
    const inchesInFeet = 12;
    const inches = Math.round(cm * cmInInches);
    const feet = Math.floor(inches / inchesInFeet);
    return [feet, inches % inchesInFeet];
}
function kgToLbs(kg) {
    return Math.round(kg * 2.20462262185);
}
function cmToInches(cm) {
    const cmInInches = 0.393700787;
    const inches = cm * cmInInches;
    return inches;
}
function remToPx(rem) {
    return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
}
//# sourceMappingURL=units.js.map