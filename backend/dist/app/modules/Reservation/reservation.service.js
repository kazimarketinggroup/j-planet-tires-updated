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
exports.ReservationServices = exports.verifyEmailConnection = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const nodemailer_1 = __importDefault(require("nodemailer"));
const reservation_model_1 = require("./reservation.model");
const AppError_1 = __importDefault(require("../../Errors/AppError"));
const dbConnect_1 = __importDefault(require("../../config/dbConnect"));
// ─────────────────────────────────────────────────────────────
// 📧 Email Transporter (Production Safe)
// ─────────────────────────────────────────────────────────────
const createEmailTransporter = () => {
    const user = process.env.MAIL_USER;
    const pass = process.env.MAIL_PASS;
    if (!user || !pass) {
        console.warn('[EMAIL] ❌ Missing MAIL_USER or MAIL_PASS');
        return null;
    }
    return nodemailer_1.default.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, // ✅ required for 465
        auth: {
            user,
            pass: pass.replace(/\s/g, ''), // remove accidental spaces
        },
    });
};
// ─────────────────────────────────────────────────────────────
// 🧪 Verify Email Connection (Optional)
// ─────────────────────────────────────────────────────────────
const verifyEmailConnection = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const transporter = createEmailTransporter();
        if (!transporter)
            return;
        yield transporter.verify();
        console.log('[EMAIL] ✅ SMTP connection verified');
    }
    catch (err) {
        console.error('[EMAIL] ❌ SMTP verification failed:', err.message);
    }
});
exports.verifyEmailConnection = verifyEmailConnection;
// ─────────────────────────────────────────────────────────────
// 📨 Email Template
// ─────────────────────────────────────────────────────────────
const generateOwnerEmailTemplate = (data) => {
    const { name, email, phone, guests, date, time } = data;
    return `
  <div style="font-family: 'Georgia', serif; background: #1a1a1a; padding: 32px 16px;">
    <div style="max-width: 600px; margin: auto; background: #0d0d0d; border-radius: 4px; overflow: hidden; border: 1px solid #b8860b;">

      <div style="height: 4px; background: linear-gradient(90deg, #8B6914, #D4AF37, #F5D060, #D4AF37, #8B6914);"></div>

      <!-- Header -->
      <div style="background: #0d0d0d; padding: 36px 40px 28px; text-align: center; border-bottom: 1px solid #2a2a2a;">
        <div style="display: flex; align-items: center; justify-content: center; gap: 12px; margin-bottom: 10px;">
          <div style="height: 1px; width: 40px; background: linear-gradient(to right, transparent, #D4AF37);"></div>
          <span style="font-size: 11px; letter-spacing: 4px; color: #D4AF37; text-transform: uppercase; font-family: Arial, sans-serif;">Beoley Spice &amp; Grill</span>
          <div style="height: 1px; width: 40px; background: linear-gradient(to left, transparent, #D4AF37);"></div>
        </div>
        <h1 style="margin: 0 0 6px; font-size: 28px; color: #F5D060; font-weight: normal; letter-spacing: 1px;">New Reservation</h1>
        <p style="margin: 0; font-size: 12px; color: #888; letter-spacing: 2px; text-transform: uppercase; font-family: Arial, sans-serif;">Booking Notification</p>
      </div>

      <!-- Intro -->
      <div style="background: #0d0d0d; padding: 20px 40px 24px; text-align: center;">
        <p style="margin: 0; font-size: 14px; color: #aaa; font-family: Arial, sans-serif; line-height: 1.6;">A new reservation has been submitted. Please find the guest details below.</p>
      </div>

      <!-- Details Card -->
      <div style="background: #111; margin: 0 32px 24px; border-radius: 2px; border: 1px solid #2c2c2c; overflow: hidden;">
        <div style="background: #1a1408; padding: 12px 24px; border-bottom: 1px solid #2c2c2c;">
          <span style="font-size: 10px; letter-spacing: 3px; color: #D4AF37; text-transform: uppercase; font-family: Arial, sans-serif;">Guest Information</span>
        </div>
        <table style="width: 100%; border-collapse: collapse;">
          <tr style="border-bottom: 1px solid #1e1e1e;">
            <td style="padding: 14px 24px; width: 40%; font-size: 11px; letter-spacing: 2px; color: #888; text-transform: uppercase; font-family: Arial, sans-serif;">Name</td>
            <td style="padding: 14px 24px; font-size: 15px; color: #F0E0A0; font-family: Georgia, serif;">${name}</td>
          </tr>
          <tr style="border-bottom: 1px solid #1e1e1e; background: #0f0f0f;">
            <td style="padding: 14px 24px; font-size: 11px; letter-spacing: 2px; color: #888; text-transform: uppercase; font-family: Arial, sans-serif;">Email</td>
            <td style="padding: 14px 24px; font-size: 14px; color: #D4AF37; font-family: Arial, sans-serif;">${email}</td>
          </tr>
          <tr style="border-bottom: 1px solid #1e1e1e;">
            <td style="padding: 14px 24px; font-size: 11px; letter-spacing: 2px; color: #888; text-transform: uppercase; font-family: Arial, sans-serif;">Phone</td>
            <td style="padding: 14px 24px; font-size: 14px; color: #F0E0A0; font-family: Arial, sans-serif;">${phone}</td>
          </tr>
          <tr style="border-bottom: 1px solid #1e1e1e; background: #0f0f0f;">
            <td style="padding: 14px 24px; font-size: 11px; letter-spacing: 2px; color: #888; text-transform: uppercase; font-family: Arial, sans-serif;">Guests</td>
            <td style="padding: 14px 24px; font-family: Arial, sans-serif;">
              <span style="background: #1a1408; border: 1px solid #8B6914; color: #D4AF37; font-size: 13px; padding: 3px 12px; border-radius: 20px; display: inline-block;">${guests} Guests</span>
            </td>
          </tr>
          <tr>
            <td style="padding: 14px 24px; width: 50%; border-right: 1px solid #1e1e1e;">
              <div style="font-size: 11px; letter-spacing: 2px; color: #888; text-transform: uppercase; font-family: Arial, sans-serif; margin-bottom: 6px;">Date</div>
              <div style="font-size: 15px; color: #F0E0A0; font-family: Georgia, serif;">${date}</div>
            </td>
            <td style="padding: 14px 24px; background: #0f0f0f;">
              <div style="font-size: 11px; letter-spacing: 2px; color: #888; text-transform: uppercase; font-family: Arial, sans-serif; margin-bottom: 6px;">Time</div>
              <div style="font-size: 15px; color: #F0E0A0; font-family: Georgia, serif;">${time}</div>
            </td>
          </tr>
        </table>
      </div>

      <!-- Timestamp -->
      <div style="margin: 0 32px 32px; padding: 14px 24px; border: 1px solid #1e1e1e; border-radius: 2px;">
        <span style="font-size: 12px; color: #666; font-family: Arial, sans-serif;">Received: <span style="color: #888;">${new Date().toLocaleString()}</span></span>
      </div>

      <!-- Footer -->
      <div style="background: #080808; padding: 20px 40px; text-align: center; border-top: 1px solid #1e1e1e;">
        <p style="margin: 0 0 4px; font-size: 10px; letter-spacing: 3px; text-transform: uppercase; color: #D4AF37; font-family: Arial, sans-serif;">Beoley Spice &amp; Grill</p>
        <p style="margin: 0; font-size: 11px; color: #444; font-family: Arial, sans-serif;">Reservation Management System</p>
      </div>

      <div style="height: 4px; background: linear-gradient(90deg, #8B6914, #D4AF37, #F5D060, #D4AF37, #8B6914);"></div>
    </div>
  </div>
  `;
};
// ─────────────────────────────────────────────────────────────
// 🚀 Send Email Helper (IMPORTANT)
// ─────────────────────────────────────────────────────────────
const sendReservationEmail = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const transporter = createEmailTransporter();
    if (!transporter)
        return;
    try {
        const ownerEmail = process.env.OWNER_EMAIL || process.env.MAIL_USER;
        const info = yield transporter.sendMail({
            from: `"Beoley Reservations" <${process.env.MAIL_USER}>`,
            to: ownerEmail,
            subject: `New Reservation – ${payload.name}`,
            html: generateOwnerEmailTemplate(payload),
        });
        console.log('[EMAIL] ✅ Sent:', info.messageId);
    }
    catch (err) {
        console.error('[EMAIL ERROR]');
        console.error('Code:', err.code);
        console.error('Message:', err.message);
        console.error('Response:', err.response);
    }
});
// ─────────────────────────────────────────────────────────────
// 🧾 CRUD OPERATIONS
// ─────────────────────────────────────────────────────────────
const createReservationIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, dbConnect_1.default)();
    const reservation = yield reservation_model_1.Reservation.create(payload);
    // 🔥 IMPORTANT: await to ensure execution in Vercel
    yield sendReservationEmail(payload);
    return reservation;
});
const getAllReservationsFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, dbConnect_1.default)();
    return reservation_model_1.Reservation.find().sort({ createdAt: -1 });
});
const getReservationByIdFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, dbConnect_1.default)();
    const reservation = yield reservation_model_1.Reservation.findById(id);
    if (!reservation)
        throw new AppError_1.default(404, 'Reservation not found');
    return reservation;
});
const updateReservationStatusInDB = (id, status) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, dbConnect_1.default)();
    const reservation = yield reservation_model_1.Reservation.findByIdAndUpdate(id, { status }, { new: true });
    if (!reservation)
        throw new AppError_1.default(404, 'Reservation not found');
    return reservation;
});
const deleteReservationFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, dbConnect_1.default)();
    const reservation = yield reservation_model_1.Reservation.findByIdAndDelete(id);
    if (!reservation)
        throw new AppError_1.default(404, 'Reservation not found');
    return reservation;
});
// ─────────────────────────────────────────────────────────────
exports.ReservationServices = {
    createReservationIntoDB,
    getAllReservationsFromDB,
    getReservationByIdFromDB,
    updateReservationStatusInDB,
    deleteReservationFromDB,
};
