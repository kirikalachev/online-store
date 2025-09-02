// src/app/product/[id]/page.tsx
import FavoriteButton from "./FavoriteButton";
import ProductImages from "./ProductImages";
import { notFound } from "next/navigation";
import { Product } from "@/types/product";

interface ProductWithRawId extends Product {
  _id: string;
}

// Функция за взимане на продукт + проверка за любими
async function getProductWithFavorite(id: string): Promise<ProductWithRawId | null> {
  // Взимаме самия продукт
  const resProduct = await fetch(`http://localhost:3000/api/products/${id}`, { cache: "no-store" });
  if (!resProduct.ok) return null;
  const product = (await resProduct.json()) as ProductWithRawId;

  // Проверяваме дали е в любими
  const resFav = await fetch(`http://localhost:3000/api/favorites/${id}`, {
    cache: "no-store",
    headers: {
      // Ако имаш сесия/токен, може да го добавиш тук
      // "Authorization": `Bearer ${token}`
    },
  });

  if (resFav.ok) {
    const favProduct = await resFav.json();
    product.isFavorite = favProduct.isFavorite ?? true;
  } else {
    product.isFavorite = false; // ако не е в любими
  }

  return product;
}

interface ProductPageProps {
  params: Promise<{ id: string }>; 
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params; 
  const product = await getProductWithFavorite(id);

  if (!product) return notFound();

  const galleryImages = product.galleryImages || [];

  return (
    <div className="p-4 max-w-6xl mx-auto">
      {/* Продуктова секция */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Изображения */}
        <ProductImages               
          mainImage={product.mainImage}
          galleryImages={product.galleryImages}
        />

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

            <FavoriteButton
              productId={product._id}
              initialIsFavorite={product.isFavorite}
            />
          </div>
          <div className="mt-6 text-sm text-gray-500">
            <p>🚚 Безплатна доставка при поръчки над 100 лв.</p>
            <p>📦 Време за доставка: 2-3 работни дни</p>
          </div>
        </div>
      </div>

      {/* Ревюта на клиенти */}
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


// // src/app/product/[id]/page.tsx
// import FavoriteButton from "./FavoriteButton";
// import ProductImages from "./ProductImages";
// import { notFound } from "next/navigation";
// import { Product } from "@/types/product";
// import Image from "next/image";

// interface ProductWithRawId extends Product {
//   _id: string;
// }

// async function getProduct(id: string): Promise<ProductWithRawId | null> {
//   const res = await fetch(`http://localhost:3000/api/products/${id}`, { cache: "no-store" });
//   if (!res.ok) return null;
//   return (await res.json()) as ProductWithRawId;
// }

// interface ProductPageProps {
//   params: Promise<{ id: string }>; 
// }

// export default async function ProductPage({ params }: ProductPageProps) {
//   const { id } = await params; 
//   const product = await getProduct(id);

//   if (!product) return notFound();

//   const galleryImages = product.galleryImages || [];



//   return (
//     <div className="p-4 max-w-6xl mx-auto">
//       {/* Продуктова секция */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//         {/* Изображения */}
//         <ProductImages               
//           mainImage={product.mainImage} // важно: _id, не id
//           galleryImages={product.galleryImages}
//         />

//         {/* Информация за продукта */}
//         <div>
//           <h1 className="text-3xl font-bold">{product.name}</h1>
//           <p className="mt-2 text-gray-700">{product.description}</p>
//           <p className="mt-4 text-2xl font-semibold text-red-600">
//             {product.price} лв.
//           </p>
//           <div className="mt-6 flex gap-4">
//             <button className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition">
//               Добави в количката
//             </button>

        
//             <FavoriteButton
//               productId={product._id} // важно: _id, не id
//               initialIsFavorite={product.isFavorite}
//               // token={token}
//             />

//           </div>
//           <div className="mt-6 text-sm text-gray-500">
//             <p>🚚 Безплатна доставка при поръчки над 100 лв.</p>
//             <p>📦 Време за доставка: 2-3 работни дни</p>
//           </div>
//         </div>
//       </div>

//            <div className="mt-12">
//        <h2 className="text-2xl font-bold mb-4">Ревюта на клиенти</h2>
//        <div className="space-y-4">
//          <div className="border p-4 rounded-lg shadow-sm">
//            <p className="font-semibold">Иван Иванов</p>
//            <p className="text-sm text-gray-500">⭐⭐⭐⭐⭐</p>
//            <p className="mt-2">Страхотен продукт! Много добро качество.</p>
//          </div>
//          <div className="border p-4 rounded-lg shadow-sm">
//            <p className="font-semibold">Мария Петрова</p>
//            <p className="text-sm text-gray-500">⭐⭐⭐⭐</p>
//            <p className="mt-2">Добър продукт, но доставката беше малко бавна.</p>
//          </div>
//        </div>
//      </div>
//     </div>
//   );
// }