import nodemailer from 'nodemailer';

export const sendEmail = async ({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) => {
  const testAccount = await nodemailer.createTestAccount();

  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });

  const info = await transporter.sendMail({
    from: '"Auth App" <system@authapp.com>',
    to,
    subject,
    html,
  });

  console.log('📨 Email sent: %s', info.messageId);
  console.log('👀 Preview URL: %s', nodemailer.getTestMessageUrl(info));
};
