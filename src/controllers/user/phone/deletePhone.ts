import { AuthRequest } from '@/middleware/authenticateToken.js';
import { deletePhoneService } from '@/services/user/index.js';
import { Response, Request } from 'express';

export const deletePhone = async (req: Request, res: Response) => {
  await deletePhoneService((req as AuthRequest).userId);

  res.json({ message: 'Phone number was successfully deleted' });
};
