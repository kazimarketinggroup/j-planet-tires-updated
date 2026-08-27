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
exports.ContactServices = void 0;
const AppError_1 = __importDefault(require("../../Errors/AppError"));
const email_1 = require("../../utils/email");
const contact_model_1 = require("./contact.model");
const generateOwnerEmailTemplate = (data) => {
    const rows = (0, email_1.renderRows)([
        ['Name', data.fullName],
        ['Company', data.company],
        ['Email', data.email],
        ['Phone', data.phone],
        ['Country', data.country],
        ['Enquiry Type', data.enquiryType],
        ['Marketing Consent', data.consentMarketing ? 'Yes' : 'No'],
    ]);
    const message = data.message
        ? `<h2 style="margin:24px 0 8px;font-size:16px;">Message</h2><div style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:6px;padding:16px;">${(0, email_1.formatMultiline)(data.message)}</div>`
        : '';
    return (0, email_1.renderEmailShell)('New Contact Form Submission', `${rows}${message}`);
};
const createContactIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    if (!payload.fullName || !payload.email) {
        throw new AppError_1.default(400, 'Required fields missing');
    }
    const contact = yield contact_model_1.Contact.create(payload);
    let emailFailed = false;
    try {
        const sent = yield (0, email_1.sendOwnerNotification)({
            replyTo: payload.email,
            subject: `New J Planet enquiry - ${payload.fullName}`,
            html: generateOwnerEmailTemplate(payload),
        });
        emailFailed = !sent;
    }
    catch (_a) {
        emailFailed = true;
    }
    return { contact, emailFailed };
});
const getAllContactsFromDB = () => __awaiter(void 0, void 0, void 0, function* () { return contact_model_1.Contact.find().sort({ createdAt: -1 }); });
const getContactByIdFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const contact = yield contact_model_1.Contact.findById(id);
    if (!contact)
        throw new AppError_1.default(404, 'Not found');
    return contact;
});
const updateContactStatusInDB = (id, status) => __awaiter(void 0, void 0, void 0, function* () {
    const contact = yield contact_model_1.Contact.findByIdAndUpdate(id, { status }, { new: true });
    if (!contact)
        throw new AppError_1.default(404, 'Not found');
    return contact;
});
const deleteContactFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const contact = yield contact_model_1.Contact.findByIdAndDelete(id);
    if (!contact)
        throw new AppError_1.default(404, 'Not found');
    return contact;
});
exports.ContactServices = {
    createContactIntoDB,
    getAllContactsFromDB,
    getContactByIdFromDB,
    updateContactStatusInDB,
    deleteContactFromDB,
};
