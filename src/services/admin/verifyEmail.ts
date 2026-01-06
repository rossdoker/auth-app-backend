import prisma from '@/db.js';
import { AppError } from '@/exceptions/AppError.js';
import { Role } from '@prisma/client';
import { UsersArrayInput, usersArraySchema } from '@/schemas/adminSchemas.js';

// Service to verify email addresses of users
// Parameters:
// - id: number - The ID of the admin/moderator performing the action
// - role: Role - The role of the admin/moderator performing the action
// - data: UsersArrayInput - The input data containing user IDs
// Throws AppError if attempting to verify own email or if users not found
// Throws AppError if moderator attempts to verify email for non-regular users
export const verifyEmailService = async (
  id: number,
  role: Role,
  data: UsersArrayInput,
) => {
  const { userIds } = usersArraySchema.parse(data);

  if (userIds.includes(id))
    throw new AppError('You cannot verify your own email', 400);

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
      'Moderators can only verify email for regular users',
      403,
    );

  await prisma.user.updateMany({
    where: { id: { in: userIds } },
    data: {
      isVerified: true,
      verificationToken: null,
    },
  });
};
