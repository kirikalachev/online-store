//  utilis/transform.ts
import { RawProduct, Product, Category } from "@/types/product";
import type { RawCartItem, CartItem } from "@/types/cart";

export function mapRawProduct(raw: RawProduct): Product {
  return {
    _id: raw._id,
    id: raw._id,
    name: raw.name,
    description: raw.description,
    price: raw.price,
    category: typeof raw.category === "string"
      ? { id: raw.category, name: "", createdAt: new Date() }
      : { id: raw.category._id, name: raw.category.name, createdAt: new Date(raw.category.createdAt) },
    mainImage: raw.mainImage,
    galleryImages: raw.galleryImages ?? [],
    createdAt: new Date(raw.createdAt),
    isFavorite: raw.isFavorite ?? false,
  };
}

// src/utils/transform.ts

export function mapRawCartItem(raw: RawCartItem): CartItem {
  // Ако имаш нужда, може да fetch-неш product info, или да го подадеш от backend
  return {
    product: { _id: raw.productId, name: "", price: raw.priceAtTheTime } as Product,
    quantity: raw.quantity,
    price: raw.priceAtTheTime
  };
}
