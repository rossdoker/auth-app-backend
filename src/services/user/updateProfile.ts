import prisma from '@/db.js';
import { AppError } from '@/exceptions/AppError.js';
import {
  UpdateProfileInput,
  updateProfileSchema,
} from '@/schemas/userSchemas.js';
import { generateAvatarUrl } from '@/utils/avatar.js';
import { userResponseSelect } from '@/utils/constants.js';

export const updateProfileService = async (
  id: number,
  data: UpdateProfileInput,
) => {
  const { firstName, lastName, gender, birthDate } =
    updateProfileSchema.parse(data);

  const currentUser = await prisma.user.findUnique({
    where: { id },
  });

  if (!currentUser) throw new AppError('User not found', 404);

  const isAvatarDefault = currentUser.avatar?.includes('ui-avatars.com');
  const needUpdateAvatar =
    (firstName !== undefined ||
      lastName !== undefined ||
      gender !== undefined) &&
    isAvatarDefault;

  const updateData = {
    firstName: firstName !== undefined ? firstName : currentUser.firstName,
    lastName: lastName !== undefined ? lastName : currentUser.lastName,
    gender: gender !== undefined ? gender : currentUser.gender,
    birthDate: birthDate !== undefined ? birthDate : currentUser.birthDate,
    avatar: currentUser.avatar,
  };

  if (needUpdateAvatar) {
    updateData.avatar = generateAvatarUrl(updateData);
  }

  const updatedUser = await prisma.user.update({
    where: { id },
    data: updateData,
    select: userResponseSelect,
  });

  return updatedUser;
};
