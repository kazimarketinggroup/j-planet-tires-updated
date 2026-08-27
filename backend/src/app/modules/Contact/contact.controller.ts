import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { HttpStatus } from 'http-status-ts';
import { ContactServices } from './contact.service';

const createContact = catchAsync(async (req: Request, res: Response) => {
  const result = await ContactServices.createContactIntoDB(req.body);

  sendResponse(res, {
    statusCode: HttpStatus.CREATED,
    success: true,
    message: 'Enquiry submitted successfully',
    data: { id: result.contact._id, emailFailed: result.emailFailed },
  });
});

// Admin endpoints (same as before)
const getAllContacts = catchAsync(async (req: Request, res: Response) => {
  const result = await ContactServices.getAllContactsFromDB();
  sendResponse(res, {
    statusCode: HttpStatus.OK,
    success: true,
    message: 'Contacts fetched',
    data: result,
  });
});

// ... getById, updateStatus, delete ... (copy from previous versions)

export const ContactControllers = {
  createContact,
  getAllContacts,
  // getContactById,
  // updateContactStatus,
  // deleteContact,
};
