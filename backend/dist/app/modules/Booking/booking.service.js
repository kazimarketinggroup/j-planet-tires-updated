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
exports.BookingServices = void 0;
const AppError_1 = __importDefault(require("../../Errors/AppError"));
const email_1 = require("../../utils/email");
const booking_model_1 = require("./booking.model");
const normalizeQuantity = (value) => {
    const quantity = Number(value);
    return Number.isFinite(quantity) ? Math.max(0, Math.floor(quantity)) : 0;
};
const generateOwnerEmailTemplate = (data) => {
    const rows = (0, email_1.renderRows)([
        ['Tire', data.tireName],
        ['Total Quantity', data.totalQuantity],
        ['Name', data.fullName],
        ['Company', data.company],
        ['Email', data.email],
        ['Phone', data.phone],
        ['Country', data.country],
        ['Role', data.role],
    ]);
    const items = data.items
        .map((item) => `
        <tr>
          <td style="padding:9px 0;border-bottom:1px solid #e5e7eb;">${(0, email_1.formatMultiline)(item.size)}</td>
          <td style="padding:9px 0;border-bottom:1px solid #e5e7eb;text-align:right;font-weight:700;">${item.quantity}</td>
        </tr>`)
        .join('');
    const itemTable = `
    <h2 style="margin:24px 0 8px;font-size:16px;">Requested Sizes</h2>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;">
      ${items}
    </table>`;
    const notes = data.notes
        ? `<h2 style="margin:24px 0 8px;font-size:16px;">Notes</h2><div style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:6px;padding:16px;">${(0, email_1.formatMultiline)(data.notes)}</div>`
        : '';
    return (0, email_1.renderEmailShell)('New Tire Booking Request', `${rows}${itemTable}${notes}`);
};
const createBookingIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    if (!payload.fullName || !payload.email || !payload.tireName) {
        throw new AppError_1.default(400, 'Required fields missing');
    }
    const items = ((_a = payload.items) !== null && _a !== void 0 ? _a : [])
        .map((item) => (Object.assign(Object.assign({}, item), { quantity: normalizeQuantity(item.quantity) })))
        .filter((item) => item.size && item.quantity > 0);
    if (!items.length) {
        throw new AppError_1.default(400, 'At least one tire size is required');
    }
    const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
    const bookingPayload = Object.assign(Object.assign({}, payload), { items, totalQuantity });
    const booking = yield booking_model_1.Booking.create(bookingPayload);
    let emailFailed = false;
    try {
        const sent = yield (0, email_1.sendOwnerNotification)({
            replyTo: payload.email,
            subject: `New tire booking - ${payload.tireName} - ${payload.fullName}`,
            html: generateOwnerEmailTemplate(bookingPayload),
        });
        emailFailed = !sent;
    }
    catch (_b) {
        emailFailed = true;
    }
    return { booking, emailFailed };
});
const getAllBookingsFromDB = () => __awaiter(void 0, void 0, void 0, function* () { return booking_model_1.Booking.find().sort({ createdAt: -1 }); });
exports.BookingServices = {
    createBookingIntoDB,
    getAllBookingsFromDB,
};
