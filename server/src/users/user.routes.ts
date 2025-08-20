// user.routes.ts
import express from 'express';
import { updateUser, deleteUser, getUserProfile, getCurrentUser } from './user.controller';
import { authMiddleware } from '../auth/auth.middleware';  // коректният път към middleware-а

const router = express.Router();

router.get('/me', authMiddleware, getCurrentUser);
router.put('/:userId', authMiddleware, updateUser);
router.delete('/:userId', authMiddleware, deleteUser);


export default router;
