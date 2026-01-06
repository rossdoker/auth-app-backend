import { AuthRequest } from '@/middleware/authenticateToken.js';
import { sendOtpToUserService } from '@/services/user/index.js';
import { Response, Request } from 'express';

export const sendOtpToUser = async (req: Request, res: Response) => {
  await sendOtpToUserService((req as AuthRequest).userId);

  res.json({ message: 'Confirmation code sent' });
};
