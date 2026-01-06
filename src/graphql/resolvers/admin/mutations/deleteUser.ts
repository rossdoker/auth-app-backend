import { MutationResolvers } from '@/graphql/generated/types.js';
import { deleteUserService } from '@/services/admin/index.js';

export const adminDeleteUser: MutationResolvers['adminDeleteUser'] = async (
  parent,
  args,
  context,
) => {
  const { userId } = args;

  await deleteUserService(context.user!.id, { userId: Number(userId) });

  return {
    success: true,
    message: 'Account deleted successfully',
  };
};
