// auth/auth.routes.ts
import express from 'express';
import { logoutUser, registerUser, loginUser, verifyEmail, refreshToken } from './auth.controller';

const router = express.Router();

router.post('/register', registerUser); //регистрация
router.post('/login', loginUser); //влизане
router.post('/logout', logoutUser); // излизане
router.get('/verify/:verificationToken', verifyEmail); // потвърждаване на имейл
router.post("/refresh", refreshToken); // Нов ендпойнт за обновяване на access token

export default router;

/* 
Бъдещи подобрения:
- Добавяне на middleware за ограничаване на скоростта (rate limiting) за /login и /refresh ендпойнтите.
- Валидация на входящите данни с библиотека като Joi или Zod преди обработка.
*/