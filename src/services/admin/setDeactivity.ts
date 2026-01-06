import prisma from '@/db.js';
import { AppError } from '@/exceptions/AppError.js';
import { Role } from '@prisma/client';
import {
  SetDeactivityInput,
  setDeactivitySchema,
} from '@/schemas/adminSchemas.js';

// Service to activate or deactivate users
// Parameters:
// - id: number - The ID of the admin/moderator performing the action
// - role: Role - The role of the admin/moderator performing the action
// - data: SetDeactivityInput - The input data containing user IDs and deactivation status
// Throws AppError if attempting to deactivate self or if users not found
// Returns: An object with the deactivation status
export const setDeactivityService = async (
  id: number,
  role: Role,
  data: SetDeactivityInput,
) => {
  const { userIds, isDeactivated } = setDeactivitySchema.parse(data);

  if (userIds.includes(id))
    throw new AppError('You cannot deactivate yourself', 400);

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
      'Moderators can only activate/deactivate regular users',
      403,
    );

  await prisma.user.updateMany({
    where: { id: { in: userIds } },
    data: { isDeactivated },
  });

  return { isDeactivated };
};
