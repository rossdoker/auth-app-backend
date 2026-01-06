import { Request, Response } from 'express';
import { googleLoginService } from '@/services/auth/index.js';
import { sendLoginResponse } from '@/utils/sendLoginResponse.js';

export const googleLogin = async (req: Request, res: Response) => {
  const { accessToken: googleAccessToken } = req.body;

  const { user, accessToken, refreshToken } = await googleLoginService({
    accessToken: googleAccessToken,
  });

  sendLoginResponse(res, {
    accessToken,
    refreshToken,
    user,
  });
};
