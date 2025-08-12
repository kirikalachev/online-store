// auth.controller.ts
import { Request, Response } from "express";
import User, { IUser } from "../users/user.model";
import { sendVerificationEmail } from "../common/utils/sendEmail";
import { generateAccessToken, generateRefreshToken } from "./generateTokens";
import jwt from "jsonwebtoken";

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { username, firstName, lastName, email, password, role } = req.body;

    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      res.status(400).json({ message: "Потребител с този имейл или потребителско име вече съществува." });
      return;
    }

    const newUser = new User({ username, firstName, lastName, email, password, role });
    await newUser.save();
    await sendVerificationEmail(newUser);

    res.status(201).json({ message: "Потребителят е регистриран успешно." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Сървърна грешка." });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await user.comparePassword(password))) {
      res.status(400).json({ message: "Невалиден имейл или парола." });
      return;
    }

    if (!user.isVerified) {
      res.status(403).json({ message: "Моля, потвърдете имейла си преди да влезете." });
      return;
    }

    const payload = { userId: user._id, role: user.role };
    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    // Съхраняваме и двата токена в HTTP-only cookie
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax", // Променено на 'lax' за по-добра съвместимост при разработка
      maxAge: 15 * 60 * 1000, // 15 минути
    });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 дни
    });

    res.status(200).json({ user: { id: user._id, username: user.username, role: user.role } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Сървърна грешка." });
  }
};

export const logoutUser = (req: Request, res: Response) => {
  try {
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    res.status(200).json({ message: "Потребителят излезе успешно." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Сървърна грешка." });
  }
};

export const verifyEmail = async (req: Request, res: Response) => {
  try {
    const { verificationToken } = req.params;
    const user = await User.findOne({ verificationToken });

    if (!user) {
      res.status(400).json({ message: "Невалиден токен за верификация." });
      return;
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    await user.save();

    res.status(200).json({ message: "Имейлът е верифициран успешно." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Сървърна грешка." });
  }
};

export const refreshToken = async (req: Request, res: Response) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      res.status(401).json({ message: "Липсва refresh token." });
      return;
    }

    // Валидираме refresh token
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET!) as { userId: string; role: string };
    const user = await User.findById(decoded.userId);

    if (!user) {
      res.status(401).json({ message: "Невалиден refresh token." });
      return;
    }

    const payload = { userId: user._id, role: user.role };
    const newAccessToken = generateAccessToken(payload);

    // Задаваме нов accessToken като HTTP-only cookie
    res.cookie("accessToken", newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 15 * 60 * 1000, // 15 минути
    });

    res.status(200).json({ message: "Access token refreshed" });
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Невалиден или изтекъл refresh token." });
  }
};


// import { Request, Response } from "express";
// import User, { IUser } from "../users/user.model";
// import { sendVerificationEmail } from "../common/utils/sendEmail";
// import { generateAccessToken, generateRefreshToken } from "./generateTokens";
// import jwt from "jsonwebtoken";

// export const registerUser = async (req: Request, res: Response) => {
//     try {
//         const { username, firstName, lastName, email, password, role } = req.body;

//         const existingUser = await User.findOne({ $or: [{ email }, { username }] });
//         if (existingUser) {
//             res.status(400).json({ message: "Потребител с този имейл или потребителско име вече съществува." });
//             return;
//         }

//         const newUser = new User({ username, firstName, lastName, email, password, role });
//         await newUser.save();
//         await sendVerificationEmail(newUser);

//         res.status(201).json({ message: "Потребителят е регистриран успешно." });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: "Сървърна грешка." });
//     }
// };

// export const loginUser = async (req: Request, res: Response) => {
//   try {
//     const { email, password } = req.body;
//     const user = await User.findOne({ email });

//     if (!user || !(await user.comparePassword(password))) {
//       res.status(400).json({ message: "Невалиден имейл или парола." });
//       return;
//     }

//     if (!user.isVerified) {
//       res.status(403).json({ message: "Моля, потвърдете имейла си преди да влезете." });
//       return;
//     }

//     const payload = { userId: user._id, role: user.role };
//     const accessToken = generateAccessToken(payload);
//     const refreshToken = generateRefreshToken(payload);

//     // Съхраняваме и двата токена в HTTP-only cookie
//     res.cookie("accessToken", accessToken, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production", // Сигурно само в production
//       sameSite: "strict",
//       maxAge: 15 * 60 * 1000, // 15 минути
//     });
//     res.cookie("refreshToken", refreshToken, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       sameSite: "strict",
//       maxAge: 7 * 24 * 60 * 60 * 1000, // 7 дни
//     });

//     res.status(200).json({ user: { id: user._id, username: user.username, role: user.role } });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Сървърна грешка." });
//   }
// };

// export const logoutUser = (req: Request, res: Response) => {
//     try {
//         res.clearCookie("refreshToken"); // Изчистваме refresh token от cookie
//         res.status(200).json({ message: "Потребителят излезе успешно." });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: "Сървърна грешка." });
//     }
// };

// export const verifyEmail = async (req: Request, res: Response) => {
//     try {
//         const { verificationToken } = req.params;
//         const user = await User.findOne({ verificationToken });

//         if (!user) {
//             res.status(400).json({ message: "Невалиден токен за верификация." });
//             return;
//         }

//         user.isVerified = true;
//         user.verificationToken = undefined;
//         await user.save();

//         res.status(200).json({ message: "Имейлът е верифициран успешно." });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: "Сървърна грешка." });
//     }
// };

// // Нов ендпойнт за обновяване на access token
// export const refreshToken = async (req: Request, res: Response) => {
//     try {
//         const refreshToken = req.cookies.refreshToken;
//         if (!refreshToken) {
//             res.status(401).json({ message: "Липсва refresh token." });
//             return;
//         }

//         // Валидираме refresh token
//         const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET!) as { userId: string; role: string };
//         const user = await User.findById(decoded.userId);

//         if (!user) {
//             res.status(401).json({ message: "Невалиден refresh token." });
//             return;
//         }

//         const payload = { userId: user._id, role: user.role };
//         const newAccessToken = generateAccessToken(payload);

//         res.status(200).json({ accessToken: newAccessToken });
//     } catch (error) {
//         console.error(error);
//         res.status(401).json({ message: "Невалиден или изтекъл refresh token." });
//     }
// };

// /* 
// Бъдещи подобрения:
// - Съхранение на refresh token в MongoDB: Добавяне на колекция за refresh token-и, свързани с потребителя, с уникален jti.
// - Защита срещу повторно използване: При всяко обновяване на access token да се генерира нов refresh token и старият да се инвалидира.
// - Лимитиране на брой активни refresh token-и за един потребител.
// - Добавяне на ротация на JWT_SECRET и JWT_REFRESH_SECRET за допълнителна сигурност.
// */