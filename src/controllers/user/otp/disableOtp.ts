import { AuthRequest } from '@/middleware/authenticateToken.js';
import { disableOtpService } from '@/services/user/index.js';
import { Response, Request } from 'express';

export const disableOtp = async (req: Request, res: Response) => {
  await disableOtpService((req as AuthRequest).userId);

  res.json({ message: 'Two-factor authentication disabled' });
};
