import { MutationResolvers } from '@/graphql/generated/types.js';
import { disableOtpService } from '@/services/admin/index.js';

export const adminDisableOtp: MutationResolvers['adminDisableOtp'] = async (
  parent,
  args,
  context,
) => {
  const userIds = args.userIds.map(Number);
  const { id, role } = context.user!;

  await disableOtpService(id, role, { userIds });

  return {
    success: true,
    message: 'Users OTP disabled successfully',
  };
};
