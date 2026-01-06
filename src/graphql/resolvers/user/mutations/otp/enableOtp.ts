import { MutationResolvers } from '@/graphql/generated/types.js';
import { enableOtpService } from '@/services/user/index.js';

export const enableOtp: MutationResolvers['enableOtp'] = async (
  parent,
  args,
  context,
) => {
  await enableOtpService(context.user!.id);

  return {
    success: true,
    message: 'Verification code sent to your phone',
  };
};
