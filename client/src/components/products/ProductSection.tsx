"use client";

import { useEffect, useState } from "react";
import { getProductsWithFavorites, toggleFavorite } from "@/lib/api/favorites";
import ProductCard from "./ProductCard";

type Product = {
  _id: string;
  name: string;
  price: number;
  isFavorite: boolean;
};

type ProductSectionProps = {
  token?: string;
};

export default function ProductSection({ token }: ProductSectionProps) {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const data = await getProductsWithFavorites(token);

        // Нормализираме отговора, ако API-то връща масив директно или има items
        const items: Product[] = Array.isArray(data)
          ? data
          : data.items ?? [];

        setProducts(items);
      } catch (err) {
        console.error(err);
        setProducts([]); // безопасно fallback
      }
    }
    fetchProducts();
  }, [token]);

  const handleToggleFavorite = async (productId: string) => {
    try {
      const data = await toggleFavorite(productId, token);
      setProducts(prev =>
        prev.map(p => (p._id === productId ? { ...p, isFavorite: data.isFavorite } : p))
      );
    } catch (err) {
      console.error(err);
    }
  };

  if (products.length === 0) {
    return <p>Няма продукти за показване.</p>;
  }

  return (
    <div className="grid grid-cols-4 gap-4">
      {products.map(p => (
        <ProductCard
          key={p._id}
          name={p.name}
          price={p.price}
          isFavorite={p.isFavorite}
          onToggle={() => handleToggleFavorite(p._id)}
        />
      ))}
    </div>
  );
}
