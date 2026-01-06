import prisma from '@/db.js';

export const disableOtpService = async (id: number) => {
  await prisma.user.update({
    where: { id },
    data: { isTwoFactorEnabled: false },
  });
};
