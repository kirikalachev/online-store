import { Product } from "@/types/product";
import Link from "next/link";
import { useState } from "react";

type ProductCardProps = {
  product: Product;
  onToggle: () => void;
  onAddToCart: (productId: string, quantity: number) => void;
};

export default function ProductCard({ product, onToggle, onAddToCart }: ProductCardProps) {
  const [quantity, setQuantity] = useState<number>(1);

  return (
    <div className="border rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-200 p-4 bg-white relative">
      <Link href={`http://localhost:3001/products/${product.id}`} className="absolute inset-0 z-0">
        {/* Празен, само за clickable area */}
      </Link>

      {product.mainImage && (
        <div className="mb-4 z-10">
          <img
            src={`http://localhost:3000${product.mainImage}`}
            alt={product.name}
            className="w-full h-64 object-cover rounded-xl z-10"
          />
        </div>
      )}

      <h3 className="text-lg font-semibold mb-1 z-10">{product.name}</h3>
      <p className="text-lg font-bold text-red-600 mb-2 z-10">{product.price} лв.</p>

      {/* Количество */}
      <div
        className="mb-4 flex items-center relative z-20"
        onClick={(e) => {
        e.stopPropagation(); 
        }}>
        <label className="mr-2">Количество:</label>
        <input
          type="number"
          min={1}
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="w-16 p-1 border rounded"
        />
      </div>

      {/* Бутон за любими */}
      <button
        className={`absolute top-2 right-2 px-4 py-2 rounded-lg transition-colors z-20 ${
          product.isFavorite ? "bg-red-500 text-white" : "bg-gray-200 text-gray-800 hover:bg-gray-300"
        }`}
        onClick={(e) => {
          e.stopPropagation(); 
          onToggle();
        }}
      >
        {product.isFavorite ? "❤️" : "♡"}
      </button>

      {/* Бутон за добавяне в количката */}
      <button 
        className="bg-red-500 hover:bg-red-600 transition w-full p-3 rounded-lg text-white relative z-20"
        onClick={(e) => {
          e.stopPropagation();
          onAddToCart(product.id, quantity);
        }}
      >
        Добави в количката
      </button>
    </div> 
  );
}



// //ProductCard.tsx
// import { Product } from "@/types/product"; // <-- импортираме Product
// import Link from "next/link";

// type ProductCardProps = {
//   product: Product;
//   onToggle: () => void;
// };

// export default function ProductCard({ product, onToggle }: ProductCardProps) {

//   return (
//     <div className="border rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-200 p-4 bg-white relative">
//       <Link href={`http://localhost:3001/products/${product.id}`} className="absolute inset-0 z-0">
//         {/* Празен, само за clickable area */}
//       </Link>
//       {/* Снимка на продукта */}
//       {product.mainImage && (
//         <div className="mb-4 z-10">
//           <img
//             src={`http://localhost:3000${product.mainImage}`}
//             alt={product.name}
//             className="w-full h-64 object-cover rounded-xl z-10"
//           />
//         </div>
//       )}

//       {/* Име и цена */}
//       <h3 className="text-lg font-semibold mb-1 z-10">{product.name}</h3>
//       <p className="text-lg font-bold text-red-600 mb-4 z-10">{product.price} лв.</p>

//       {/* Бутон за любими */}
//       <button
//         className={`absolute top-2 right-2 px-4 py-2 rounded-lg transition-colors z-20 ${
//           product.isFavorite ? "bg-red-500 text-white" : "bg-gray-200 text-gray-800 hover:bg-gray-300"
//         }`}
//         onClick={(e) => {
//           e.stopPropagation(); 
//           onToggle();
//         }}
//       >
//         {product.isFavorite ? "❤️" : "♡"}
//       </button>
//       <button 
//         className="bg-red-500 hover:bg-red-600 transition w-full p-3 rounded-lg text-white relative z-20"
//         onClick={(e) => e.stopPropagation()}
//       >
//         Добави в количката
//       </button>
//     </div> 
//   );
// }
