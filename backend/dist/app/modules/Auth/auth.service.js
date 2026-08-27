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
exports.AuthService = void 0;
const http_status_ts_1 = require("http-status-ts");
const user_model_1 = require("../User/user.model");
const AppError_1 = __importDefault(require("../../Errors/AppError"));
const auth_utils_1 = __importDefault(require("./auth.utils"));
const config_1 = __importDefault(require("../../config"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const Login = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.isUserExistByEmail(payload.email);
    if (!user) {
        throw new AppError_1.default(http_status_ts_1.HttpStatus.NOT_FOUND, 'No user found with this email');
    }
    if (user.isBlocked) {
        throw new AppError_1.default(http_status_ts_1.HttpStatus.FORBIDDEN, 'User is blocked');
    }
    const isPasswordMatched = yield user_model_1.User.isPasswordMatched(payload.password, user.password);
    if (!isPasswordMatched) {
        throw new AppError_1.default(http_status_ts_1.HttpStatus.UNAUTHORIZED, 'Invalid password');
    }
    if (!user._id) {
        throw new AppError_1.default(http_status_ts_1.HttpStatus.INTERNAL_SERVER_ERROR, 'User ID is missing');
    }
    const jwtPayload = {
        id: user._id.toString(),
        email: user.email,
        role: user.role,
    };
    const accessToken = auth_utils_1.default.CreateToken(jwtPayload, config_1.default.jwt_secret, config_1.default.jwt_access_token_expires_in);
    const refreshToken = auth_utils_1.default.CreateToken(jwtPayload, config_1.default.jwt_refresh_token_secret, config_1.default.jwt_refresh_token_expires_in);
    return { accessToken, refreshToken };
});
const Register = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const existingUser = yield user_model_1.User.isUserExistByEmail(payload.email);
    if (existingUser) {
        throw new AppError_1.default(http_status_ts_1.HttpStatus.CONFLICT, 'User already exists');
    }
    const user = yield user_model_1.User.create(payload);
    if (!user._id) {
        throw new AppError_1.default(http_status_ts_1.HttpStatus.INTERNAL_SERVER_ERROR, 'User ID is missing after registration');
    }
    const jwtPayload = {
        id: user._id.toString(),
        email: user.email,
        role: user.role,
    };
    const accessToken = auth_utils_1.default.CreateToken(jwtPayload, config_1.default.jwt_secret, config_1.default.jwt_access_token_expires_in);
    const refreshToken = auth_utils_1.default.CreateToken(jwtPayload, config_1.default.jwt_refresh_token_secret, config_1.default.jwt_refresh_token_expires_in);
    return { accessToken, refreshToken };
});
const ChangePassword = (userId, currentPassword, newPassword) => __awaiter(void 0, void 0, void 0, function* () {
    // 1️⃣ Fetch user with password
    const user = yield user_model_1.User.findById(userId).select('+password');
    if (!user) {
        throw new AppError_1.default(http_status_ts_1.HttpStatus.NOT_FOUND, 'User not found');
    }
    // 2️⃣ Compare current password
    const isMatch = yield bcrypt_1.default.compare(currentPassword, user.password);
    if (!isMatch) {
        throw new AppError_1.default(http_status_ts_1.HttpStatus.BAD_REQUEST, 'Current password is incorrect');
    }
    // 3️⃣ Optional: Validate new password
    if (newPassword.length < 8) {
        throw new AppError_1.default(http_status_ts_1.HttpStatus.BAD_REQUEST, 'New password must be at least 8 characters');
    }
    // 4️⃣ ✅ Assign new password directly (model pre-save hook will hash it)
    user.password = newPassword;
    yield user.save();
    // 5️⃣ Return success message
    return { message: 'Password updated successfully' };
});
const RefreshToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    let decoded;
    try {
        decoded = auth_utils_1.default.VerifyToken(token, config_1.default.jwt_refresh_token_secret);
    }
    catch (_a) {
        throw new AppError_1.default(http_status_ts_1.HttpStatus.UNAUTHORIZED, 'Invalid refresh token');
    }
    const user = yield user_model_1.User.findOne({ _id: decoded.id, isBlocked: false });
    if (!user) {
        throw new AppError_1.default(http_status_ts_1.HttpStatus.NOT_FOUND, 'User not found or blocked');
    }
    const jwtPayload = {
        id: user._id.toString(),
        email: user.email,
        role: user.role,
    };
    const accessToken = auth_utils_1.default.CreateToken(jwtPayload, config_1.default.jwt_secret, config_1.default.jwt_access_token_expires_in);
    const newRefreshToken = auth_utils_1.default.CreateToken(jwtPayload, config_1.default.jwt_refresh_token_secret, config_1.default.jwt_refresh_token_expires_in);
    return { accessToken, newRefreshToken };
});
exports.AuthService = { Login, Register, RefreshToken, ChangePassword };
