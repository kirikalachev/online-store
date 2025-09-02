// /types/product.ts
export interface RawProduct {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string | { _id: string; name: string; createdAt: string };
  mainImage: string;
  galleryImages: string[];
  createdAt: string;
  isFavorite?: boolean;
}

export interface RawCategory {
  _id: string;
  name: string;
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  createdAt: Date;
}

export interface Product {
  _id: string;
  id: string;
  name: string;
  description: string;
  price: number;
  category: Category;
  mainImage: string;
  galleryImages: string[];
  createdAt: Date;
  isFavorite: boolean;
}

// // /types/product.ts
// export interface RawProduct {
//   _id: string;
//   name: string;
//   description: string;
//   price: number;
//   category: string | { _id: string; name: string; createdAt: string };
//   mainImage: string;
//   galleryImages: string[];
//   createdAt: string;
//   isFavorite?: boolean;
// }

// export interface RawCategory {
//   _id: string;
//   name: string;
//   createdAt: string;
// }

// export interface Category {
//   id: string;
//   name: string;
//   createdAt: Date;
// }

// export interface Product {
//   id: string;
//   name: string;
//   description: string;
//   price: number;
//   category: Category;
//   mainImage: string;
//   galleryImages: string[];
//   createdAt: Date;
//   isFavorite: boolean;
// }