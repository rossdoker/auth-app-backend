import prisma from '@/db.js';
import { AppError } from '@/exceptions/AppError.js';
import { verifyOtpService } from '@/services/otp/verify.js';
import { Login2FAInput, login2faSchema } from '@/schemas/authSchemas.js';
import { createTokenService } from './createToken.js';

export const login2faService = async (data: Login2FAInput) => {
  const { email, code } = login2faSchema.parse(data);

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new AppError('Invalid credentials', 401);
  }

  await verifyOtpService(user.id, code);

  const { accessToken, refreshToken } = await createTokenService({
    userId: user.id,
    role: user.role,
  });

  return {
    user,
    accessToken,
    refreshToken,
  };
};
