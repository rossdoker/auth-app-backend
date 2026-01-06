import bcrypt from 'bcryptjs';
import prisma from '@/db.js';
import { LoginInput, loginSchema } from '@/schemas/authSchemas.js';
import { AppError } from '@/exceptions/AppError.js';
import { sendOtpService } from '@/services/otp/send.js';
import { createTokenService } from './createToken.js';

export const loginService = async (data: LoginInput) => {
  const { email, password } = loginSchema.parse(data);

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user || !user.password)
    throw new AppError('Invalid email or password', 401);

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) throw new AppError('Invalid email or password', 401);

  if (!user.isVerified)
    throw new AppError('Please verify your email first', 403);

  if (user.isDeactivated) throw new AppError('Account is deactivated', 403);

  // Handle 2FA
  if (user.isTwoFactorEnabled) {
    if (!user.phoneNumber) {
      throw new AppError(
        '2FA is enabled but no phone number found. Contact support.',
        500,
      );
    }

    await sendOtpService(user.id, user.phoneNumber);

    return {
      require2fa: true,
      user,
      accessToken: null,
      refreshToken: null,
    };
  }

  const { accessToken, refreshToken } = await createTokenService({
    userId: user.id,
    role: user.role,
  });

  return {
    require2fa: false,
    user,
    accessToken,
    refreshToken,
  };
};
