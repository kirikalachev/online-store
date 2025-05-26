// /types/product.ts

export interface RawProduct {
  _id: string
  name: string
  description: string
  price: number
  category: string | { _id: string; name: string; createdAt: Date } // 🆕 може да е string или обект
  createdAt: Date
}


export interface RawCategory {
  _id: string;
  name: string;
//   createdAt: string;
  createdAt: Date;

}

// Трансформираните типове (каквито UI-то очаква)
export interface Category {
  id: string;
  name: string;
//   createdAt: string;
  createdAt: Date;

}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: Category;
//   createdAt: string;
  createdAt: Date;

}
