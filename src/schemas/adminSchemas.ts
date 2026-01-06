import { Gender, Role } from '@prisma/client';
import { z } from 'zod';

export enum PhoneStatus {
  VERIFIED = 'verified',
  UNVERIFIED = 'unverified',
  NONE = 'none',
}

enum StringBoolean {
  TRUE = 'true',
  FALSE = 'false',
}

export const setDeactivitySchema = z.object({
  userIds: z.array(z.number()),
  isDeactivated: z.boolean(),
});

export type SetDeactivityInput = z.infer<typeof setDeactivitySchema>;

export const usersArraySchema = z.object({
  userIds: z.array(z.number()),
});

export type UsersArrayInput = z.infer<typeof usersArraySchema>;

export const deleteUserSchema = z.object({
  userId: z.number().min(1, 'Invalid user ID'),
});

export type DeleteUserInput = z.infer<typeof deleteUserSchema>;

export const setRoleSchema = z.object({
  userId: z.number().min(1, 'Invalid user ID'),
  role: z.enum(Role),
});

export type SetRoleInput = z.infer<typeof setRoleSchema>;

export const getUsersSchema = z.object({
  search: z.string().optional(),
  role: z
    .preprocess(
      (val) => {
        if (val === undefined) return undefined;
        return Array.isArray(val) ? val : [val];
      },
      z.array(z.enum(Role)),
    )
    .optional(),
  gender: z
    .preprocess(
      (val) => {
        if (val === undefined) return undefined;
        return (Array.isArray(val) ? val : [val]).map((v) =>
          v === 'null' ? null : v,
        );
      },
      z.array(z.enum(Gender).or(z.null())),
    )
    .optional(),
  birthDateFrom: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, { message: 'Should be in YYYY-MM-DD format' })
    .transform((dateStr) => new Date(dateStr))
    .optional(),
  birthDateTo: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, { message: 'Should be in YYYY-MM-DD format' })
    .transform((dateStr) => new Date(dateStr))
    .optional(),
  phoneStatus: z.enum(PhoneStatus).optional(),
  isTwoFactorEnabled: z
    .enum(StringBoolean)
    .optional()
    .transform((value) => value === 'true'),
  isVerified: z
    .enum(StringBoolean)
    .optional()
    .transform((value) => value === 'true'),
  isDeactivated: z
    .enum(StringBoolean)
    .optional()
    .transform((value) => value === 'true'),
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(100).default(10),
  sortBy: z
    .enum(['createdAt', 'firstName', 'lastName', 'email'])
    .default('createdAt'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
});

export type GetUsersInput = z.infer<typeof getUsersSchema>;
