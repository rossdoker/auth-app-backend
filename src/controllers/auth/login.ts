import { Request, Response } from 'express';
import { loginService } from '@/services/auth/index.js';
import { sendLoginResponse } from '@/utils/sendLoginResponse.js';

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const { require2fa, user, accessToken, refreshToken } = await loginService({
    email,
    password,
  });

  sendLoginResponse(res, {
    otp: require2fa,
    statusCode: require2fa ? 428 : undefined,
    message: require2fa ? '2FA verification required. Code sent.' : undefined,
    accessToken,
    refreshToken,
    user,
  });
};
