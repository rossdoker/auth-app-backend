import prisma from '@/db.js';
import { AppError } from '@/exceptions/AppError.js';
import { sendOtpService } from '@/services/otp/send.js';

export const sendOtpToUserService = async (id: number) => {
  const user = await prisma.user.findUnique({
    where: { id },
    select: { phoneNumber: true, isPhoneVerified: true },
  });

  if (!user || !user.phoneNumber)
    throw new AppError('No phone number linked to this account', 400);

  if (!user.isPhoneVerified)
    throw new AppError('Phone number is not verified', 400);

  await sendOtpService(id, user.phoneNumber);
};
