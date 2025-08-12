// src/app/product/[id]/page.tsx

import { notFound } from "next/navigation";
import { Product } from '@/types/product'; 
import Image from "next/image";
import axios from "axios";

async function getProduct(id: string): Promise<Product | null> {
  try {
    const res = await axios.get(`http://localhost:3000/api/products/${id}`);
    return res.data as Product;
  } catch (error) {
    return null;
  }
}

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id);

  if (!product) return notFound();

  const galleryImages = product.galleryImages || [];

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">{product.name}</h1>

      {/* Главно изображение */}
      {product.mainImage && (
        <div className="relative w-full h-64 my-4 rounded overflow-hidden">
          <Image
            src={`http://localhost:3000${product.mainImage}`}
            alt={product.name}
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
      )}

      <p className="text-lg">{product.description}</p>
      <p className="mt-2 font-semibold">Цена: {product.price} лв.</p>

      {/* Галерия с допълнителни изображения */}
      {galleryImages.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Още изображения:</h2>
          <div className="flex flex-wrap gap-4">
            {galleryImages.map((imgPath, i) => (
              <div key={i} className="relative w-32 h-32 rounded overflow-hidden">
                <Image
                  src={`http://localhost:3000${imgPath}`}
                  alt={`Галерия ${i + 1}`}
                  fill
                  sizes="128px"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
