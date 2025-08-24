// ProductSection.tsx
'use client';
import { useEffect, useState } from "react";
import { getProductsWithFavorites, toggleFavorite } from "@/lib/api/favorites";
import ProductCard from "./ProductCard";
import type { Product } from "@/types/product";

type ProductSectionProps = {
  token?: string;
};

export default function ProductSection({ token }: ProductSectionProps) {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const data = await getProductsWithFavorites(token);
        setProducts(data.items);
      } catch (err) {
        console.error(err);
        setProducts([]);
      }
    }
    fetchProducts();
  }, [token]);

  const handleToggleFavorite = async (id: string) => {
    try {
      const data = await toggleFavorite(id, token);
      setProducts(prev =>
        prev.map(p => p.id === id ? { ...p, isFavorite: data.isFavorite } : p)
      );
    } catch (err) {
      console.error(err);
    }
  };

  if (products.length === 0) return <p>Няма продукти за показване.</p>;

  return (
    <div className="grid grid-cols-4 gap-4">
      {products.map(p => (
        <ProductCard
          key={p.id}
          product={p}
          onToggle={() => handleToggleFavorite(p.id)}
        />
      ))}
    </div>
  );
}
