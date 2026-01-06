import { Response } from 'express';
import { User } from '@prisma/client';

export const sendLoginResponse = (
  res: Response,
  {
    otp = false,
    statusCode = 200,
    message = 'Login successful',
    accessToken,
    refreshToken,
    user,
  }: {
    otp?: boolean;
    statusCode?: number;
    message?: string;
    accessToken: string | null;
    refreshToken: string | null;
    user: User;
  },
) => {
  res.status(statusCode).json({
    otp,
    message,
    accessToken,
    refreshToken,
    user: {
      id: user.id,
      email: user.email,
    },
  });
};
