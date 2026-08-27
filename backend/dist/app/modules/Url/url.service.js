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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UrlServices = void 0;
const url_model_1 = require("./url.model");
const generateShortCode_1 = require("../../utils/generateShortCode");
const AppError_1 = __importDefault(require("../../Errors/AppError"));
const createShortUrlIntoDB = (userId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    // Free limit check (100)
    const totalUrls = yield url_model_1.Url.countDocuments({ user: userId });
    if (totalUrls >= 100) {
        throw new AppError_1.default(400, 'FREE_LIMIT_REACHED');
    }
    let shortCode = '';
    let isExist = true;
    //  Double check short code
    while (isExist) {
        shortCode = (0, generateShortCode_1.generateShortCode)(6);
        const exists = yield url_model_1.Url.isShortCodeExist(shortCode);
        if (!exists)
            isExist = false;
    }
    const result = yield url_model_1.Url.create({
        user: userId,
        originalUrl: payload.originalUrl,
        shortCode,
    });
    return result;
});
// Get user URLs
const getMyUrlsFromDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return url_model_1.Url.find({ user: userId }).sort({ createdAt: -1 });
});
//Redirect + analytics
const redirectAndTrack = (shortCode) => __awaiter(void 0, void 0, void 0, function* () {
    const url = yield url_model_1.Url.findOneAndUpdate({ shortCode }, { $inc: { clickCount: 1 } }, { new: true });
    if (!url)
        return null;
    let destination = url.originalUrl;
    if (!/^https?:\/\//i.test(destination)) {
        destination = 'http://' + destination;
    }
    return destination;
});
// Delete URL
const deleteUrlFromDB = (id, userId) => __awaiter(void 0, void 0, void 0, function* () {
    return url_model_1.Url.findOneAndDelete({ _id: id, user: userId });
});
exports.UrlServices = {
    createShortUrlIntoDB,
    getMyUrlsFromDB,
    redirectAndTrack,
    deleteUrlFromDB,
};
