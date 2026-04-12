export function cmToImperial(cm) {
    const cmInInches = 0.393700787;
    const inchesInFeet = 12;
    const inches = Math.round(cm * cmInInches);
    const feet = Math.floor(inches / inchesInFeet);
    return [feet, inches % inchesInFeet];
}
export function kgToLbs(kg) {
    return Math.round(kg * 2.20462262185);
}
export function cmToInches(cm) {
    const cmInInches = 0.393700787;
    const inches = cm * cmInInches;
    return inches;
}
export function remToPx(rem) {
    return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
}
//# sourceMappingURL=units.js.map