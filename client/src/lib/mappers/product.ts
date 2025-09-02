// lib/mappers/product.ts
import type { RawProduct, Product, Category } from "@/types/product";

export function mapRawProduct(raw: RawProduct): Product & { _id: string } {
  const category: Category =
    typeof raw.category === "string"
      ? { id: raw.category, name: "", createdAt: new Date() }
      : { id: raw.category._id, name: raw.category.name, createdAt: new Date(raw.category.createdAt) };

  return {
    _id: raw._id,                 // за бекенд операции като FavoriteButton
    id: raw._id,                   // удобно за фронтенд
    name: raw.name,
    description: raw.description,
    price: raw.price,
    category,
    mainImage: raw.mainImage,
    galleryImages: raw.galleryImages ?? [],
    createdAt: new Date(raw.createdAt),
    isFavorite: raw.isFavorite ?? false,
  };
}
