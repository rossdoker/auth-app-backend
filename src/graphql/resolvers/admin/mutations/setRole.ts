import { MutationResolvers } from '@/graphql/generated/types.js';
import { setRoleService } from '@/services/admin/index.js';

export const adminSetRole: MutationResolvers['adminSetRole'] = async (
  parent,
  args,
  context,
) => {
  const userId = Number(args.userId);
  const role = args.role;
  const { id } = context.user!;

  await setRoleService(id, { userId, role });

  return {
    success: true,
    message: 'Role updated successfully',
  };
};
