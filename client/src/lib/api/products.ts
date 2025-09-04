import { apiFetch } from "./apiClient";
import { mapRawProduct } from "@/lib/mappers/product";
import type { Product, RawProduct } from "@/types/product";

export async function getProductById(id: string): Promise<Product | null> {
  const res = await apiFetch(`/products/${id}`);
  if (!res.ok) return null;

  const raw: RawProduct = await res.json();
  return mapRawProduct(raw);
}

export async function getProductsByIds(ids: string[]): Promise<Product[]> {
  if (ids.length === 0) return [];

  const res = await fetch(`http://localhost:3000/api/products/batch?ids=${ids.join(',')}`);
  if (!res.ok) throw new Error('Failed to fetch products');

  const data = await res.json();
  return data.products;
}


export async function getProducts(): Promise<Product[]> {
  const res = await apiFetch(`/products`);
  if (!res.ok) throw new Error("Failed to fetch products");

  const data: { items: RawProduct[] } = await res.json();
  return data.items.map(mapRawProduct);
}
