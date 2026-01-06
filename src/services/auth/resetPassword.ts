import prisma from '@/db.js';
import bcrypt from 'bcryptjs';
import { AppError } from '@/exceptions/AppError.js';
import {
  ResetPasswordInput,
  resetPasswordSchema,
} from '@/schemas/authSchemas.js';

export const resetPasswordService = async (data: ResetPasswordInput) => {
  const { token, newPassword } = resetPasswordSchema.parse(data);

  const user = await prisma.user.findFirst({
    where: {
      resetPasswordToken: token,
      resetPasswordExpires: { gt: new Date() },
    },
  });

  if (!user) {
    throw new AppError('Invalid or expired token', 400);
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  await prisma.user.update({
    where: { id: user.id },
    data: {
      password: hashedPassword,
      resetPasswordToken: null,
      resetPasswordExpires: null,
    },
  });

  return { message: 'Password has been reset successfully' };
};
