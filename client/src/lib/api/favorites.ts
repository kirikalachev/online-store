// favorites.ts
import { mapRawProduct } from "@/utils/transform";
import type { Product, RawProduct } from "@/types/product";

type ProductsResponse = {
  items: Product[];
};

export async function getProductsWithFavorites(token?: string): Promise<ProductsResponse> {
  const res = await fetch("http://localhost:3000/api/favorites/products", {
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    credentials: 'include',
  });

  if (!res.ok) throw new Error("Failed to fetch products");

  const data: { items: RawProduct[] } = await res.json();
  const items = data.items.map(mapRawProduct);

  return { items };
}

export async function toggleFavorite(productId: string, token?: string): Promise<{ isFavorite: boolean }> {
  const res = await fetch(`http://localhost:3000/api/favorites/${productId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify({}),
    credentials: 'include',
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Failed to toggle favorite: ${errorText}`);
  }

  return res.json();
}