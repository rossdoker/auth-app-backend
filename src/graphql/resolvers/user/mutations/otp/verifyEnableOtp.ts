import { MutationResolvers } from '@/graphql/generated/types.js';
import { verifyEnableOtpService } from '@/services/user/index.js';

export const verifyEnableOtp: MutationResolvers['verifyEnableOtp'] = async (
  parent,
  args,
  context,
) => {
  const { code } = args;

  await verifyEnableOtpService(context.user!.id, { code });

  return {
    success: true,
    message: 'Two-factor authentication enabled successfully',
  };
};
