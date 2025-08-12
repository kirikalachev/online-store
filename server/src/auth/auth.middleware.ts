// // /* 
// // Бъдещи подобрения:
// // - Добавяне на допълнителни полета в JWT (напр. username, email) за по-лесен достъп в клиента.
// // - Имплементиране на blacklisting на токени за изход или при компрометиране.
// // - Добавяне на проверка за роля за ограничаване на достъпа до определени маршрути.
// // */


// import { Request, Response, NextFunction } from "express";
// import jwt from "jsonwebtoken";

// export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
//   const authHeader = req.headers.authorization;

//   if (!authHeader || !authHeader.startsWith("Bearer ")) {
//     res.status(401).json({ message: "Липсва или невалиден токен." });
//     return;
//   }

//   const token = authHeader.split(" ")[1];

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
//       userId: string;
//       role: "user" | "admin";
//     };

//     // Добавяме user към req, съобразен с токена
//     (req as any).user = {
//       id: decoded.userId,
//       role: decoded.role,
//     };

//     next();
//   } catch (error) {
//     res.status(401).json({ message: "Невалиден или изтекъл токен." });
//     return;
//   }
// };


// import { Request, Response, NextFunction } from "express";
// import jwt from "jsonwebtoken";

// export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
//   const token = req.cookies.accessToken;

//   if (!token) {
//     res.status(401).json({ message: "Липсва токен." });
//     return;
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
//       userId: string;
//       role: "user" | "admin";
//     };

//     // Добавяме user към req, съобразен с токена
//     (req as any).user = {
//       id: decoded.userId,
//       role: decoded.role,
//     };

//     next();
//   } catch (error) {
//     res.status(401).json({ message: "Невалиден или изтекъл токен." });
//     return;
//   }
// }; !!!!!!!!!!!!!!!!!!!!!!


import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.cookies.accessToken;

  if (!token) {
    res.status(401).json({ message: "Липсва токен." });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      userId: string;
      role: "user" | "admin";
    };

    // Добавяме user към req
    (req as any).user = {
      id: decoded.userId,
      role: decoded.role,
    };

    next();
  } catch (error) {
    res.status(401).json({ message: "Невалиден или изтекъл токен." });
    return;
  }
};