import express from 'express';
import { getCurrentUser, getAllUsers } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/roleMiddleware.js';

const router = express.Router();

router.get('/me', protect, getCurrentUser);
router.get('/', protect, authorizeRoles('admin'), getAllUsers);

export default router;
