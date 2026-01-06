import prisma from '@/db.js';
import { AppError } from '@/exceptions/AppError.js';
import { verifyOtpService } from '@/services/otp/verify.js';

export const authenticateOtpService = async (
  id: number,
  code: string | undefined,
) => {
  const user = await prisma.user.findUnique({
    where: { id },
    select: { isTwoFactorEnabled: true },
  });

  if (!user?.isTwoFactorEnabled) return;

  if (!code)
    throw new AppError(
      '2FA code required in headers (x-otp-code)',
      428,
      'OTP_REQUIRED',
    );

  await verifyOtpService(id, code);
};
