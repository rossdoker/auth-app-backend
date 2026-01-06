import { MutationResolvers } from '@/graphql/generated/types.js';
import { sendOtpToUserService } from '@/services/user/index.js';

export const sendOtpToUser: MutationResolvers['sendOtpToUser'] = async (
  parent,
  args,
  context,
) => {
  await sendOtpToUserService(context.user!.id);

  return {
    success: true,
    message: 'Confirmation code sent',
  };
};
