import { AuthRequest } from '@/middleware/authenticateToken.js';
import { setDeactivityService } from '@/services/admin/index.js';
import { Response, Request } from 'express';

export const setDeactivity = async (req: Request, res: Response) => {
  const { userId, role, body } = req as AuthRequest;

  const { isDeactivated } = await setDeactivityService(userId, role, body);

  res.json({
    message: `Users ${isDeactivated ? 'deactivated' : 'activated'} successfully`,
  });
};
