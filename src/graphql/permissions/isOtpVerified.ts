import { rule } from 'graphql-shield';
import { GraphQLContext } from '@/graphql/setup.js';
import { authenticateOtpService } from '@/services/user/index.js';

export const isOtpVerified = rule({ cache: 'contextual' })(async (
  parent,
  args,
  ctx: GraphQLContext,
) => {
  await authenticateOtpService(ctx.user!.id, ctx.otpCode);

  return true;
});
