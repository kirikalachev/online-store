// client/src/components/products/ProductCard.tsx
"use client";

type ProductCardProps = {
  name: string;
  price: number;
  isFavorite: boolean;
  onToggle: () => void;
};

export default function ProductCard({ name, price, isFavorite, onToggle }: ProductCardProps) {
  return (
    <div className="border p-2">
      <h3>{name}</h3>
      <p>${price}</p>
      <button
        className={`px-2 py-1 mt-2 rounded ${isFavorite ? "bg-red-500 text-white" : "bg-gray-200"}`}
        onClick={onToggle}
      >
        {isFavorite ? "❤️" : "♡"}
      </button>
    </div>
  );
}
