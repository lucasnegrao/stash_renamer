const hexToBinary = (hex) => hex
    .split("")
    .map((i) => parseInt(i, 16).toString(2).padStart(4, "0"))
    .join("");
export const distance = (a, b) => {
    if (!b || a.length !== b.length)
        return 32;
    const aBinary = hexToBinary(a);
    const bBinary = hexToBinary(b);
    let counter = 0;
    for (let i = 0; i < aBinary.length; i++) {
        if (aBinary[i] !== bBinary[i])
            counter++;
    }
    return counter;
};
//# sourceMappingURL=hamming.js.map