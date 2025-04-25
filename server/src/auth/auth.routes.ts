import express from 'express';
import { logoutUser, registerUser, loginUser, verifyEmail } from './auth.controller';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.get('/verify/:verificationToken', verifyEmail);

export default router;
