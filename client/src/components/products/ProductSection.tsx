'use client';
import { useEffect, useState } from "react";
import { getProductsWithFavorites, toggleFavorite } from "@/lib/api/favorites";
import { addToCart } from "@/lib/api/cart";
import ProductCard from "./ProductCard";
import type { Product } from "@/types/product";

export default function ProductSection() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const data = await getProductsWithFavorites();
        setProducts(data.items);
      } catch (err) {
        console.error(err);
        setProducts([]);
      }
    }
    fetchProducts();
  }, []);

  const handleToggleFavorite = async (id: string) => {
    try {
      const data = await toggleFavorite(id);
      setProducts(prev =>
        prev.map(p => p.id === id ? { ...p, isFavorite: data.isFavorite } : p)
      );
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddToCart = async (productId: string, quantity: number) => {
    try {
      await addToCart(productId, quantity);
      alert(`Добавихте ${quantity} бр. в количката!`);
    } catch (err) {
      console.error(err);
      alert("Грешка при добавяне в количката.");
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
          onAddToCart={handleAddToCart}
        />
      ))}
    </div>
  );
}


// // ProductSection.tsx
// 'use client';
// import { useEffect, useState } from "react";
// import { getProductsWithFavorites, toggleFavorite } from "@/lib/api/favorites";
// import ProductCard from "./ProductCard";
// import type { Product } from "@/types/product";

// export default function ProductSection() {
//   const [products, setProducts] = useState<Product[]>([]);

//   useEffect(() => {
//     async function fetchProducts() {
//       try {
//         const data = await getProductsWithFavorites();
//         setProducts(data.items);
//       } catch (err) {
//         console.error(err);
//         setProducts([]);
//       }
//     }
//     fetchProducts();
//   }, []);

//   const handleToggleFavorite = async (id: string) => {
//     try {
//       const data = await toggleFavorite(id);
//       setProducts(prev =>
//         prev.map(p => p.id === id ? { ...p, isFavorite: data.isFavorite } : p)
//       );
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   if (products.length === 0) return <p>Няма продукти за показване.</p>;

//   return (
//     <div className="grid grid-cols-4 gap-4">
//       {products.map(p => (
//         <ProductCard
//           key={p.id}
//           product={p}
//           onToggle={() => handleToggleFavorite(p.id)}
//         />
//       ))}
//     </div>
//   );
// }
