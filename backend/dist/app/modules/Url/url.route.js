"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UrlRoutes = void 0;
const express_1 = require("express");
const url_controller_1 = require("./url.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const router = (0, express_1.Router)();
router.post('/shorten', (0, auth_1.default)(), url_controller_1.UrlControllers.createShortUrl);
router.get('/my-urls', (0, auth_1.default)(), url_controller_1.UrlControllers.getMyUrls);
router.delete('/:id', (0, auth_1.default)(), url_controller_1.UrlControllers.deleteUrl);
// public
// router.get('/:shortCode', UrlControllers.redirectShortUrl);
exports.UrlRoutes = router;
