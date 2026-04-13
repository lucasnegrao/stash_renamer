"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apolloError = void 0;
exports.errorToString = errorToString;
const client_1 = require("@apollo/client");
const apolloError = (error) => error instanceof client_1.ApolloError ? error.message : "";
exports.apolloError = apolloError;
function errorToString(error) {
    let message;
    if (error instanceof Error) {
        message = error.message;
    }
    if (!message) {
        message = String(error);
    }
    if (!message) {
        message = "Unknown error";
    }
    return message;
}
//# sourceMappingURL=errors.js.map