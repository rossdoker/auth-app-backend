import { Response, Request, NextFunction } from 'express';
import { AuthRequest } from './authenticateToken.js';
import { authenticateOtpService } from '@/services/user/index.js';

// Middleware to require OTP verification if 2FA is enabled for the user
// Throws AppError if OTP code is missing or invalid
// Skips OTP verification if 2FA is not enabled
// Expects OTP code in 'x-otp-code' header
export const requireOtp = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  await authenticateOtpService(
    (req as AuthRequest).userId,
    req.headers['x-otp-code'] as string | undefined,
  );

  next();
};
