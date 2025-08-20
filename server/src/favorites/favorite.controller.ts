import { Request, Response } from "express";
import { toggleFavorite, getProductsWithFavorites } from "./favorite.service";

type ReqWithUser = Request & { user?: { id: string; role: "user" | "admin" } };

export const toggleFavoriteController = async (req: ReqWithUser, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const { productId } = req.params;
    const isFavoriteNow = await toggleFavorite(userId, productId);

    res.status(200).json({
      message: isFavoriteNow ? "Added to favorites" : "Removed from favorites",
      isFavorite: isFavoriteNow,
    });
  } catch (err: any) {
    const status = err?.status ?? 500;
    res.status(status).json({ message: err?.message ?? "Server error" });
  }
};

export const getProductsWithFavoritesController = async (req: ReqWithUser, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const page = req.query.page ? Number(req.query.page) : 1;
    const limit = req.query.limit ? Number(req.query.limit) : 20;

    const data = await getProductsWithFavorites(userId, { page, limit });
    res.status(200).json(data);
  } catch (err: any) {
    res.status(500).json({ message: err?.message ?? "Server error" });
  }
};



// // // src/favorites/favorites.controller.ts

// import { Request, Response } from "express";
// import { toggleFavorite, getFavorites } from "./favorite.service";

// type ReqWithUser = Request & { user?: { id: string; role: "user" | "admin" } };

// export const toggleFavoriteController = async (req: ReqWithUser, res: Response) => {
//   try {
//     const userId = req.user?.id;
//     if (!userId) return res.status(401).json({ message: "Unauthorized" });

//     const { productId } = req.params;
//     const isFavoriteNow = await toggleFavorite(userId, productId);

//     res.status(200).json({
//       message: isFavoriteNow ? "Added to favorites" : "Removed from favorites",
//       isFavorite: isFavoriteNow,
//     });
//   } catch (err: any) {
//     const status = err?.status ?? (err?.message === "Invalid productId" ? 400 : 500);
//     res.status(status).json({ message: err?.message ?? "Server error" });
//   }
// };

// export const getUserFavorites = async (req: ReqWithUser, res: Response) => {
//   try {
//     const userId = req.user?.id;
//     if (!userId) return res.status(401).json({ message: "Unauthorized" });

//     const page = req.query.page ? Number(req.query.page) : undefined;
//     const limit = req.query.limit ? Number(req.query.limit) : undefined;

//     const data = await getFavorites(userId, { page, limit });
//     res.status(200).json(data);
//   } catch (err: any) {
//     const status = err?.status ?? 500;
//     res.status(status).json({ message: err?.message ?? "Server error" });
//   }
// };
