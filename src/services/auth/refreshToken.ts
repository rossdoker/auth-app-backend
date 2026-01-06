import jwt from 'jsonwebtoken';
import prisma from '@/db.js';
import { generateTokens } from '@/utils/jwt.js';
import { AppError } from '@/exceptions/AppError.js';
import { REFRESH_JWT_LIFETIME, JWT_REFRESH_SECRET } from '@/utils/constants.js';
import { Role } from '@prisma/client';
import {
  RefreshTokenInput,
  refreshTokenSchema,
} from '@/schemas/authSchemas.js';

export const refreshTokenService = async (data: RefreshTokenInput) => {
  const { token } = refreshTokenSchema.parse(data);

  const { userId, role } = jwt.verify(token, JWT_REFRESH_SECRET) as {
    userId: number;
    role: Role;
  };

  const savedToken = await prisma.refreshToken.findUnique({
    where: { token },
  });

  if (!savedToken || savedToken.userId !== userId) {
    throw new AppError('Token has been revoked', 403);
  }

  if (savedToken.expiresAt < new Date()) {
    await prisma.refreshToken.delete({ where: { id: savedToken.id } });
    throw new AppError('Token expired', 403);
  }

  await prisma.refreshToken.delete({ where: { id: savedToken.id } });

  const newTokens = generateTokens(userId, role);

  await prisma.refreshToken.create({
    data: {
      token: newTokens.refreshToken,
      userId: userId,
      expiresAt: new Date(Date.now() + REFRESH_JWT_LIFETIME),
    },
  });

  return {
    accessToken: newTokens.accessToken,
    refreshToken: newTokens.refreshToken,
  };
};
