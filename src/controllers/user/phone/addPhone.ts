import { AuthRequest } from '@/middleware/authenticateToken.js';
import { addPhoneService } from '@/services/user/index.js';
import { Response, Request } from 'express';

export const addPhone = async (req: Request, res: Response) => {
  const {
    userId,
    body: { phoneNumber },
  } = req as AuthRequest;

  await addPhoneService(userId, { phoneNumber });

  res.json({ message: 'OTP sent' });
};
