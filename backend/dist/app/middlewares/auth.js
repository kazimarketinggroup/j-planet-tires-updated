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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const user_model_1 = require("../modules/User/user.model");
const AppError_1 = __importDefault(require("../Errors/AppError"));
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const http_status_ts_1 = require("http-status-ts");
const auth = (...requiredRoles) => {
    return (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const token = req.headers.authorization;
        // Check if the token is missing
        if (!token) {
            throw new AppError_1.default(http_status_ts_1.HttpStatus.UNAUTHORIZED, 'You are not authorized!');
        }
        // Verify the token
        const decoded = jsonwebtoken_1.default.verify(token, config_1.default.jwt_secret);
        const { role, email } = decoded;
        // Check if the user exists
        const user = yield user_model_1.User.isUserExistByEmail(email);
        if (!user) {
            throw new AppError_1.default(http_status_ts_1.HttpStatus.NOT_FOUND, 'This user is not found!');
        }
        // Check if the user is blocked
        if (user.isBlocked) {
            throw new AppError_1.default(http_status_ts_1.HttpStatus.FORBIDDEN, 'This user is blocked!');
        }
        // Check if the user has the required role
        if (requiredRoles.length && !requiredRoles.includes(role)) {
            throw new AppError_1.default(http_status_ts_1.HttpStatus.FORBIDDEN, 'You do not have access to this resource!');
        }
        // Attach the user to the request object
        req.user = decoded;
        // Pass control to the next middleware or route handler
        next();
    }));
};
exports.default = auth;
