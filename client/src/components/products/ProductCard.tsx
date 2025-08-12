import { Product } from "@/types/product";
import Image from "next/image";
import Link from "next/link";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product } : ProductCardProps) {
  return (
    <div>
      <h2>{product.name}</h2>
      <p>Описание: {product.description}</p>
      <p>Цена: {product.price}</p>
      <Image src={`http://localhost:3000${product.mainImage}`} alt={product.name} width={100} height={100}/>
      <Link
        href={`http://localhost:3001/products/${product.id}`}
        className="bg-green-300 p-2 rounded"
      >
        Виж продукт
      </Link>

      <button className="bg-red-300 p-2 rounded">Добави в количка</button>
      <button className="bg-blue-300 p-2 rounded">Запази в любиими</button>
    </div>
  )
}
