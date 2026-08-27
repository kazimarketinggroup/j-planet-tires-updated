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
exports.UserController = void 0;
const user_service_1 = require("./user.service");
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const http_status_ts_1 = require("http-status-ts");
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
// Create user
const createUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_service_1.UserServices.createUserInToDB(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_ts_1.HttpStatus.CREATED,
        success: true,
        message: 'User registered successfully',
        data: result,
    });
}));
// Get all users
const getAllUsers = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_service_1.UserServices.getAllUsersFromDB();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_ts_1.HttpStatus.OK,
        success: true,
        message: 'Users fetched successfully',
        data: result,
    });
}));
// Get single user
const getSingleUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    if (!userId) {
        return (0, sendResponse_1.default)(res, {
            statusCode: http_status_ts_1.HttpStatus.BAD_REQUEST,
            success: false,
            message: 'User ID is required',
            data: null,
        });
    }
    const result = yield user_service_1.UserServices.getSingleUserFromDB(userId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_ts_1.HttpStatus.OK,
        success: true,
        message: 'User fetched successfully',
        data: result,
    });
}));
const updateUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    if (!userId) {
        return (0, sendResponse_1.default)(res, {
            statusCode: http_status_ts_1.HttpStatus.BAD_REQUEST,
            success: false,
            message: "User ID is required",
            data: null,
        });
    }
    const updateData = req.body;
    const updatedUser = yield user_service_1.UserServices.updateUserInDB(userId, updateData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_ts_1.HttpStatus.OK,
        success: true,
        message: "User updated successfully",
        data: updatedUser,
    });
}));
// Delete user
const deleteUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    if (!userId) {
        return (0, sendResponse_1.default)(res, {
            statusCode: http_status_ts_1.HttpStatus.BAD_REQUEST,
            success: false,
            message: 'User ID is required',
            data: null,
        });
    }
    yield user_service_1.UserServices.deleteUserFromDB(userId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_ts_1.HttpStatus.OK,
        success: true,
        message: 'User deleted successfully',
        data: {},
    });
}));
// Block user
const blockUserByAdmin = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    if (!userId) {
        return (0, sendResponse_1.default)(res, {
            statusCode: http_status_ts_1.HttpStatus.BAD_REQUEST,
            success: false,
            message: 'User ID is required',
            data: null,
        });
    }
    const result = yield user_service_1.UserServices.blockUserByAdminFromDB(userId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_ts_1.HttpStatus.OK,
        success: true,
        message: 'User blocked successfully',
        data: result,
    });
}));
// Unblock user
const unblockUserByAdmin = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    if (!userId) {
        return (0, sendResponse_1.default)(res, {
            statusCode: http_status_ts_1.HttpStatus.BAD_REQUEST,
            success: false,
            message: 'User ID is required',
            data: null,
        });
    }
    const result = yield user_service_1.UserServices.unblockUserByAdminFromDB(userId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_ts_1.HttpStatus.OK,
        success: true,
        message: 'User unblocked successfully',
        data: result,
    });
}));
exports.UserController = {
    createUser,
    getAllUsers,
    getSingleUser,
    updateUser,
    deleteUser,
    blockUserByAdmin,
    unblockUserByAdmin,
};
