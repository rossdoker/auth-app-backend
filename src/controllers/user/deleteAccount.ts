import { AuthRequest } from '@/middleware/authenticateToken.js';
import { deleteAccountService } from '@/services/user/index.js';
import { Response, Request } from 'express';

export const deleteAccount = async (req: Request, res: Response) => {
  await deleteAccountService((req as AuthRequest).userId);

  res.json({ message: 'Account deleted successfully. Goodbye!' });
};
