import { Router } from 'express';
import {
  register,
  login,
  login2fa,
  googleLogin,
  logout,
  verifyEmail,
  refreshToken,
  forgotPassword,
  resetPassword,
} from '@/controllers/auth/index.js';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.post('/login/2fa', login2fa);
router.post('/login/google', googleLogin);
router.post('/logout', logout);
router.post('/verify-email', verifyEmail);
router.post('/refresh-token', refreshToken);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

export default router;
