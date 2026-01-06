import { AuthRequest } from '@/middleware/authenticateToken.js';
import { disableOtpService } from '@/services/admin/index.js';
import { Response, Request } from 'express';

export const disableOtp = async (req: Request, res: Response) => {
  const { userId, role, body } = req as AuthRequest;

  await disableOtpService(userId, role, body);

  res.json({
    message: `Users OTP disabled successfully`,
  });
};
