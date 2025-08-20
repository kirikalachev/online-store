"use client";

type ProductCardProps = {
  name: string;
  price: number;
  isFavorite: boolean;
  onToggle: () => void; // функция без аргументи
};

export default function ProductCard({ name, price, isFavorite, onToggle }: ProductCardProps) {
  return (
    <div className="border p-4 flex flex-col items-center">
      <h2 className="text-lg font-semibold">{name}</h2>
      <p className="text-gray-700">{price} лв.</p>
      <button
        onClick={onToggle}
        className="mt-2 px-3 py-1 bg-red-500 text-white rounded"
      >
        {isFavorite ? "💖" : "🤍"}
      </button>
    </div>
  );
}
