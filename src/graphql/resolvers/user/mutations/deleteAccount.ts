import { MutationResolvers } from '@/graphql/generated/types.js';
import { deleteAccountService } from '@/services/user/index.js';

export const deleteAccount: MutationResolvers['deleteAccount'] = async (
  parent,
  args,
  context,
) => {
  await deleteAccountService(context.user!.id);

  return {
    success: true,
    message: 'Account deleted successfully. Goodbye!',
  };
};
