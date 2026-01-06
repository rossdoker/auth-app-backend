import { AuthRequest } from '@/middleware/authenticateToken.js';
import { GetUsersInput } from '@/schemas/adminSchemas.js';
import { getUsersService } from '@/services/admin/index.js';
import { Response, Request } from 'express';

export const getUsers = async (req: Request, res: Response) => {
  const { userId, query } = req as AuthRequest;

  const users = await getUsersService(
    userId,
    query as unknown as GetUsersInput,
  );

  res.json({ users });
};
