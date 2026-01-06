import prisma from '@/db.js';
import { AppError } from '@/exceptions/AppError.js';
import { DeleteUserInput, deleteUserSchema } from '@/schemas/adminSchemas.js';

// Function to delete a user by ID
// Throws an error if attempting to delete oneself
// Parameters:
// - id: number - ID of the admin performing the deletion
// - data: DeleteUserInput - Object containing the userId to be deleted
export const deleteUserService = async (id: number, data: DeleteUserInput) => {
  const { userId } = deleteUserSchema.parse(data);

  if (id === userId)
    throw new AppError('To delete yourself use the delete account option', 400);

  await prisma.user.delete({
    where: { id: userId },
  });
};
