import prisma from '@/db.js';
import { AppError } from '@/exceptions/AppError.js';
import { OTP_MAX_ATTEMPTS } from '@/utils/constants.js';

const cleanup = async (userId: number) => {
  await prisma.user.update({
    where: { id: userId },
    data: {
      phoneCode: null,
      phoneCodeExpires: null,
      otpAttempts: 0,
    },
  });
};

export const verifyOtpService = async (userId: number, code: string) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { phoneCode: true, phoneCodeExpires: true, otpAttempts: true },
  });

  if (!user || !user.phoneCode) {
    throw new AppError('No OTP to validate', 400);
  }

  if (user.phoneCodeExpires && user.phoneCodeExpires < new Date()) {
    await cleanup(userId);
    throw new AppError('OTP is expired', 400);
  }

  if (user.otpAttempts >= OTP_MAX_ATTEMPTS) {
    await cleanup(userId);
    throw new AppError(
      'Too many failed attempts. Please request a new code.',
      429,
    );
  }

  if (user.phoneCode !== code) {
    const newAttempts = user.otpAttempts + 1;

    if (newAttempts >= OTP_MAX_ATTEMPTS) {
      await cleanup(userId);
      throw new AppError('Too many failed attempts. Code invalidated.', 429);
    }

    await prisma.user.update({
      where: { id: userId },
      data: { otpAttempts: { increment: 1 } },
    });

    throw new AppError(
      `Wrong OTP. ${OTP_MAX_ATTEMPTS - newAttempts} attempts left.`,
      400,
    );
  }

  await cleanup(userId);
};
