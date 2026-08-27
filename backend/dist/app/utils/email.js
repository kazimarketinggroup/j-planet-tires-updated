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
exports.renderRows = exports.renderEmailShell = exports.sendOwnerNotification = exports.createEmailTransporter = exports.formatMultiline = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const htmlEscape = (value) => String(value !== null && value !== void 0 ? value : '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
const formatMultiline = (value) => htmlEscape(value).replace(/\r?\n/g, '<br>');
exports.formatMultiline = formatMultiline;
const createEmailTransporter = () => {
    const user = process.env.MAIL_USER;
    const pass = process.env.MAIL_PASS;
    if (!user || !pass) {
        return null;
    }
    return nodemailer_1.default.createTransport({
        service: process.env.MAIL_SERVICE || 'gmail',
        host: process.env.MAIL_HOST || 'smtp.gmail.com',
        port: Number(process.env.MAIL_PORT || 587),
        secure: process.env.MAIL_SECURE === 'true',
        auth: { user, pass },
    });
};
exports.createEmailTransporter = createEmailTransporter;
const sendOwnerNotification = (_a) => __awaiter(void 0, [_a], void 0, function* ({ subject, html, replyTo }) {
    const transporter = (0, exports.createEmailTransporter)();
    if (!transporter)
        return false;
    const fromName = process.env.MAIL_FROM_NAME || 'J Planet Website';
    const fromEmail = process.env.MAIL_FROM || process.env.MAIL_USER;
    const to = process.env.MAIL_TO || 'info@jplanettire.net';
    yield transporter.sendMail({
        from: `"${fromName}" <${fromEmail}>`,
        to,
        replyTo,
        subject,
        html,
    });
    return true;
});
exports.sendOwnerNotification = sendOwnerNotification;
const renderEmailShell = (title, body) => `
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${htmlEscape(title)}</title>
  </head>
  <body style="margin:0;background:#f4f6fb;color:#111827;font-family:Arial,Helvetica,sans-serif;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="padding:24px 12px;background:#f4f6fb;">
      <tr>
        <td align="center">
          <table role="presentation" width="640" cellspacing="0" cellpadding="0" style="max-width:640px;width:100%;background:#ffffff;border:1px solid #e5e7eb;border-radius:8px;overflow:hidden;">
            <tr>
              <td style="background:#1148c6;color:#ffffff;padding:24px 28px;">
                <h1 style="margin:0;font-size:22px;line-height:1.25;">${htmlEscape(title)}</h1>
              </td>
            </tr>
            <tr>
              <td style="padding:28px;font-size:14px;line-height:1.6;">
                ${body}
                <p style="margin:28px 0 0;color:#6b7280;font-size:12px;">Received ${new Date().toLocaleString('en-GB')}</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
exports.renderEmailShell = renderEmailShell;
const renderRows = (rows) => `
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;">
    ${rows
    .filter(([, value]) => value !== undefined && value !== null && String(value).trim() !== '')
    .map(([label, value]) => `
          <tr>
            <td style="width:150px;padding:10px 0;border-bottom:1px solid #e5e7eb;color:#4b5563;font-weight:700;vertical-align:top;">${htmlEscape(label)}</td>
            <td style="padding:10px 0;border-bottom:1px solid #e5e7eb;color:#111827;">${(0, exports.formatMultiline)(value)}</td>
          </tr>`)
    .join('')}
  </table>`;
exports.renderRows = renderRows;
