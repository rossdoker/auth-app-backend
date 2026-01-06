import { chain, deny, shield } from 'graphql-shield';
import { applyRule } from '@/graphql/utils/applyRule.js';
import { isAuthenticated } from './isAuthenticated.js';
import { isOtpVerified } from './isOtpVerified.js';
import { requireRole } from './requireRole.js';

export const permissions = shield(
  {
    Query: {
      //   hello: allow,
      ...applyRule(isAuthenticated, ['getProfile']),
      ...applyRule(chain(isAuthenticated, requireRole('admin', 'moderator')), [
        'adminGetUsers',
      ]),
    },
    Mutation: {
      ...applyRule(isAuthenticated, [
        'updateProfile',
        'addPhone',
        'verifyPhone',
        'disableOtp',
        'enableOtp',
        'sendOtpToUser',
        'verifyEnableOtp',
      ]),
      ...applyRule(chain(isAuthenticated, isOtpVerified), [
        'deleteAccount',
        'changePassword',
        'deletePhone',
      ]),
      ...applyRule(chain(isAuthenticated, requireRole('admin', 'moderator')), [
        'adminDisableOtp',
        'adminSetDeactivity',
        'adminVerifyEmail',
      ]),
      ...applyRule(chain(isAuthenticated, requireRole('admin')), [
        'adminDeleteUser',
        'adminSetRole',
      ]),
    },
  },
  {
    fallbackRule: deny,
    allowExternalErrors: true,
  },
);
