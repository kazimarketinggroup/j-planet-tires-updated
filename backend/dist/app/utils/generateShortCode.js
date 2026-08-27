"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateShortCode = void 0;
const crypto_1 = __importDefault(require("crypto"));
const generateShortCode = (length = 6) => {
    return crypto_1.default
        .randomBytes(length)
        .toString('base64')
        .replace(/[^a-zA-Z0-9]/g, '')
        .slice(0, length);
};
exports.generateShortCode = generateShortCode;
