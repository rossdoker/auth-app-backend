import { Gender } from '@prisma/client';

export const generateAvatarUrl = ({
  firstName,
  lastName,
  gender,
}: {
  firstName: string;
  lastName?: string | null;
  gender?: Gender | null;
}): string => {
  const name = (() => {
    if (lastName) return `${firstName}+${lastName}`;
    return firstName;
  })();
  const background = (() => {
    if (gender === Gender.male) return '007bff'; // blue
    if (gender === Gender.female) return 'ff69b4'; // pink
    if (gender === Gender.other) return 'ffce00'; // yellow
    return '6c757d'; // grey
  })();

  return `https://ui-avatars.com/api/?name=${name}&background=${background}&color=fff&size=128`;
};
