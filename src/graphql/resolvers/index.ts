import {
  getProfile,
  deleteAccount,
  changePassword,
  updateProfile,
  addPhone,
  deletePhone,
  verifyPhone,
  disableOtp,
  enableOtp,
  sendOtpToUser,
  verifyEnableOtp,
} from './user/index.js';
import { Resolvers } from '@/graphql/generated/types.js';
import { dateScalar } from '@/graphql/utils/dateScalar.js';
import {
  adminDeleteUser,
  adminDisableOtp,
  adminGetUsers,
  adminSetDeactivity,
  adminSetRole,
  adminVerifyEmail,
} from './admin/index.js';

export const resolvers: Resolvers = {
  Date: dateScalar,

  Query: {
    getProfile,
    adminGetUsers,
  },

  Mutation: {
    deleteAccount,
    changePassword,
    updateProfile,
    addPhone,
    deletePhone,
    verifyPhone,
    disableOtp,
    enableOtp,
    sendOtpToUser,
    verifyEnableOtp,
    adminDeleteUser,
    adminDisableOtp,
    adminSetDeactivity,
    adminSetRole,
    adminVerifyEmail,
  },
};
