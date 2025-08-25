'use client';
import { useState } from "react";
import { toggleFavorite } from "@/lib/api/favorites";

type FavoriteButtonProps = {
  productId: string;
  initialIsFavorite: boolean;
  token?: string;
};

export default function FavoriteButton({ productId, initialIsFavorite, token }: FavoriteButtonProps) {
  const [isFavorite, setIsFavorite] = useState(initialIsFavorite);
  // console.log(isFavorite);
  const handleClick = async () => {
    try {
      const data = await toggleFavorite(productId, token);
      setIsFavorite(data.isFavorite);
        console.log(isFavorite);

    } catch (err) {
      console.error(err);
    }
  };

  return (
    <button
      className={`px-6 py-3 rounded-lg transition ${
        isFavorite ? "bg-red-600 text-white" : "bg-white border border-gray-400 hover:bg-gray-100"
      }`}
      onClick={handleClick}
    >
      {isFavorite ? "❤️ Запазен" : "♡ Запази в любими"}
    </button>
  );
}
