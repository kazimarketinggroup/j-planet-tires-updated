"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReservationRoutes = void 0;
const express_1 = __importDefault(require("express"));
const reservation_controller_1 = require("./reservation.controller");
// import { auth } from '../../middlewares/auth'; // uncomment to protect admin routes
const router = express_1.default.Router();
// Public
router.post('/', reservation_controller_1.ReservationControllers.createReservation);
// Admin
router.get('/', /* auth('admin'), */ reservation_controller_1.ReservationControllers.getAllReservations);
router.get('/:id', /* auth('admin'), */ reservation_controller_1.ReservationControllers.getReservationById);
router.patch('/:id', /* auth('admin'), */ reservation_controller_1.ReservationControllers.updateReservationStatus);
router.delete('/:id', /* auth('admin'), */ reservation_controller_1.ReservationControllers.deleteReservation);
exports.ReservationRoutes = router;
