"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.genderStrings = exports.stringToGender = exports.genderToString = exports.genderList = exports.stringGenderMap = void 0;
const GQL = __importStar(require("../core/generated-graphql"));
exports.stringGenderMap = new Map([
    ["Female", GQL.GenderEnum.Female],
    ["Male", GQL.GenderEnum.Male],
    ["Transgender Male", GQL.GenderEnum.TransgenderMale],
    ["Transgender Female", GQL.GenderEnum.TransgenderFemale],
    ["Intersex", GQL.GenderEnum.Intersex],
    ["Non-Binary", GQL.GenderEnum.NonBinary],
]);
exports.genderList = [
    GQL.GenderEnum.Female,
    GQL.GenderEnum.Male,
    GQL.GenderEnum.TransgenderFemale,
    GQL.GenderEnum.TransgenderMale,
    GQL.GenderEnum.Intersex,
    GQL.GenderEnum.NonBinary,
];
const genderToString = (value) => {
    if (!value) {
        return undefined;
    }
    const foundEntry = Array.from(exports.stringGenderMap.entries()).find((e) => {
        return e[1] === value;
    });
    if (foundEntry) {
        return foundEntry[0];
    }
};
exports.genderToString = genderToString;
const stringToGender = (value, caseInsensitive) => {
    if (!value) {
        return undefined;
    }
    const existing = Object.entries(GQL.GenderEnum).find((e) => e[1] === value);
    if (existing)
        return existing[1];
    const ret = exports.stringGenderMap.get(value);
    if (ret || !caseInsensitive) {
        return ret;
    }
    const asUpper = value.toUpperCase();
    const foundEntry = Array.from(exports.stringGenderMap.entries()).find((e) => {
        return e[0].toUpperCase() === asUpper;
    });
    if (foundEntry) {
        return foundEntry[1];
    }
};
exports.stringToGender = stringToGender;
exports.genderStrings = Array.from(exports.stringGenderMap.keys());
//# sourceMappingURL=gender.js.map