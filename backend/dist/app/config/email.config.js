"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailConfig = exports.createEmailTransporter = void 0;
var email_1 = require("../utils/email");
Object.defineProperty(exports, "createEmailTransporter", { enumerable: true, get: function () { return email_1.createEmailTransporter; } });
exports.emailConfig = {
    from: process.env.MAIL_FROM || process.env.MAIL_USER,
    to: process.env.MAIL_TO || 'info@jplanettire.net',
};
