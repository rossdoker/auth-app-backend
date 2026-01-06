import prisma from '@/db.js';
import { verifyOtpService } from '@/services/otp/verify.js';
import { VerifyPhoneInput, verifyPhoneSchema } from '@/schemas/userSchemas.js';

export const verifyEnableOtpService = async (
  id: number,
  data: VerifyPhoneInput,
) => {
  const { code } = verifyPhoneSchema.parse(data);

  await verifyOtpService(id, code);

  await prisma.user.update({
    where: { id },
    data: { isTwoFactorEnabled: true },
  });
};
