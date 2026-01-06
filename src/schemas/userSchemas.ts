import { Gender } from '@prisma/client';
import { z } from 'zod';

export const addPhoneSchema = z.object({
  phoneNumber: z.string().min(10, 'Number must be at least 10 digits'),
});

export type AddPhoneInput = z.infer<typeof addPhoneSchema>;

export const verifyPhoneSchema = z.object({
  code: z.string().length(6, 'Code must be 6 digits'),
});

export type VerifyPhoneInput = z.infer<typeof verifyPhoneSchema>;

export const changePasswordSchema = z.object({
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export type ChangePasswordInput = z.infer<typeof changePasswordSchema>;

export const updateProfileSchema = z.object({
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

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
