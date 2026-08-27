import { Router } from 'express';
import { AuthRoutes } from '../modules/Auth/auth.route';
import { BookingRoutes } from '../modules/Booking/booking.route';
import { ContactRoutes } from '../modules/Contact/contact.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/contact',
    route: ContactRoutes,
  },
  {
    path: '/bookings',
    route: BookingRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
