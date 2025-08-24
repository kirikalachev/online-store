"use client";

import { useEffect, useState } from "react";
import { Product } from "@/types/product"; // <-- импортираме Product
import { getProductsWithFavorites } from "@/lib/api/favorites";

function FavoriteProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

    useEffect(() => {
  async function fetchFavorites() {
    try {
      const data = await getProductsWithFavorites(); // { items: Product[] }
      // взимаме само любимите
      const favoriteItems = data.items.filter(p => p.isFavorite);
      setProducts(favoriteItems);
    } catch (error) {
      console.error("Грешка при зареждане на любими продукти:", error);
    } finally {
      setLoading(false);
    }
  }
  fetchFavorites();
}, []);


  if (loading) {
    return <p>Зареждане...</p>;
  }

  if (products.length === 0) {
    return <p>Нямате запазени продукти.</p>;
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {products.map((product) => (
        <div key={product.id} className="border rounded-lg p-2 shadow">
          {product.mainImage && (
            <img
              src={`http://localhost:3000${product.mainImage}`}
              alt={product.name}
              className="w-full h-40 object-cover rounded"
            />
          )}
          <h3 className="text-lg font-semibold">{product.name}</h3>
          <p>{product.price} лв.</p>
        </div>
      ))}
    </div>
  );
}

export default FavoriteProducts;
