import { rule } from 'graphql-shield';
import { Role } from '@prisma/client';
import { GraphQLContext } from '@/graphql/setup.js';
import { AppError } from '@/exceptions/AppError.js';

export const requireRole = (...allowedRoles: Role[]) => {
  return rule({ cache: 'contextual' })(
    async (parent, args, ctx: GraphQLContext) => {
      if (!allowedRoles.includes(ctx.user!.role as Role)) {
        return new AppError(
          'You do not have permission to perform this action',
          403,
          'FORBIDDEN',
        );
      }
      return true;
    },
  );
};
