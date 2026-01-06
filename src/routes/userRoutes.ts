import { Router } from 'express';
import { authenticateToken } from '@/middleware/authenticateToken.js';
import { requireOtp } from '@/middleware/requireOtp.js';
import {
  addPhone,
  getProfile,
  verifyPhone,
  deletePhone,
  enableOtp,
  verifyEnableOtp,
  disableOtp,
  sendOtpToUser,
  changePassword,
  deleteAccount,
  updateProfile,
} from '@/controllers/user/index.js';

const router = Router();

router.use(authenticateToken);

// --- User Profile ---
router.get('/profile', getProfile);
router.patch('/profile', updateProfile);
router.post('/change-password', requireOtp, changePassword);
router.delete('/profile', requireOtp, deleteAccount);
// --- Phone Management ---
router.post('/phone/add', addPhone);
router.post('/phone/verify', verifyPhone);
router.delete('/phone', requireOtp, deletePhone);
// --- OTP Actions ---
router.post('/otp/enable/init', enableOtp);
router.post('/otp/enable/verify', verifyEnableOtp);
router.post('/otp/disable', requireOtp, disableOtp);
router.post('/otp/send', sendOtpToUser);

export default router;
