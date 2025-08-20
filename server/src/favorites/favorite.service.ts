import { Types } from "mongoose";
import Product from "../products/product.model";
import User from "../users/user.model";

export async function toggleFavorite(userId: string, productId: string) {
  if (!Types.ObjectId.isValid(productId)) throw Object.assign(new Error("Invalid productId"), { status: 400 });

  const productExists = await Product.exists({ _id: productId });
  if (!productExists) throw Object.assign(new Error("Product not found"), { status: 404 });

  const objectId = new Types.ObjectId(productId);
  const user = await User.findById(userId).select("favorites");
  if (!user) throw Object.assign(new Error("User not found"), { status: 404 });

  const isNowFavorite = !user.favorites.some(f => f.equals(objectId));

  if (isNowFavorite) {
    await User.findByIdAndUpdate(userId, { $push: { favorites: objectId } });
  } else {
    await User.findByIdAndUpdate(userId, { $pull: { favorites: objectId } });
  }

  return isNowFavorite;
}

export async function getProductsWithFavorites(userId: string, opts?: { page?: number; limit?: number }) {
  const page = Math.max(1, opts?.page ?? 1);
  const limit = Math.min(100, Math.max(1, opts?.limit ?? 20));
  const skip = (page - 1) * limit;

  const [products, user] = await Promise.all([
    Product.find().skip(skip).limit(limit).select("name description price category mainImage createdAt").lean(),
    User.findById(userId).select("favorites"),
  ]);

  const favoritesIds = user?.favorites.map(f => f.toString()) ?? [];

  const items = products.map(p => ({ ...p, isFavorite: favoritesIds.includes(p._id.toString()) }));

  const total = await Product.countDocuments();

  return { items, page, limit, total };
}




// import { Types } from "mongoose";
// import Product from "../products/product.model";
// import User from "../users/user.model";

// export async function toggleFavorite(userId: string, productId: string) {
//   if (!Types.ObjectId.isValid(productId)) {
//     const err = new Error("Invalid productId");
//     (err as any).status = 400;
//     throw err;
//   }

//   const productExists = await Product.exists({ _id: productId });
//   if (!productExists) {
//     const err = new Error("Product not found");
//     (err as any).status = 404;
//     throw err;
//   }

//   const objectId = new Types.ObjectId(productId);

//   const user = await User.findById(userId).select("favorites");
//   if (!user) {
//     const err = new Error("User not found");
//     (err as any).status = 404;
//     throw err;
//   }

//   let isNowFavorite: boolean;
//   if (user.favorites.some(fav => fav.equals(objectId))) {
//     // премахваме от любими
//     await User.findByIdAndUpdate(
//       userId,
//       { $pull: { favorites: objectId } },
//       { new: true }
//     );
//     isNowFavorite = false;
//   } else {
//     // добавяме в любими
//     await User.findByIdAndUpdate(
//       userId,
//       { $push: { favorites: objectId } },
//       { new: true }
//     );
//     isNowFavorite = true;
//   }

//   return isNowFavorite;
// }

// export async function getFavorites(
//   userId: string,
//   opts?: { page?: number; limit?: number }
// ) {
//   const page = Math.max(1, opts?.page ?? 1);
//   const limit = Math.min(100, Math.max(1, opts?.limit ?? 20));
//   const skip = (page - 1) * limit;

//   const user = await User.findById(userId)
//     .select("favorites")
//     .populate({
//       path: "favorites",
//       model: "Product",
//       options: { skip, limit, sort: { createdAt: -1 } },
//       select: "name description price category mainImage createdAt",
//     });

//   if (!user) {
//     const err = new Error("User not found");
//     (err as any).status = 404;
//     throw err;
//   }

//   const totalFavorites = await User.aggregate([
//     { $match: { _id: new Types.ObjectId(userId) } },
//     { $project: { count: { $size: "$favorites" } } },
//   ]).then(res => res[0]?.count ?? 0);

//   return {
//     items: (user.favorites as any[]) ?? [],
//     page,
//     limit,
//     total: totalFavorites,
//   };
// }

// /**
//  * Връща всички продукти с поле `isFavorite` за конкретния потребител.
//  * Използва се в getProducts, за да се покаже червен бутон след рефреш.
//  */
// export async function getProductsWithFavorites(userId: string) {
//   const products = await Product.find().lean();
//   const user = await User.findById(userId).select("favorites");

//   const favoritesIds = user?.favorites.map(f => f.toString()) ?? [];

//   return products.map(p => ({
//     ...p,
//     isFavorite: favoritesIds.includes(p._id.toString()),
//   }));
// }


