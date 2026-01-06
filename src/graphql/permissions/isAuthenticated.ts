import { rule } from 'graphql-shield';
import { GraphQLContext } from '@/graphql/setup.js';
import { AppError } from '@/exceptions/AppError.js';

export const isAuthenticated = rule({ cache: 'contextual' })(async (
  parent,
  args,
  ctx: GraphQLContext,
) => {
  if (ctx.user) {
    return true;
  }
  return new AppError('Access denied', 401, 'UNAUTHENTICATED');
});
