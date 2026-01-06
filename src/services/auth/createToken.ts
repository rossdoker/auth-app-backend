import prisma from '@/db.js';
import { CreateTokenInput, createTokenSchema } from '@/schemas/authSchemas.js';
import { REFRESH_JWT_LIFETIME } from '@/utils/constants.js';
import { generateTokens } from '@/utils/jwt.js';

export const createTokenService = async (data: CreateTokenInput) => {
  const { userId, role } = createTokenSchema.parse(data);
  const { accessToken, refreshToken } = generateTokens(userId, role);

  await prisma.refreshToken.create({
    data: {
      token: refreshToken,
      userId,
      expiresAt: new Date(Date.now() + REFRESH_JWT_LIFETIME),
    },
  });

  return {
    userId,
    accessToken,
    refreshToken,
  };
};
