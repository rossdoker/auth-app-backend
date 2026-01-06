import jwt from 'jsonwebtoken';
import { AppError } from '@/exceptions/AppError.js';
import { JWT_ACCESS_SECRET } from '@/utils/constants.js';
import { Role } from '@prisma/client';

export const authenticateTokenService = (
  authorizationHeader: string | undefined,
) => {
  const token = authorizationHeader && authorizationHeader.split(' ')[1];

  if (!token) throw new AppError('Access token missing', 401);

  const { userId, role } = jwt.verify(token, JWT_ACCESS_SECRET) as {
    userId: number;
    role: Role;
  };

  return { userId, role };
};
