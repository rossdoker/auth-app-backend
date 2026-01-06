import { AppError } from '@/exceptions/AppError.js';
import { Response, NextFunction, Request } from 'express';
import { AuthRequest } from './authenticateToken.js';
import { Role } from '@prisma/client';

// Middleware to require specific user roles to access a route
// Throws AppError if the user's role is not in the allowedRoles array
export const requireRole = (...allowedRoles: Role[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    if (!allowedRoles.includes((req as AuthRequest).role)) {
      return next(
        new AppError('You do not have permission to perform this action', 403),
      );
    }

    next();
  };
};
