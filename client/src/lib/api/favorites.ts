// favorites.ts

import { apiFetch } from './apiClient';
import { mapRawProduct } from "@/utils/transform";
import type { Product, RawProduct } from "@/types/product";

type ProductsResponse = {
  items: Product[];
};

export async function getProductsWithFavorites(): Promise<ProductsResponse> {
  const res = await apiFetch('/favorites/products');

  if (!res.ok) throw new Error("Failed to fetch products");

  const data: { items: RawProduct[] } = await res.json();
  const items = data.items.map(mapRawProduct);

  return { items };
}

export async function toggleFavorite(productId: string): Promise<{ isFavorite: boolean }> {
  const res = await apiFetch(`/favorites/${productId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({}),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Failed to toggle favorite: ${errorText}`);
  }

  return res.json();
}
