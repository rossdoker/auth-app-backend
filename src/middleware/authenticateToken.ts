import { Response, NextFunction, Request } from 'express';
import { Role } from '@prisma/client';
import { authenticateTokenService } from '@/services/auth/index.js';

export interface AuthRequest extends Request {
  userId: number;
  role: Role;
}

// Middleware to authenticate JWT token and attach user id and role to the request
// Throws AppError if token is missing or invalid
export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { userId, role } = authenticateTokenService(
    req.headers['authorization'],
  );

  req.userId = userId;
  req.role = role;

  next();
};
