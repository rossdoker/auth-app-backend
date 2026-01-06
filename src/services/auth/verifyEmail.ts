import prisma from '@/db.js';
import { VerifyEmailInput, verifyEmailSchema } from '@/schemas/authSchemas.js';
import { AppError } from '@/exceptions/AppError.js';

export const verifyEmailService = async (data: VerifyEmailInput) => {
  const { token } = verifyEmailSchema.parse(data);

  const user = await prisma.user.findFirst({
    where: { verificationToken: token },
  });

  if (!user) {
    throw new AppError('Invalid verification token', 400);
  }

  await prisma.user.update({
    where: { id: user.id },
    data: {
      isVerified: true,
      verificationToken: null,
    },
  });

  return { message: 'Email verified successfully' };
};
