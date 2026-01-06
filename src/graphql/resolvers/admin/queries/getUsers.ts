import { QueryResolvers } from '@/graphql/generated/types.js';
import { getUsersService } from '@/services/admin/index.js';

export const adminGetUsers: QueryResolvers['adminGetUsers'] = async (
  parent,
  args,
  context,
) => {
  const users = await getUsersService(context.user!.id, args.data);

  return users;
};
