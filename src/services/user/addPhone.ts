import prisma from '@/db.js';
import { AppError } from '@/exceptions/AppError.js';
import { AddPhoneInput, addPhoneSchema } from '@/schemas/userSchemas.js';
import { sendOtpService } from '@/services/otp/send.js';

export const addPhoneService = async (id: number, data: AddPhoneInput) => {
  const { phoneNumber } = addPhoneSchema.parse(data);

  const existingUser = await prisma.user.findUnique({
    where: { phoneNumber },
  });
  if (existingUser && existingUser.id !== id) {
    throw new AppError('Phone number already in use', 409);
  }

  await prisma.user.update({
    where: { id },
    data: {
      phoneNumber,
      isPhoneVerified: false,
      isTwoFactorEnabled: false,
    },
  });

  await sendOtpService(id, phoneNumber);
};
