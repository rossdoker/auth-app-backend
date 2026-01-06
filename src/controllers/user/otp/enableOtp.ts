import { AuthRequest } from '@/middleware/authenticateToken.js';
import { enableOtpService } from '@/services/user/index.js';
import { Response, Request } from 'express';

export const enableOtp = async (req: Request, res: Response) => {
  await enableOtpService((req as AuthRequest).userId);

  res.json({ message: 'Verification code sent to your phone' });
};
