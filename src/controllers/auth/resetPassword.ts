import { Request, Response } from 'express';
import { resetPasswordService } from '@/services/auth/index.js';

export const resetPassword = async (req: Request, res: Response) => {
  const { token, newPassword } = req.body;
  const result = await resetPasswordService({
    token,
    newPassword,
  });

  res.json(result);
};
