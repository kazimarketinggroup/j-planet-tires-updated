"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_controller_1 = __importDefault(require("./auth.controller"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const router = express_1.default.Router();
router.post('/login', auth_controller_1.default.Login);
router.post('/register', 
//   (AuthValidation.RegisterSchema),
auth_controller_1.default.Register);
router.post("/change-password", (0, auth_1.default)(), auth_controller_1.default.changePassword);
router.post('/logout', auth_controller_1.default.Logout);
router.post('/refresh-token', auth_controller_1.default.RefreshToken);
exports.AuthRoutes = router;
