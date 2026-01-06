import { Request, Response } from 'express';
import { login2faService } from '@/services/auth/index.js';
import { sendLoginResponse } from '@/utils/sendLoginResponse.js';

export const login2fa = async (req: Request, res: Response) => {
  const { email, code } = req.body;

  const { accessToken, refreshToken, user } = await login2faService({
    email,
    code,
  });

  sendLoginResponse(res, {
    accessToken,
    refreshToken,
    user,
  });
};
