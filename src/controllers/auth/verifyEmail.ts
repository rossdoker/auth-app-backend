import { Request, Response } from 'express';
import { verifyEmailService } from '@/services/auth/index.js';

export const verifyEmail = async (req: Request, res: Response) => {
  const { token } = req.body;
  const result = await verifyEmailService({ token });

  res.json(result);
};
