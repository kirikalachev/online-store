// import { Product } from "@/types/product";
// import Image from "next/image";
// import Link from "next/link";

// interface ProductCardProps {
//   product: Product;
// }

// export default function ProductCard({ product } : ProductCardProps) {
//   return (
//     <div>
//       <h2>{product.name}</h2>
//       <p>Описание: {product.description}</p>
//       <p>Цена: {product.price}</p>
//       <Image src={`http://localhost:3000${product.mainImage}`} alt={product.name} width={100} height={100}/>
//       <Link
//         href={`http://localhost:3001/products/${product.id}`}
//         className="bg-green-300 p-2 rounded"
//       >
//         Виж продукт
//       </Link>

//       <button className="bg-red-300 p-2 rounded">Добави в количка</button>
//       <button className="bg-blue-300 p-2 rounded">Запази в любиими</button>
//     </div>
//   )
// }


import { Product } from "@/types/product";
import Image from "next/image";
import Link from "next/link";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="border rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-200 p-4 bg-white">
      <div className="mb-4">
        <Image
          src={`http://localhost:3000${product.mainImage}`}
          alt={product.name}
          width={400}
          height={400}
          className="w-full h-64 object-cover rounded-xl"
        />
      </div>

      <h2 className="text-lg font-semibold mb-1">{product.name}</h2>
      <p className="text-sm text-gray-600 mb-2">{product.description}</p>
      <p className="text-lg font-bold text-red-600 mb-4">{product.price} лв</p>

      <div className="flex gap-2">
        <Link
          href={`http://localhost:3001/products/${product.id}`}
          className="flex-1 text-center bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-lg transition-colors"
        >
          Виж продукт
        </Link>

        <button className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors">
          Добави
        </button>

        <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-lg transition-colors">
          Любими
        </button>
      </div>
    </div>
  );
}
