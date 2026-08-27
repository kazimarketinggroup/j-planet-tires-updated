"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactRoutes = void 0;
// contact.routes.ts
const express_1 = require("express");
const contact_controller_1 = require("./contact.controller");
const router = (0, express_1.Router)();
// Public route - anyone can submit contact form
router.post('/submit', contact_controller_1.ContactControllers.createContact);
// Admin routes - require authentication
router.get('/', contact_controller_1.ContactControllers.getAllContacts);
// router.get('/:id', auth(), ContactControllers.getContactById);
// router.patch('/:id/status', auth(), ContactControllers.updateContactStatus);
// router.delete('/:id', auth(), ContactControllers.deleteContact);
exports.ContactRoutes = router;
