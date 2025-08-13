// favorite/favorite.model.ts
import mongoose, { Schema, Document } from "mongoose"

export interface IFavorite extends Document {
  user: mongoose.Types.ObjectId
  products: mongoose.Types.ObjectId[]
}

const FavoriteSchema = new Schema<IFavorite>({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true, unique: true },
  products: [{ type: Schema.Types.ObjectId, ref: "Product" }],
})

export const Favorite = mongoose.model<IFavorite>("Favorite", FavoriteSchema);


// import mongoose, { Schema, Document } from "mongoose";

// export interface IFavoriteProduct {
//   product: mongoose.Types.ObjectId;
//   addedAt: Date;
// }

// export interface IFavorite extends Document {
//   user: mongoose.Types.ObjectId;
//   products: IFavoriteProduct[];
// }

// const FavoriteSchema = new Schema<IFavorite>({
//   user: { type: Schema.Types.ObjectId, ref: "User", required: true, unique: true },
//   products: [
//     {
//       product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
//       addedAt: { type: Date, default: Date.now }
//     }
//   ]
// });

// FavoriteSchema.index({ user: 1 });
// FavoriteSchema.index({ "products.product": 1 });

// export const Favorite = mongoose.model<IFavorite>("Favorite", FavoriteSchema);
