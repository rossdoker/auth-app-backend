import { QueryResolvers } from '@/graphql/generated/types.js';
import { getProfileService } from '@/services/user/index.js';

export const getProfile: QueryResolvers['getProfile'] = async (
  parent,
  args,
  context,
) => {
  const user = await getProfileService(context.user!.id);

  return user;
};
