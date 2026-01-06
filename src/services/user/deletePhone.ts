import prisma from '@/db.js';

export const deletePhoneService = async (id: number) => {
  await prisma.user.update({
    where: { id },
    data: {
      phoneNumber: null,
      isPhoneVerified: false,
      isTwoFactorEnabled: false,
      phoneCode: null,
      phoneCodeExpires: null,
    },
  });
};
