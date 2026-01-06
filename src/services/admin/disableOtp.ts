import prisma from '@/db.js';
import { AppError } from '@/exceptions/AppError.js';
import { Role } from '@prisma/client';
import { UsersArrayInput, usersArraySchema } from '@/schemas/adminSchemas.js';

// Service to disable OTA for multiple users
// Don't allow users to disable OTA for themselves
// Validates user IDs and checks permissions based on roles
// Parameters:
// - id: number - ID of the requesting user
// - role: Role - Role of the requesting user
// - data: UsersArrayInput - Object containing array of user IDs to disable OTA for
export const disableOtpService = async (
  id: number,
  role: Role,
  data: UsersArrayInput,
) => {
  const { userIds } = usersArraySchema.parse(data);

  if (userIds.includes(id))
    throw new AppError(
      'Please use the disable account option to disable OTA for yourself',
      400,
    );

  const users = await prisma.user.findMany({
    where: {
      id: {
        in: userIds,
      },
    },
  });

  if (!users.length) throw new AppError('Users not found', 404);

  if (role === Role.moderator && users.some((user) => user.role !== Role.user))
    throw new AppError(
      'Moderators can only disable OTA for regular users',
      403,
    );

  await prisma.user.updateMany({
    where: { id: { in: userIds } },
    data: {
      phoneNumber: null,
      isPhoneVerified: false,
      isTwoFactorEnabled: false,
      phoneCode: null,
      phoneCodeExpires: null,
    },
  });
};
