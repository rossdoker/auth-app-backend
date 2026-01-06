import { MutationResolvers } from '@/graphql/generated/types.js';
import { addPhoneService } from '@/services/user/index.js';

export const addPhone: MutationResolvers['addPhone'] = async (
  parent,
  args,
  context,
) => {
  const { phoneNumber } = args;

  await addPhoneService(context.user!.id, { phoneNumber });

  return {
    success: true,
    message: 'OTP sent',
  };
};
