// src/products/product.service.ts
import mongoose from "mongoose";
import Product from "./product.model";
import User from "../users/user.model";

export const getAllProductsService = async (userId?: string) => {
  let favoritesIds: string[] = [];

  if (userId && mongoose.Types.ObjectId.isValid(userId)) {
    const user = await User.findById(userId).select("favorites");
    favoritesIds = user?.favorites.map(f => f.toString()) || [];
    console.log("DEBUG getAllProductsService - user favoritesIds:", favoritesIds);
  }

  const products = await Product.find().populate("category").lean();
  return products.map(p => ({
    ...p,
    isFavorite: favoritesIds.includes(p._id.toString()),
  }));
};

export const getProductByIdService = async (id: string, userId?: string) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("Invalid product ID format");
  }

  const product = await Product.findById(id).populate("category").lean();
  if (!product) {
    return null;
  }

  let isFavorite = false;
  let favoritesIds: string[] = [];

  if (userId && mongoose.Types.ObjectId.isValid(userId)) {
    const user = await User.findById(userId).select("favorites");
    favoritesIds = user?.favorites.map(f => f.toString()) || [];
    isFavorite = favoritesIds.includes(product._id.toString());
  }

  console.log("DEBUG getProductByIdService - product _id:", product._id);
  console.log("DEBUG getProductByIdService - favoritesIds:", favoritesIds);
  console.log("DEBUG getProductByIdService - isFavorite:", isFavorite);

  return { ...product, isFavorite };
};
