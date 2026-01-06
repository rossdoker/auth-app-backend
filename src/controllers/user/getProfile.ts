import { AuthRequest } from '@/middleware/authenticateToken.js';
import { getProfileService } from '@/services/user/index.js';
import { Response, Request } from 'express';

export const getProfile = async (req: Request, res: Response) => {
  const user = await getProfileService((req as AuthRequest).userId);

  res.json({ user });
};
