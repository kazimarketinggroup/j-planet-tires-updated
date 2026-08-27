import { HttpStatus } from 'http-status-ts';
import { TLoginUser, TRegisterUser } from './auth.interface';
import { User } from '../User/user.model';
import AppError from '../../Errors/AppError';
import AuthUtils from './auth.utils';
import config from '../../config';
import { JwtPayload } from 'jsonwebtoken';

import bcrypt from "bcrypt";



const Login = async (payload: TLoginUser) => {
  const user = await User.isUserExistByEmail(payload.email);

  if (!user) {
    throw new AppError(HttpStatus.NOT_FOUND, 'No user found with this email');
  }

  if (user.isBlocked) {
    throw new AppError(HttpStatus.FORBIDDEN, 'User is blocked');
  }

  const isPasswordMatched = await User.isPasswordMatched(
    payload.password,
    user.password,
  );




  if (!isPasswordMatched) {
    throw new AppError(HttpStatus.UNAUTHORIZED, 'Invalid password');
  }

  if (!user._id) {
    throw new AppError(HttpStatus.INTERNAL_SERVER_ERROR, 'User ID is missing');
  }

  const jwtPayload = {
    id: user._id.toString(),
    email: user.email,
    role: user.role,
  };

  const accessToken = AuthUtils.CreateToken(
    jwtPayload,
    config.jwt_secret as string,
    config.jwt_access_token_expires_in as string,
  );

  const refreshToken = AuthUtils.CreateToken(
    jwtPayload,
    config.jwt_refresh_token_secret as string,
    config.jwt_refresh_token_expires_in as string,
  );

  return { accessToken, refreshToken };
};


const Register = async (payload: TRegisterUser) => {
  const existingUser = await User.isUserExistByEmail(payload.email);

  if (existingUser) {
    throw new AppError(HttpStatus.CONFLICT, 'User already exists');
  }

  const user = await User.create(payload);

  if (!user._id) {
    throw new AppError(HttpStatus.INTERNAL_SERVER_ERROR, 'User ID is missing after registration');
  }

  const jwtPayload = {
    id: user._id.toString(),
    email: user.email,
    role: user.role,
  };

  const accessToken = AuthUtils.CreateToken(
    jwtPayload,
    config.jwt_secret as string,
    config.jwt_access_token_expires_in as string,
  );

  const refreshToken = AuthUtils.CreateToken(
    jwtPayload,
    config.jwt_refresh_token_secret as string,
    config.jwt_refresh_token_expires_in as string,
  );

  return { accessToken, refreshToken };
};




const ChangePassword = async (
  userId: string,
  currentPassword: string,
  newPassword: string,
) => {
  // 1️⃣ Fetch user with password
  const user = await User.findById(userId).select('+password');
  if (!user) {
    throw new AppError(HttpStatus.NOT_FOUND, 'User not found');
  }

  // 2️⃣ Compare current password
  const isMatch = await bcrypt.compare(currentPassword, user.password);
  if (!isMatch) {
    throw new AppError(HttpStatus.BAD_REQUEST, 'Current password is incorrect');
  }

  // 3️⃣ Optional: Validate new password
  if (newPassword.length < 8) {
    throw new AppError(
      HttpStatus.BAD_REQUEST,
      'New password must be at least 8 characters',
    );
  }

  // 4️⃣ ✅ Assign new password directly (model pre-save hook will hash it)
  user.password = newPassword;
  await user.save();

  // 5️⃣ Return success message
  return { message: 'Password updated successfully' };
};


const RefreshToken = async (token: string) => {
  let decoded: JwtPayload;

  try {
    decoded = AuthUtils.VerifyToken(
      token,
      config.jwt_refresh_token_secret as string,
    ) as JwtPayload;
  } catch {
    throw new AppError(HttpStatus.UNAUTHORIZED, 'Invalid refresh token');
  }

  const user = await User.findOne({ _id: decoded.id, isBlocked: false });

  if (!user) {
    throw new AppError(HttpStatus.NOT_FOUND, 'User not found or blocked');
  }

  const jwtPayload = {
    id: user._id.toString(),
    email: user.email,
    role: user.role,
  };

  const accessToken = AuthUtils.CreateToken(
    jwtPayload,
    config.jwt_secret as string,
    config.jwt_access_token_expires_in as string,
  );

 
  const newRefreshToken = AuthUtils.CreateToken(
    jwtPayload,
    config.jwt_refresh_token_secret as string,
    config.jwt_refresh_token_expires_in as string,
  );

  return { accessToken, newRefreshToken };
};

export const AuthService = { Login, Register, RefreshToken,ChangePassword };


