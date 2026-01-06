import { MutationResolvers } from '@/graphql/generated/types.js';
import { deletePhoneService } from '@/services/user/index.js';

export const deletePhone: MutationResolvers['deletePhone'] = async (
  parent,
  args,
  context,
) => {
  await deletePhoneService(context.user!.id);

  return {
    success: true,
    message: 'Phone number was successfully deleted',
  };
};
