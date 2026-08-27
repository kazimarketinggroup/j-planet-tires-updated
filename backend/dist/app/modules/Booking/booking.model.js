"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Booking = void 0;
const mongoose_1 = require("mongoose");
const bookingItemSchema = new mongoose_1.Schema({
    size: { type: String, required: true, trim: true },
    quantity: { type: Number, required: true, min: 1 },
    sizeId: { type: String, trim: true },
}, { _id: false });
const bookingSchema = new mongoose_1.Schema({
    tireId: { type: String, trim: true },
    tireName: { type: String, required: true, trim: true },
    items: {
        type: [bookingItemSchema],
        required: true,
        validate: [(items) => items.length > 0, 'At least one tire size is required'],
    },
    totalQuantity: { type: Number, required: true, min: 1 },
    fullName: { type: String, required: true, trim: true },
    company: { type: String, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, trim: true },
    country: { type: String, trim: true },
    role: { type: String, trim: true },
    notes: { type: String, trim: true },
    status: {
        type: String,
        enum: ['pending', 'contacted', 'resolved'],
        default: 'pending',
    },
}, { timestamps: true });
exports.Booking = (0, mongoose_1.model)('Booking', bookingSchema);
