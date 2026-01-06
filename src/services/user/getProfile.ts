import prisma from '@/db.js';
import { AppError } from '@/exceptions/AppError.js';
import { userResponseSelect } from '@/utils/constants.js';

export const getProfileService = async (id: number) => {
  const user = await prisma.user.findUnique({
    where: { id },
    select: userResponseSelect,
  });

  if (!user) {
    throw new AppError('User not found', 404);
  }

  return user;
};
