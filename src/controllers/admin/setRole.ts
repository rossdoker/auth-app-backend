import { AuthRequest } from '@/middleware/authenticateToken.js';
import { setRoleService } from '@/services/admin/index.js';
import { Response, Request } from 'express';

export const setRole = async (req: Request, res: Response) => {
  const { userId, body } = req as AuthRequest;

  await setRoleService(userId, body);

  res.json({ message: 'Role updated successfully' });
};
