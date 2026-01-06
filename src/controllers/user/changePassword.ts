import { Response, Request } from 'express';
import { AuthRequest } from '@/middleware/authenticateToken.js';
import { changePasswordService } from '@/services/user/index.js';

export const changePassword = async (req: Request, res: Response) => {
  const {
    userId,
    body: { password },
  } = req as AuthRequest;

  const message = await changePasswordService(userId, {
    password,
  });

  res.json({
    message,
  });
};
