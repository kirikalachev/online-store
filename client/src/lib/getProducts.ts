// lib/getProducts.ts

import axios from "axios";
import { RawProduct, Product } from "@/types/product";
import { mapProducts } from "./mapProducts";

export async function getProducts(userId?: string): Promise<Product[]> {
  const url = `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api"}/products`;
  const params = userId ? { userId } : {};

  const response = await axios.get<RawProduct[]>(url, { params });
  return mapProducts(response.data); // mapProducts вече работи с isFavorite
}
