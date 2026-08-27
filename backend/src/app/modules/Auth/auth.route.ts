import express from 'express';
import AuthController from './auth.controller';
import auth from '../../middlewares/auth';




const router = express.Router();

router.post(
  '/login',

  AuthController.Login,
);

router.post(
  '/register',
//   (AuthValidation.RegisterSchema),
  AuthController.Register,
);

router.post("/change-password",auth(), AuthController.changePassword);

router.post('/logout', AuthController.Logout);

router.post('/refresh-token', AuthController.RefreshToken);

export const AuthRoutes = router;