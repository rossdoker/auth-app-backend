import { AuthRequest } from '@/middleware/authenticateToken.js';
import { verifyEmailService } from '@/services/admin/index.js';
import { Response, Request } from 'express';

export const verifyEmail = async (req: Request, res: Response) => {
  const { userId, role, body } = req as AuthRequest;

  await verifyEmailService(userId, role, body);

  res.json({
    message: `Users email verified successfully`,
  });
};
