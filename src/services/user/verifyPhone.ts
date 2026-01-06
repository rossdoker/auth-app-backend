import prisma from '@/db.js';
import { VerifyPhoneInput, verifyPhoneSchema } from '@/schemas/userSchemas.js';
import { verifyOtpService } from '@/services/otp/verify.js';

export const verifyPhoneService = async (
  id: number,
  data: VerifyPhoneInput,
) => {
  const { code } = verifyPhoneSchema.parse(data);

  await verifyOtpService(id, code);

  await prisma.user.update({
    where: { id },
    data: {
      isPhoneVerified: true,
    },
  });
};
