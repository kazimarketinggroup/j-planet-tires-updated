import AppError from '../../Errors/AppError';
import { formatMultiline, renderEmailShell, renderRows, sendOwnerNotification } from '../../utils/email';
import { TCreateContact } from './contact.interface';
import { Contact } from './contact.model';

const generateOwnerEmailTemplate = (data: TCreateContact): string => {
  const rows = renderRows([
    ['Name', data.fullName],
    ['Company', data.company],
    ['Email', data.email],
    ['Phone', data.phone],
    ['Country', data.country],
    ['Enquiry Type', data.enquiryType],
    ['Marketing Consent', data.consentMarketing ? 'Yes' : 'No'],
  ]);

  const message = data.message
    ? `<h2 style="margin:24px 0 8px;font-size:16px;">Message</h2><div style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:6px;padding:16px;">${formatMultiline(data.message)}</div>`
    : '';

  return renderEmailShell('New Contact Form Submission', `${rows}${message}`);
};

const createContactIntoDB = async (payload: TCreateContact) => {
  if (!payload.fullName || !payload.email) {
    throw new AppError(400, 'Required fields missing');
  }

  const contact = await Contact.create(payload);

  let emailFailed = false;
  try {
    const sent = await sendOwnerNotification({
      replyTo: payload.email,
      subject: `New J Planet enquiry - ${payload.fullName}`,
      html: generateOwnerEmailTemplate(payload),
    });
    emailFailed = !sent;
  } catch {
    emailFailed = true;
  }

  return { contact, emailFailed };
};

const getAllContactsFromDB = async () => Contact.find().sort({ createdAt: -1 });

const getContactByIdFromDB = async (id: string) => {
  const contact = await Contact.findById(id);
  if (!contact) throw new AppError(404, 'Not found');
  return contact;
};

const updateContactStatusInDB = async (id: string, status: string) => {
  const contact = await Contact.findByIdAndUpdate(id, { status }, { new: true });
  if (!contact) throw new AppError(404, 'Not found');
  return contact;
};

const deleteContactFromDB = async (id: string) => {
  const contact = await Contact.findByIdAndDelete(id);
  if (!contact) throw new AppError(404, 'Not found');
  return contact;
};

export const ContactServices = {
  createContactIntoDB,
  getAllContactsFromDB,
  getContactByIdFromDB,
  updateContactStatusInDB,
  deleteContactFromDB,
};
