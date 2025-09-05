export interface PopulatedUser {
  _id: string;
  username: string;
  email: string;
}

export interface IOrderItem {
  productId: {
    _id: string;
    name: string;
    description?: string;
    price: number;
    mainImage?: string;
    // добави други полета, които ще рендерираш
  };
  quantity: number;
  priceAtTheTime: number;
}

export interface IOrder {
  _id: string;
  userId: string | PopulatedUser | null; // <--- тук
  items: IOrderItem[];
  total: number;
  status: "pending" | "confirmed" | "shipped" | "delivered" | "cancelled";
  createdAt: string;
  updatedAt: string;
}



// // src/types/order.ts

// export interface IOrderItem {
//   productId: string;      // може да е populated с името/обект на продукта
//   quantity: number;
//   priceAtTheTime: number;
// }

// export interface IOrder {
//   _id: string;
//   userId: string | null;  // ако е гост, може да е null
//   items: IOrderItem[];
//   total: number;
//   status: "pending" | "processing" | "shipped" | "completed" | "cancelled";
//   createdAt: string;      // ISO string
//   updatedAt: string;      // ISO string
//   note?: string;          // по избор
//   street?: string;
//   city?: string;
//   postalCode?: string;
//   phone?: string;
//   firstName?: string;
//   lastName?: string;
// }
