import prisma from '@/db.js';
import { AppError } from '@/exceptions/AppError.js';
import { sendOtpService } from '@/services/otp/send.js';

export const enableOtpService = async (id: number) => {
  const user = await prisma.user.findUnique({
    where: { id },
    select: {
      phoneNumber: true,
      isPhoneVerified: true,
      isTwoFactorEnabled: true,
    },
  });

  if (!user || !user.phoneNumber)
    throw new AppError('You must add a phone number first', 400);

  if (user.isTwoFactorEnabled)
    throw new AppError('Two-factor authentication is already enabled', 400);

  if (!user.isPhoneVerified)
    throw new AppError(
      'Please verify your phone number first in settings',
      400,
    );

  await sendOtpService(id, user.phoneNumber);
};
