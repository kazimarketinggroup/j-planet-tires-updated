"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingRoutes = void 0;
const express_1 = require("express");
const booking_controller_1 = require("./booking.controller");
const router = (0, express_1.Router)();
router.post('/submit', booking_controller_1.BookingControllers.createBooking);
router.get('/', booking_controller_1.BookingControllers.getAllBookings);
exports.BookingRoutes = router;
