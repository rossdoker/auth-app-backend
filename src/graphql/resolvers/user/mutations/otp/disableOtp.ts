import { MutationResolvers } from '@/graphql/generated/types.js';
import { disableOtpService } from '@/services/user/index.js';

export const disableOtp: MutationResolvers['disableOtp'] = async (
  parent,
  args,
  context,
) => {
  await disableOtpService(context.user!.id);

  return {
    success: true,
    message: 'Two-factor authentication disabled',
  };
};
