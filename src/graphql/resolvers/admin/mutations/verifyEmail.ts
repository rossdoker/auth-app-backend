import { MutationResolvers } from '@/graphql/generated/types.js';
import { verifyEmailService } from '@/services/admin/index.js';

export const adminVerifyEmail: MutationResolvers['adminVerifyEmail'] = async (
  parent,
  args,
  context,
) => {
  const userIds = args.userIds.map(Number);
  const { id, role } = context.user!;

  await verifyEmailService(id, role, { userIds });

  return {
    success: true,
    message: 'Users email verified successfully',
  };
};
