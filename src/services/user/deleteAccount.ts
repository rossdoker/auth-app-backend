import prisma from '@/db.js';

export const deleteAccountService = async (id: number) => {
  await prisma.user.delete({
    where: { id },
  });
};
