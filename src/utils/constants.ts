import { Prisma } from '@prisma/client';
import ms from 'ms';

export const JWT_ACCESS_SECRET =
  process.env.JWT_ACCESS_SECRET || 'access_secret';
export const JWT_REFRESH_SECRET =
  process.env.JWT_REFRESH_SECRET || 'refresh_secret';

export const RESET_PASSWORD_TOKEN_LIFETIME = ms('1 hour');
export const ACCESS_JWT_LIFETIME_TEXT = '15 minutes';
export const ACCESS_JWT_LIFETIME = ms(ACCESS_JWT_LIFETIME_TEXT);
export const REFRESH_JWT_LIFETIME_TEXT = '30 days';
export const REFRESH_JWT_LIFETIME = ms(REFRESH_JWT_LIFETIME_TEXT);
export const OTP_LIFETIME_TEXT = '3 minutes';
export const OTP_LIFETIME = ms(OTP_LIFETIME_TEXT);
export const OTP_RESEND_COOLDOWN_TEXT = '1 minute';
export const OTP_RESEND_COOLDOWN = ms(OTP_RESEND_COOLDOWN_TEXT);
export const OTP_MAX_ATTEMPTS = 3;

export const userResponseSelect = Prisma.validator<Prisma.UserSelect>()({
  id: true,
  email: true,
  role: true,
  firstName: true,
  lastName: true,
  gender: true,
  birthDate: true,
  avatar: true,
  phoneNumber: true,
  isPhoneVerified: true,
  isTwoFactorEnabled: true,
  createdAt: true,
});
