import { Request, Response } from 'express';
import { forgotPasswordService } from '@/services/auth/index.js';

export const forgotPassword = async (req: Request, res: Response) => {
  const { email } = req.body;

  await forgotPasswordService({ email });

  res.json({ message: 'Reset email sent' });
};
