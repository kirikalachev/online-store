import { Product } from '@/types/product';

export function toRawProduct(product: Product) {
  return {
    _id: product.id,
    name: product.name,
    description: product.description,
    price: product.price,
    category: product.category.id, // 🟢 Тук подаваме само ID
    createdAt: product.createdAt,
  };
}
