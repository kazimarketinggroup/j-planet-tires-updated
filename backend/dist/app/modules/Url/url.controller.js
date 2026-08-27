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
exports.UrlControllers = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const url_service_1 = require("./url.service");
const http_status_ts_1 = require("http-status-ts");
const url_model_1 = require("./url.model");
const createShortUrl = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user.id;
    const result = yield url_service_1.UrlServices.createShortUrlIntoDB(userId, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_ts_1.HttpStatus.CREATED,
        success: true,
        message: 'Short URL created successfully',
        data: {
            shortCode: result.shortCode,
            shortUrl: `${process.env.BACKEND_URL}/${result.shortCode}`,
        },
    });
}));
const getMyUrls = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user.id;
    const result = yield url_service_1.UrlServices.getMyUrlsFromDB(userId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_ts_1.HttpStatus.OK,
        success: true,
        message: 'URLs fetched successfully',
        data: result,
    });
}));
const redirectShortUrl = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { shortCode } = req.params;
    const url = yield url_model_1.Url.findOneAndUpdate({ shortCode }, { $inc: { clickCount: 1 } }, { new: true });
    if (!url) {
        res.status(404).send(`
      <div style="font-family: system-ui; text-align: center; padding: 4rem; background: #f9f9f9; min-height: 100vh;">
        <h1 style="font-size: 3rem; color: #4c1d95;">Oops!</h1>
        <p style="font-size: 1.2rem; color: #666;">This short link doesn't exist or has expired.</p>
        <a href="/" style="color: #7c3aed; text-decoration: underline;">Go back home</a>
      </div>
    `);
        return;
    }
    let destination = url.originalUrl;
    if (!/^https?:\/\//i.test(destination)) {
        destination = 'http://' + destination;
    }
    res.redirect(301, destination);
}));
const deleteUrl = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const userId = req.user.id;
    yield url_service_1.UrlServices.deleteUrlFromDB(id, userId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_ts_1.HttpStatus.OK,
        success: true,
        message: 'URL deleted successfully',
        data: null,
    });
}));
exports.UrlControllers = {
    createShortUrl,
    getMyUrls,
    redirectShortUrl,
    deleteUrl,
};
