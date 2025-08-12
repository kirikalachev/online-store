import { Request } from "express";

declare module "express" {
  export interface Request {
    user?: {
      id: string;
      role: "user" | "admin";
    };
  }
}

/* 
Бъдещи подобрения:
- Ако добавиш още полета в JWT (напр. username, email), актуализирай този интерфейс.
- Може да се добави допълнителен тип за различни роли или разрешения.
*/