import { MutationResolvers } from '@/graphql/generated/types.js';
import { updateProfileService } from '@/services/user/index.js';

export const updateProfile: MutationResolvers['updateProfile'] = async (
  parent,
  args,
  context,
) => {
  const { firstName, lastName, avatar, gender } = args.data;

  const user = await updateProfileService(context.user!.id, {
    firstName,
    lastName,
    avatar,
    gender,
  });

  return user;
};
