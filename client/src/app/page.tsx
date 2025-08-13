// // Page.tsx
// import { getProducts } from "@/lib/getProducts";
// import ProductCard from "@/components/products/ProductCard";
// import Link from "next/link";
// import UserProfileSection from "@/components/profile/UserProfileSection";

// export default async function HomePage() {
//   const products = await getProducts();

//   return (
//     <main className="">
//       <UserProfileSection />
//       <Link href={'http://localhost:3001/admin'}>Продукти</Link>
//       <div>
//         {products.map((product) => (
//           <ProductCard key={product.id} product={product} />
//         ))}
//       </div>
//     </main>
//   );
// }

// Page.tsx
import { getProducts } from "@/lib/getProducts";
import ProductCard from "@/components/products/ProductCard";
import Link from "next/link";

export default async function HomePage() {
  const products = await getProducts();

  return (
    <main className="p-6">
      <Link
        href={"http://localhost:3001/admin"}
        className="text-blue-600 hover:underline block mb-6"
      >
        Администраторски панел
      </Link>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
}
