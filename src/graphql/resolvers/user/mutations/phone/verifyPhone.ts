import { MutationResolvers } from '@/graphql/generated/types.js';
import { verifyPhoneService } from '@/services/user/index.js';

export const verifyPhone: MutationResolvers['verifyPhone'] = async (
  parent,
  args,
  context,
) => {
  const { code } = args;

  await verifyPhoneService(context.user!.id, { code });

  return {
    success: true,
    message: 'Phone number successfully verified',
  };
};
