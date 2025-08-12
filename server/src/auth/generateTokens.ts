//auth/generateTokents.ts (server)
import jwt from "jsonwebtoken";

// Генерира access token с валидност 15 минути
export const generateAccessToken = (payload: object) => {
    return jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: "15m" });
};

// Генерира refresh token с валидност 7 дни
export const generateRefreshToken = (payload: object) => {
    return jwt.sign(payload, process.env.JWT_REFRESH_SECRET!, { expiresIn: "7d" });
};

/* 
Бъдещи подобрения:
- Добавяне на уникален идентификатор (jti) в refresh token за проследяване и предотвратяване на повторно използване.
- Съхранение на refresh token в MongoDB с връзка към потребителя за допълнителна валидация.
- Използване на по-сложни секрети за всеки потребител или ротация на секрети.
*/