import crypto from 'crypto';
import prisma from '@/db.js';
import { sendEmail } from '@/utils/mailer.js';
import { AppError } from '@/exceptions/AppError.js';
import { RESET_PASSWORD_TOKEN_LIFETIME } from '@/utils/constants.js';
import {
  ForgotPasswordInput,
  forgotPasswordSchema,
} from '@/schemas/authSchemas.js';

export const forgotPasswordService = async (data: ForgotPasswordInput) => {
  const { email } = forgotPasswordSchema.parse(data);

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    throw new AppError('User not found', 404);
  }

  const resetPasswordToken = crypto.randomBytes(32).toString('hex');
  const resetPasswordExpires = new Date(
    Date.now() + RESET_PASSWORD_TOKEN_LIFETIME,
  );

  await prisma.user.update({
    where: { id: user.id },
    data: {
      resetPasswordToken,
      resetPasswordExpires,
    },
  });

  const resetUrl = `http://localhost:3000/reset-password?token=${resetPasswordToken}`;

  await sendEmail({
    to: email,
    subject: 'Password Reset Request',
    html: `
        <p>You requested a password reset.</p>
        <p>Click this link to reset your password:</p>
        <a href="${resetUrl}">${resetUrl}</a>
        <p>Or copy this token: <b>${resetPasswordToken}</b></p>
      `,
  });
};
