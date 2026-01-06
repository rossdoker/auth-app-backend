import { AuthRequest } from '@/middleware/authenticateToken.js';
import { deleteUserService } from '@/services/admin/index.js';
import { Response, Request } from 'express';

export const deleteUser = async (req: Request, res: Response) => {
  const { userId, body } = req as AuthRequest;

  await deleteUserService(userId, body);

  res.json({ message: 'Account deleted successfully' });
};
