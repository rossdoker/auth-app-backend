import prisma from '@/db.js';
import { AppError } from '@/exceptions/AppError.js';
import { GoogleLoginInput, googleLoginSchema } from '@/schemas/authSchemas.js';
import { generateAvatarUrl } from '@/utils/avatar.js';
import { Prisma } from '@prisma/client';
import { createTokenService } from './createToken.js';

type GoogleTokenPayload = {
  email: string;
  firstName: string;
  lastName?: string;
  providerAccountId: string;
  avatar: string;
};

type UserWithAccounts = Prisma.UserGetPayload<{
  include: {
    accounts: true;
  };
}>;

const verifyGoogleToken = async (
  accessToken: string,
): Promise<GoogleTokenPayload> => {
  const googleResponse = await fetch(
    'https://www.googleapis.com/oauth2/v3/userinfo',
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  const googleUser = await googleResponse.json();

  const userInfo = {
    email: googleUser.email,
    firstName: googleUser.given_name || 'Google User',
    lastName: googleUser.family_name || undefined,
    providerAccountId: googleUser.sub,
    picture: googleUser.picture,
  };

  const { email, firstName, lastName, providerAccountId, picture } = userInfo;

  if (!email || !providerAccountId) {
    throw new AppError('Invalid Google token: missing required user info', 400);
  }

  return {
    email,
    firstName,
    lastName,
    providerAccountId,
    avatar: picture || generateAvatarUrl({ firstName, lastName }),
  };
};

const loginUser = async (user: UserWithAccounts, providerAccountId: string) => {
  if (user.isDeactivated) throw new AppError('Account is deactivated', 403);

  const googleAccount = user.accounts.find((acc) => acc.provider === 'google');

  // Link Google account if not linked
  if (!googleAccount) {
    await prisma.account.create({
      data: {
        userId: user.id,
        type: 'oauth',
        provider: 'google',
        providerAccountId,
      },
    });
  }
};

const registerUser = async (
  email: string,
  firstName: string,
  lastName: string = '',
  avatar: string,
  providerAccountId: string,
) =>
  await prisma.user.create({
    data: {
      email,
      firstName,
      lastName,
      avatar,
      isVerified: true,
      accounts: {
        create: {
          type: 'oauth',
          provider: 'google',
          providerAccountId,
        },
      },
    },
    include: { accounts: true },
  });

export const googleLoginService = async (data: GoogleLoginInput) => {
  const { accessToken: googleAccessToken } = googleLoginSchema.parse(data);

  const { email, firstName, lastName, providerAccountId, avatar } =
    await verifyGoogleToken(googleAccessToken);

  const existingUser = await prisma.user.findUnique({
    where: { email },
    include: { accounts: true },
  });

  if (existingUser) await loginUser(existingUser, providerAccountId);

  const user =
    existingUser ||
    (await registerUser(email, firstName, lastName, avatar, providerAccountId));

  const { accessToken, refreshToken } = await createTokenService({
    userId: user.id,
    role: user.role,
  });

  return {
    user,
    accessToken,
    refreshToken,
  };
};
