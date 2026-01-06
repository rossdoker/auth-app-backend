import bcrypt from 'bcryptjs';
import prisma from '@/db.js';
import { AppError } from '@/exceptions/AppError.js';
import {
  ChangePasswordInput,
  changePasswordSchema,
} from '@/schemas/userSchemas.js';

export const changePasswordService = async (
  id: number,
  data: ChangePasswordInput,
) => {
  const { password } = changePasswordSchema.parse(data);

  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) throw new AppError('User not found', 404);

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.update({
    where: { id },
    data: { password: hashedPassword },
  });

  return `Password updated successfully`;
};
