// models/favorite.model.ts
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
