import { Request, Response } from 'express';
import { logoutService } from '@/services/auth/index.js';

export const logout = async (req: Request, res: Response) => {
  const { token } = req.body;
  const result = await logoutService({ token });

  res.status(200).json(result);
};
