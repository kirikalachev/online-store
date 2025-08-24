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


// export interface RawProduct {
//   _id: string;
//   name: string;
//   description: string;
//   price: number;
//   category: string | { _id: string; name: string; createdAt: string }; // <-- fix
//   mainImage: string;
//   galleryImages: string[]; // винаги ще нормализираме в mapProducts
//   createdAt: string; // <-- fix (Mongo връща ISO string)
//   isFavorite?: boolean;
// }

// export interface RawCategory {
//   _id: string;
//   name: string;
//   createdAt: string; // <-- fix
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
//   isFavorite?: boolean;
// }












// export interface RawProduct {
//   _id: string
//   name: string
//   description: string
//   price: number
//   category: string | { _id: string; name: string; createdAt: Date }
//   mainImage: string;
//   galleryImages: string[]; // string или string в rawProduct?
//   createdAt: Date;
// }


// export interface RawCategory {
//   _id: string;
//   name: string;
// //   createdAt: string;
//   createdAt: Date;

// }

// // Трансформираните типове (каквито UI-то очаква)
// export interface Category {
//   id: string;
//   name: string;
// //   createdAt: string;
//   createdAt: Date;

// }

// // export interface Product {
// //   id: string;
// //   name: string;
// //   description: string;
// //   price: number;
// //   category: Category;
// //   mainImage: string;
// //   galleryImages: string[];
// //   createdAt: Date;

// // }


// export interface Product {
//   id: string;
//   name: string;
//   description: string;
//   price: number;
//   category: Category;
//   mainImage: string;
//   galleryImages: string[];
//   createdAt: Date;
//   isFavorite?: boolean; // ново поле за UI
// }
