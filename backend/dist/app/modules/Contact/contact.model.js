"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Contact = void 0;
const mongoose_1 = require("mongoose");
const contactSchema = new mongoose_1.Schema({
    fullName: { type: String, required: true, trim: true },
    enquiryType: { type: String, trim: true },
    company: { type: String, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, trim: true },
    country: { type: String, trim: true },
    message: { type: String, trim: true },
    consentMarketing: { type: Boolean, default: false },
    status: {
        type: String,
        enum: ['pending', 'contacted', 'resolved'],
        default: 'pending',
    },
}, { timestamps: true });
exports.Contact = (0, mongoose_1.model)('Contact', contactSchema);
