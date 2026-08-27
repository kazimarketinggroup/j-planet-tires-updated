// contact.routes.ts
import { Router } from 'express';
import { ContactControllers } from './contact.controller';

const router = Router();

// Public route - anyone can submit contact form
router.post('/submit', ContactControllers.createContact);

// Admin routes - require authentication
router.get('/', ContactControllers.getAllContacts);
// router.get('/:id', auth(), ContactControllers.getContactById);
// router.patch('/:id/status', auth(), ContactControllers.updateContactStatus);
// router.delete('/:id', auth(), ContactControllers.deleteContact);

export const ContactRoutes = router;
