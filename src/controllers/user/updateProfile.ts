import { AuthRequest } from '@/middleware/authenticateToken.js';
import { updateProfileService } from '@/services/user/index.js';
import { Response, Request } from 'express';

export const updateProfile = async (req: Request, res: Response) => {
  const {
    userId,
    body: { firstName, lastName, gender, birthDate },
  } = req as AuthRequest;

  const user = await updateProfileService(userId, {
    firstName,
    lastName,
    gender,
    birthDate,
  });

  res.json({
    message: 'Profile updated successfully',
    user,
  });
};
