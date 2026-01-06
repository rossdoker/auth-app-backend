import { Request, Response } from 'express';
import { refreshTokenService } from '@/services/auth/index.js';

export const refreshToken = async (req: Request, res: Response) => {
  const token = req.body.refreshToken;

  const result = await refreshTokenService({ token });

  res.json(result);
};
