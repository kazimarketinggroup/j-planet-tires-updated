import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { TUserRole } from '../modules/User/user.interface';
import { User } from '../modules/User/user.model';
import AppError from '../Errors/AppError';
import CatchAsync from '../utils/catchAsync';
import { HttpStatus } from 'http-status-ts';

const auth = (...requiredRoles: TUserRole[]) => {
  return CatchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    // Check if the token is missing
    if (!token) {
      throw new AppError(HttpStatus.UNAUTHORIZED, 'You are not authorized!');
    }

    // Verify the token
    const decoded = jwt.verify(
      token,
      config.jwt_secret as string,
    ) as JwtPayload;

    const { role, email } = decoded;

    // Check if the user exists
    const user = await User.isUserExistByEmail(email);

    if (!user) {
      throw new AppError(HttpStatus.NOT_FOUND, 'This user is not found!');
    }

    // Check if the user is blocked
    if (user.isBlocked) {
      throw new AppError(HttpStatus.FORBIDDEN, 'This user is blocked!');
    }

    // Check if the user has the required role
    if (requiredRoles.length && !requiredRoles.includes(role)) {
      throw new AppError(
        HttpStatus.FORBIDDEN,
        'You do not have access to this resource!',
      );
    }

    // Attach the user to the request object
    req.user = decoded as JwtPayload;

    // Pass control to the next middleware or route handler
    next();
  });
};

export default auth;