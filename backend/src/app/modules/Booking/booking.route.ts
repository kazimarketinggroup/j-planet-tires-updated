import { Router } from 'express';
import { BookingControllers } from './booking.controller';

const router = Router();

router.post('/submit', BookingControllers.createBooking);
router.get('/', BookingControllers.getAllBookings);

export const BookingRoutes = router;
