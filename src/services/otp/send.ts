import crypto from 'crypto';
import prisma from '@/db.js';
import { AppError } from '@/exceptions/AppError.js';
import {
  OTP_LIFETIME,
  OTP_LIFETIME_TEXT,
  OTP_RESEND_COOLDOWN,
} from '@/utils/constants.js';

export const sendOtpService = async (userId: number, phoneNumber: string) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { phoneCodeExpires: true },
  });

  if (user?.phoneCodeExpires) {
    const now = Date.now();
    const expiresAt = new Date(user.phoneCodeExpires).getTime();
    const createdAt = expiresAt - OTP_LIFETIME;
    const timeSinceCreation = now - createdAt;

    if (timeSinceCreation < OTP_RESEND_COOLDOWN) {
      const waitSeconds = Math.ceil(
        (OTP_RESEND_COOLDOWN - timeSinceCreation) / 1000,
      );
      throw new AppError(
        `OTP generation error: New code can be generated in ${waitSeconds}s`,
        429,
      );
    }
  }

  const code = crypto.randomInt(100000, 999999).toString();
  const expiresAt = new Date(Date.now() + OTP_LIFETIME);

  await prisma.user.update({
    where: { id: userId },
    data: {
      phoneCode: code,
      phoneCodeExpires: expiresAt,
      otpAttempts: 0,
    },
  });

  console.log('=================================');
  console.log(`📱 OTP SERVICE: SMS to ${phoneNumber}`);
  console.log(`🔑 CODE: ${code}`);
  console.log(`⏳ VALID FOR: ${OTP_LIFETIME_TEXT}`);
  console.log('=================================');
};
