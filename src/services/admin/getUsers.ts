import prisma from '@/db.js';
import {
  GetUsersInput,
  getUsersSchema,
  PhoneStatus,
} from '@/schemas/adminSchemas.js';
import { userResponseSelect } from '@/utils/constants.js';
import { Gender, Prisma, Role } from '@prisma/client';

const buildSearchFilter = (search?: string): Prisma.UserWhereInput => {
  if (!search) return {};

  const parts = search.trim().split(/\s+/);

  return {
    AND: parts.map((part) => {
      const isPartNumber = !isNaN(Number(part));

      const orConditions: Prisma.UserWhereInput[] = [
        { firstName: { contains: part, mode: 'insensitive' } },
        { lastName: { contains: part, mode: 'insensitive' } },
        { email: { contains: part, mode: 'insensitive' } },
        { phoneNumber: { contains: part, mode: 'insensitive' } },
      ];

      if (isPartNumber) {
        orConditions.push({ id: { equals: Number(part) } });
      }

      return { OR: orConditions };
    }),
  };
};

const buildPhoneFilter = (status?: PhoneStatus): Prisma.UserWhereInput => {
  if (status === PhoneStatus.VERIFIED) {
    return {
      phoneNumber: { not: null },
      isPhoneVerified: true,
    };
  }
  if (status === PhoneStatus.UNVERIFIED) {
    return {
      phoneNumber: { not: null },
      isPhoneVerified: false,
    };
  }
  if (status === PhoneStatus.NONE) {
    return {
      phoneNumber: null,
    };
  }
  return {};
};

const buildRoleFilter = (role?: Role[]): Prisma.UserWhereInput =>
  role && role.length > 0
    ? {
        role: { in: role },
      }
    : {};

const buildGenderFilter = (
  gender?: (Gender | null)[],
): Prisma.UserWhereInput => {
  if (!gender || gender.length === 0) return {};

  const validGenders = gender.filter((g): g is Gender => g !== null);
  const includeNull = gender.includes(null);

  if (validGenders.length > 0 && includeNull)
    return {
      OR: [{ gender: { in: validGenders } }, { gender: null }],
    };

  if (includeNull) return { gender: null };

  return { gender: { in: validGenders } };
};

const buildBirthDateFilter = (
  from?: Date,
  to?: Date,
): Prisma.UserWhereInput => {
  if (!from && !to) return {};

  return {
    birthDate: {
      gte: from,
      lte: to,
    },
  };
};

const buildTwoFactorFilter = (
  isTwoFactorEnabled?: boolean,
): Prisma.UserWhereInput =>
  isTwoFactorEnabled !== undefined ? { isTwoFactorEnabled } : {};

const buildEmailVerifiedFilter = (
  isVerified?: boolean,
): Prisma.UserWhereInput => (isVerified !== undefined ? { isVerified } : {});

const buildDeactivationFilter = (
  isDeactivated?: boolean,
): Prisma.UserWhereInput =>
  isDeactivated !== undefined ? { isDeactivated } : {};

const buildWhereClause = (
  userId: number,
  {
    search,
    role,
    gender,
    phoneStatus,
    isTwoFactorEnabled,
    isVerified,
    isDeactivated,
    birthDateFrom,
    birthDateTo,
  }: Omit<GetUsersInput, 'page' | 'limit' | 'sortBy' | 'sortOrder'>,
): Prisma.UserWhereInput => ({
  id: { not: userId },
  ...buildSearchFilter(search),
  ...buildRoleFilter(role),
  ...buildGenderFilter(gender),
  ...buildBirthDateFilter(birthDateFrom, birthDateTo),
  ...buildPhoneFilter(phoneStatus),
  ...buildTwoFactorFilter(isTwoFactorEnabled),
  ...buildEmailVerifiedFilter(isVerified),
  ...buildDeactivationFilter(isDeactivated),
});

// Service to get users based on various filters
// and omit sensitive fields from the result
// such as password, phone codes, and verification tokens
// Returns a paginated list of users with metadata
// Parameters:
// - data: GetUsersInput - The input data containing filter criteria
export const getUsersService = async (userId: number, data: GetUsersInput) => {
  const query = getUsersSchema.parse(data);

  const { page, limit, sortBy, sortOrder, ...filters } = query;

  const skip = (page - 1) * limit;
  const where = buildWhereClause(userId, filters);

  const [users, total] = await prisma.$transaction([
    prisma.user.findMany({
      where,
      select: userResponseSelect,
      take: limit,
      skip: skip,
      orderBy: {
        [sortBy]: sortOrder,
      },
    }),
    prisma.user.count({
      where,
    }),
  ]);

  return {
    data: users,
    meta: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
};
