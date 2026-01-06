import jwt from 'jsonwebtoken';
import {
  ACCESS_JWT_LIFETIME_TEXT,
  JWT_ACCESS_SECRET,
  REFRESH_JWT_LIFETIME_TEXT,
  JWT_REFRESH_SECRET,
} from '@/utils/constants.js';
import { Role } from '@prisma/client';

export const generateTokens = (userId: number, role: Role) => {
  const accessToken = jwt.sign({ userId, role }, JWT_ACCESS_SECRET, {
    expiresIn: ACCESS_JWT_LIFETIME_TEXT,
  });

  const refreshToken = jwt.sign({ userId, role }, JWT_REFRESH_SECRET, {
    expiresIn: REFRESH_JWT_LIFETIME_TEXT,
  });

  return { accessToken, refreshToken };
};
