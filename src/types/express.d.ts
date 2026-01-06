import { Role } from '@prisma/client';
import { Express } from 'express-serve-static-core';

declare global {
  namespace Express {
    interface Request {
      userId?: number;
      role?: Role;
    }
  }
}
