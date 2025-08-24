// src/app/product/[id]/page.tsx
// src/app/product/[id]/page.tsx

import { notFound } from "next/navigation";
import { Product } from "@/types/product";
import Image from "next/image";

async function getProduct(id: string): Promise<Product | null> {
  try {
    const res = await fetch(`http://localhost:3000/api/products/${id}`, {
      cache: "no-store",
    });
    if (!res.ok) return null;
    return (await res.json()) as Product;
  } catch {
    return null;
  }
}

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
            <button className="px-6 py-3 border border-gray-400 rounded-lg hover:bg-gray-100 transition">
              Купи сега
            </button>
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

      {/* … ревюта и подобни продукти (същите както при теб) … */}
    </div>
  );
}



// import { notFound } from "next/navigation";
// import { Product } from '@/types/product'; 
// import Image from "next/image";
// import axios from "axios";

// async function getProduct(id: string): Promise<Product | null> {
//   try {
//     const res = await axios.get(`http://localhost:3000/api/products/${id}`);
//     return res.data as Product;
//   } catch (error) {
//     return null;
//   }
// }

// export default async function ProductPage({ params }: { params: { id: string } }) {
//   const product = await getProduct(params.id);

//   if (!product) return notFound();

//   const galleryImages = product.galleryImages || [];

// return (
//   <div className="p-4 max-w-6xl mx-auto">
//     {/* Продуктова секция */}
//     <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//       {/* Изображения */}
//       <div>
//         {product.mainImage && (
//           <div className="relative w-full h-[400px] rounded-lg overflow-hidden border shadow">
//             <Image
//               src={`http://localhost:3000${product.mainImage}`}
//               alt={product.name}
//               fill
//               sizes="100vw"
//               className="object-cover"
//             />
//           </div>
//         )}

//         {/* Галерия */}
//         {galleryImages.length > 0 && (
//           <div className="mt-4 flex gap-3 flex-wrap">
//             {galleryImages.map((imgPath, i) => (
//               <div key={i} className="relative w-20 h-20 rounded overflow-hidden border hover:scale-105 transition">
//                 <Image
//                   src={`http://localhost:3000${imgPath}`}
//                   alt={`Галерия ${i + 1}`}
//                   fill
//                   sizes="80px"
//                   className="object-cover"
//                 />
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//       {/* Информация за продукта */}
//       <div>
//         <h1 className="text-3xl font-bold">{product.name}</h1>
//         <p className="mt-2 text-gray-700">{product.description}</p>
//         <p className="mt-4 text-2xl font-semibold text-red-600">
//           {product.price} лв.
//         </p>

//         {/* Бутони за действие */}
//         <div className="mt-6 flex gap-4">
//           <button className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition">
//             Добави в количката
//           </button>
//           <button className="px-6 py-3 border border-gray-400 rounded-lg hover:bg-gray-100 transition">
//             Купи сега
//           </button>
//         </div>

//         {/* Dummy инфо */}
//         <div className="mt-6 text-sm text-gray-500">
//           <p>🚚 Безплатна доставка при поръчки над 100 лв.</p>
//           <p>📦 Време за доставка: 2-3 работни дни</p>
//         </div>
//       </div>
//     </div>

//     {/* Секция с ревюта */}
//     <div className="mt-12">
//       <h2 className="text-2xl font-bold mb-4">Ревюта на клиенти</h2>
//       <div className="space-y-4">
//         <div className="border p-4 rounded-lg shadow-sm">
//           <p className="font-semibold">Иван Иванов</p>
//           <p className="text-sm text-gray-500">⭐⭐⭐⭐⭐</p>
//           <p className="mt-2">Страхотен продукт! Много добро качество.</p>
//         </div>
//         <div className="border p-4 rounded-lg shadow-sm">
//           <p className="font-semibold">Мария Петрова</p>
//           <p className="text-sm text-gray-500">⭐⭐⭐⭐</p>
//           <p className="mt-2">Добър продукт, но доставката беше малко бавна.</p>
//         </div>
//       </div>
//     </div>

//     {/* Секция с подобни продукти */}
//     <div className="mt-12">
//       <h2 className="text-2xl font-bold mb-4">Подобни продукти</h2>
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
//         {[1, 2, 3, 4].map((i) => (
//           <div key={i} className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition">
//             <div className="relative w-full h-40 bg-gray-200">
//               <Image
//                 src={`http://localhost:3000${product.mainImage}`}
//                 alt={product.name}
//                 fill
//                 sizes="100vw"
//                 className="object-cover"
//               />
//             </div>
//             <div className="p-3">
//               <h3 className="font-semibold">Продукт {i}</h3>
//               <p className="text-red-600 font-bold">99.99 лв.</p>
//               <button className="mt-2 w-full px-3 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition">
//                 Добави
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   </div>
// )


// }
