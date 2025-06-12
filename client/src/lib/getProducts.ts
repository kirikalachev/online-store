import axios from "axios"
import { RawProduct, Product } from "@/types/product"
import { mapProducts } from "./mapProducts"

export async function getProducts(): Promise<Product[]> {
  const response = await axios.get<RawProduct[]>("http://localhost:3000/api/products", {
    // force-cache за Next.js 14 App Router
    headers: {
      "Cache-Control": "force-cache",
    },
  })

  return mapProducts(response.data)
}