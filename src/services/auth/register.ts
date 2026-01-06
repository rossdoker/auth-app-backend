import bcrypt from 'bcryptjs';
import prisma from '@/db.js';
import { RegisterInput, registerSchema } from '@/schemas/authSchemas.js';
import crypto from 'crypto';
import { sendEmail } from '@/utils/mailer.js';
import { AppError } from '@/exceptions/AppError.js';
import { generateAvatarUrl } from '@/utils/avatar.js';
import { userResponseSelect } from '@/utils/constants.js';

export const registerService = async (data: RegisterInput) => {
  const { email, password, firstName, lastName, gender, birthDate } =
    registerSchema.parse(data);

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    throw new AppError('User with this email already exists', 409);
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const verificationToken = crypto.randomBytes(32).toString('hex');
  const avatar = generateAvatarUrl({ firstName, lastName, gender });

  const newUser = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      firstName,
      lastName,
      gender,
      avatar,
      verificationToken,
      isVerified: false,
      birthDate,
    },
    select: userResponseSelect,
  });

  await sendEmail({
    to: email,
    subject: 'Verify your email',
    html: `<p>Your verification code is: <b>${verificationToken}</b></p>`,
  });

  return {
    message: 'User registered successfully',
    user: newUser,
  };
};
