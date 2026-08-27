"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const MONGODB_URI = process.env.DATABASE_URL;
if (!MONGODB_URI) {
    throw new Error('Please define the DATABASE_URL environment variable');
}
const cached = (_a = global.mongooseCache) !== null && _a !== void 0 ? _a : { conn: null, promise: null };
global.mongooseCache = cached;
function dbConnect() {
    return __awaiter(this, void 0, void 0, function* () {
        if (cached.conn)
            return cached.conn;
        if (!cached.promise) {
            cached.promise = mongoose_1.default.connect(MONGODB_URI, {
                bufferCommands: false,
            });
        }
        cached.conn = yield cached.promise;
        return cached.conn;
    });
}
exports.default = dbConnect;
