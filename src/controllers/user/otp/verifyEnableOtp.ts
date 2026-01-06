import { AuthRequest } from '@/middleware/authenticateToken.js';
import { verifyEnableOtpService } from '@/services/user/index.js';
import { Response, Request } from 'express';

export const verifyEnableOtp = async (req: Request, res: Response) => {
  const {
    userId,
    body: { code },
  } = req as AuthRequest;

  await verifyEnableOtpService(userId, { code });

  res.json({ message: 'Two-factor authentication enabled successfully' });
};
