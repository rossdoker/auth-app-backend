import { MutationResolvers } from '@/graphql/generated/types.js';
import { setDeactivityService } from '@/services/admin/index.js';

export const adminSetDeactivity: MutationResolvers['adminSetDeactivity'] =
  async (parent, args, context) => {
    const userIds = args.userIds.map(Number);
    const isDeactivated = args.isDeactivated;
    const { id, role } = context.user!;

    await setDeactivityService(id, role, {
      userIds,
      isDeactivated,
    });

    return {
      success: true,
      message: `Users ${isDeactivated ? 'deactivated' : 'activated'} successfully`,
    };
  };
