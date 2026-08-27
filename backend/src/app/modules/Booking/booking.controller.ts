import { Request, Response } from 'express';
import { HttpStatus } from 'http-status-ts';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { BookingServices } from './booking.service';

const createBooking = catchAsync(async (req: Request, res: Response) => {
  const result = await BookingServices.createBookingIntoDB(req.body);

  sendResponse(res, {
    statusCode: HttpStatus.CREATED,
    success: true,
    message: 'Booking request submitted successfully',
    data: { id: result.booking._id, emailFailed: result.emailFailed },
  });
});

const getAllBookings = catchAsync(async (req: Request, res: Response) => {
  const result = await BookingServices.getAllBookingsFromDB();

  sendResponse(res, {
    statusCode: HttpStatus.OK,
    success: true,
    message: 'Bookings fetched',
    data: result,
  });
});

export const BookingControllers = {
  createBooking,
  getAllBookings,
};
