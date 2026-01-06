import { Router } from 'express';
import { authenticateToken } from '@/middleware/authenticateToken.js';
import { requireRole } from '@/middleware/requireRole.js';
import {
  getUsers,
  setDeactivity,
  deleteUser,
  disableOtp,
  verifyEmail,
  setRole,
} from '@/controllers/admin/index.js';
import { Role } from '@prisma/client';

const router = Router();

router.use(authenticateToken);
router.use(requireRole(Role.admin, Role.moderator));

router.get('/getUsers', getUsers);
router.post('/setDeactivity', setDeactivity);
router.post('/disableOtp', disableOtp);
router.post('/verifyEmail', verifyEmail);
router.post('/deleteUser', requireRole(Role.admin), deleteUser);
router.post('/setRole', requireRole(Role.admin), setRole);

export default router;
