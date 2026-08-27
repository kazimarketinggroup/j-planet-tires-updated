import { HttpStatus } from "http-status-ts";
import config from "../../config";
import sendResponse from "../../utils/sendResponse";
import { AuthService } from "./auth.service";
import catchAsync from "../../utils/catchAsync";




const Login = catchAsync(async (req, res) => {
  const result = await AuthService.Login(req.body);

  const { accessToken, refreshToken } = result;

  res.cookie('REFRESH_TOKEN', refreshToken, {
    expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), // 90 days
    httpOnly: true,
    secure: config.node_env === 'production',
    sameSite: config.node_env === 'development' ? 'strict' : 'none',
  });

  sendResponse(res, {
    success: true,
    statusCode: HttpStatus.OK,
    message: 'Login successful',
    data: {
      token: accessToken,
    },
  });
});

const Register = catchAsync(async (req, res) => {
  const result = await AuthService.Register(req.body);

  const { accessToken, refreshToken } = result;

  res.cookie('REFRESH_TOKEN', refreshToken, {
    expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), // 90 days
    httpOnly: true,
    secure: config.node_env === 'production',
    sameSite: config.node_env === 'development' ? 'strict' : 'none',
  });

  sendResponse(res, {
    success: true,
    statusCode: HttpStatus.CREATED,
    message: 'User registered successfully',
    data: {
      token: accessToken,
    },
  });
});

const changePassword = catchAsync(async (req, res) => {
  const userId = req.user.id; // from your auth middleware
  const { currentPassword, newPassword } = req.body;

  // Call service layer to handle the logic
  await AuthService.ChangePassword(userId, currentPassword, newPassword);

  sendResponse(res, {
    success: true,
    statusCode: HttpStatus.OK,
    message: "Password updated successfully",
    data: null,
  });
});

const Logout = catchAsync(async (_req, res) => {
  res.clearCookie('REFRESH_TOKEN');

  sendResponse(res, {
    success: true,
    statusCode: HttpStatus.OK,
    message: 'Logout successful',
    data: null,
  });
});

const RefreshToken = catchAsync(async (req, res) => {
  const { REFRESH_TOKEN } = req.cookies;

  const result = await AuthService.RefreshToken(REFRESH_TOKEN);

  const { accessToken } = result;

  sendResponse(res, {
    success: true,
    statusCode: HttpStatus.OK,
    message: 'Token refreshed successfully',
    data: {
      token: accessToken,
    },
  });
});

const AuthController = {
  Login,
  Register,
  Logout,
  RefreshToken,
  changePassword
};

export default AuthController;