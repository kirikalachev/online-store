// src/lib/api/favorites.ts

type Product = {
  _id: string;
  name: string;
  price: number;
  isFavorite: boolean;
};

type ProductsResponse = {
  items: Product[];
};

/**
 * Връща списък с продукти, маркирани с isFavorite за текущия потребител.
 * @param token Опционален JWT токен за автентикация
 */
export async function getProductsWithFavorites(token?: string): Promise<ProductsResponse> {
  const res = await fetch("http://localhost:3000/api/favorites/products", {
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
        credentials: 'include', // <--- важната част

  });

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  return res.json();
}

/**
 * Превключва статуса на любимо (favorite) за даден продукт.
 * @param productId ID на продукта
 * @param token Опционален JWT токен за автентикация
 * @returns Обект с актуалния isFavorite статус
 */
export async function toggleFavorite(
  productId: string,
  token?: string
): Promise<{ isFavorite: boolean }> {
  const res = await fetch(`http://localhost:3000/api/favorites/${productId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    // Добавяме празно body, защото някои сървъри изискват POST да има body
    body: JSON.stringify({}),
    credentials: 'include', // <--- важната част
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Failed to toggle favorite: ${errorText}`);
  }

  return res.json();
}

