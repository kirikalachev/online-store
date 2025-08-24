// // //  utilis/transform.ts
// // //  utilis/transform.ts
import { RawProduct, Product, Category } from "@/types/product";

// export function mapRawProduct(raw: RawProduct): Product {
//   return {
//     id: raw._id,
//     name: raw.name,
//     description: raw.description,
//     price: raw.price,
//     category: typeof raw.category === "string"
//       ? { id: raw.category, name: "", createdAt: new Date() } // ако бекендът връща само id
//       : {
//           id: raw.category._id,
//           name: raw.category.name,
//           createdAt: new Date(raw.category.createdAt),
//         },
//     mainImage: raw.mainImage,
//     galleryImages: raw.galleryImages ?? [],
//     createdAt: new Date(raw.createdAt),
//     isFavorite: raw.isFavorite,
//   };
// }

// import type { RawProduct, Product } from "@/types/product";

export function mapRawProduct(raw: RawProduct): Product {
  return {
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
