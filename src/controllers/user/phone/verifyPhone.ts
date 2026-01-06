import { AuthRequest } from '@/middleware/authenticateToken.js';
import { verifyPhoneService } from '@/services/user/index.js';
import { Response, Request } from 'express';

export const verifyPhone = async (req: Request, res: Response) => {
  const {
    userId,
    body: { code },
  } = req as AuthRequest;

  await verifyPhoneService(userId, { code });

  res.json({ message: 'Phone number successfully verified' });
};
