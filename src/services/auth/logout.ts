import prisma from '@/db.js';
import { LogoutInput, logoutSchema } from '@/schemas/authSchemas.js';

export const logoutService = async (data: LogoutInput) => {
  const { token } = logoutSchema.parse(data);

  await prisma.refreshToken.deleteMany({
    where: { token },
  });

  return { message: 'Logout successful' };
};
