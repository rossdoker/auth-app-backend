import { Gender, Role } from '@prisma/client';
import { z } from 'zod';

export const registerSchema = z.object({
  email: z.email('Wrong email format'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().optional(),
  gender: z.enum(Gender).nullable().optional(),
  birthDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, { message: 'Should be in YYYY-MM-DD format' })
    .refine(
      (dateStr) => {
        const date = new Date(dateStr);
        const now = new Date();
        return date < now;
      },
      { message: 'Date cannot be in the future' },
    )
    .transform((dateStr) => new Date(dateStr))
    .nullable()
    .optional(),
});

export type RegisterInput = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export type LoginInput = z.infer<typeof loginSchema>;

export const login2faSchema = z.object({
  email: z.email(),
  code: z.string().length(6, 'Code must be exactly 6 digits'),
});

export type Login2FAInput = z.infer<typeof login2faSchema>;

export const googleLoginSchema = z.object({
  accessToken: z.string().min(1, 'Google access token is required'),
});

export type GoogleLoginInput = z.infer<typeof googleLoginSchema>;

export const createTokenSchema = z.object({
  userId: z.number().min(1, 'Invalid user ID'),
  role: z.enum(Role),
});

export type CreateTokenInput = z.infer<typeof createTokenSchema>;

export const logoutSchema = z.object({
  token: z.string().min(1, 'Token is required'),
});

export type LogoutInput = z.infer<typeof logoutSchema>;

export const refreshTokenSchema = z.object({
  token: z.string().min(1, 'Token is required'),
});

export type RefreshTokenInput = z.infer<typeof refreshTokenSchema>;

export const verifyEmailSchema = z.object({
  token: z.string().min(1, 'Token is required'),
});

export type VerifyEmailInput = z.infer<typeof verifyEmailSchema>;

export const resetPasswordSchema = z.object({
  token: z.string().min(1, 'Token is missing'),
  newPassword: z.string().min(6, 'New password must be at least 6 characters'),
});

export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;

export const forgotPasswordSchema = z.object({
  email: z.email(),
});

export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;
