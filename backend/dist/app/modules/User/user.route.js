"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
// import { upload } from '../../middlewares/upload';
const router = express_1.default.Router();
// Get all users (admin only)
router.get('/', user_controller_1.UserController.getAllUsers);
// Get single user (admin only)
router.get('/:userId', user_controller_1.UserController.getSingleUser);
// // Update user (admin only)
router.patch('/:userId', user_controller_1.UserController.updateUser);
// // Delete user (admin only)
// router.delete('/:userId', auth('admin'), UserController.deleteUser);
exports.userRoutes = router;
