import prisma from '@/db.js';
import { AppError } from '@/exceptions/AppError.js';
import { SetRoleInput, setRoleSchema } from '@/schemas/adminSchemas.js';

// Service to set the role of a user
// Parameters:
// - id: number - The ID of the admin performing the action
// - data: SetRoleInput - The input data containing user ID and new role
// Throws AppError if attempting to change own role
export const setRoleService = async (id: number, data: SetRoleInput) => {
  const { userId, role } = setRoleSchema.parse(data);

  if (id === userId) throw new AppError('You cannot change your own role', 400);

  await prisma.user.update({
    where: { id: userId },
    data: { role },
  });
};
