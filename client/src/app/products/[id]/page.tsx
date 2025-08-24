// src/app/product/[id]/page.tsx
import FavoriteButton from "./FavoriteButton";
import { notFound } from "next/navigation";
import { Product } from "@/types/product";
import Image from "next/image";

interface ProductWithRawId extends Product {
  _id: string;
}

async function getProduct(id: string): Promise<ProductWithRawId | null> {
  const res = await fetch(`http://localhost:3000/api/products/${id}`, { cache: "no-store" });
  if (!res.ok) return null;
  return (await res.json()) as ProductWithRawId;
}


// async function getProduct(id: string): Promise<Product | null> {
//   try {
//     const res = await fetch(`http://localhost:3000/api/products/${id}`, {
//       cache: "no-store",
//     });
//     if (!res.ok) return null;
//     return (await res.json()) as Product;
//   } catch {
//     return null;
//   }
// }

interface ProductPageProps {
  params: Promise<{ id: string }>; // 👈 важно: Promise
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params; // 👈 изчакваш params
  const product = await getProduct(id);

  if (!product) return notFound();

  const galleryImages = product.galleryImages || [];

  return (
    <div className="p-4 max-w-6xl mx-auto">
      {/* Продуктова секция */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Изображения */}
        <div>
          {product.mainImage && (
            <div className="relative w-full h-[400px] rounded-lg overflow-hidden border shadow">
              <Image
                src={`http://localhost:3000${product.mainImage}`}
                alt={product.name}
                fill
                sizes="100vw"
                className="object-cover"
              />
            </div>
          )}
        </div>

        {/* Информация за продукта */}
        <div>
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="mt-2 text-gray-700">{product.description}</p>
          <p className="mt-4 text-2xl font-semibold text-red-600">
            {product.price} лв.
          </p>
          <div className="mt-6 flex gap-4">
            <button className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition">
              Добави в количката
            </button>

            {/* <FavoriteButton
              productId={product.id}
              initialIsFavorite={product.isFavorite}
              token={undefined} // можеш да подадеш токена на потребителя, ако имаш
            /> */}
            <FavoriteButton
              productId={product._id} // важно: _id, не id
              initialIsFavorite={product.isFavorite}
              // token={token}
            />

          </div>
          <div className="mt-6 text-sm text-gray-500">
            <p>🚚 Безплатна доставка при поръчки над 100 лв.</p>
            <p>📦 Време за доставка: 2-3 работни дни</p>
          </div>
            {galleryImages.length > 0 && (
            <div className="mt-4 flex gap-3 flex-wrap">
              <div className="relative w-20 h-20 rounded overflow-hidden border hover:scale-105 transition">
                <Image
                  src={`http://localhost:3000${product.mainImage}`}
                  alt={product.name}
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </div>
              {galleryImages.map((imgPath, i) => (
                <div
                  key={i}
                  className="relative w-20 h-20 rounded overflow-hidden border hover:scale-105 transition"
                >
                  <Image
                    src={`http://localhost:3000${imgPath}`}
                    // src={`http://localhost:3000/api/products/${id}${imgPath}`}
                    alt={`Галерия ${i + 1}`}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

           <div className="mt-12">
       <h2 className="text-2xl font-bold mb-4">Ревюта на клиенти</h2>
       <div className="space-y-4">
         <div className="border p-4 rounded-lg shadow-sm">
           <p className="font-semibold">Иван Иванов</p>
           <p className="text-sm text-gray-500">⭐⭐⭐⭐⭐</p>
           <p className="mt-2">Страхотен продукт! Много добро качество.</p>
         </div>
         <div className="border p-4 rounded-lg shadow-sm">
           <p className="font-semibold">Мария Петрова</p>
           <p className="text-sm text-gray-500">⭐⭐⭐⭐</p>
           <p className="mt-2">Добър продукт, но доставката беше малко бавна.</p>
         </div>
       </div>
     </div>
    </div>
  );
}