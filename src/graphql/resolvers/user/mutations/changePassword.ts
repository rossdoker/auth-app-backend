import { MutationResolvers } from '@/graphql/generated/types.js';
import { changePasswordService } from '@/services/user/index.js';

export const changePassword: MutationResolvers['changePassword'] = async (
  parent,
  args,
  context,
) => {
  const { password } = args.data;

  const message = await changePasswordService(context.user!.id, {
    password,
  });

  return {
    success: true,
    message,
  };
};
