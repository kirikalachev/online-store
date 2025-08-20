import Link from "next/link";
import ProductSection from "@/components/products/ProductSection";

export default async function HomePage() {
  return (
    <main className="p-6">
      <Link
        href={"http://localhost:3001/admin"}
        className="text-blue-600 hover:underline block mb-6"
      >
        Администраторски панел
      </Link>

      <ProductSection />
    </main>
  );
}


// // Page.tsx
// import { getProducts } from "@/lib/getProducts";
// import Link from "next/link";

// export default async function HomePage() {
//   const products = await getProducts();

//   return (
//     <main className="p-6">
//       <Link
//         href={"http://localhost:3001/admin"}
//         className="text-blue-600 hover:underline block mb-6"
//       >
//         Администраторски панел
//       </Link>

//       {/* тук зареждаме ProductSection */}
//     </main>
//   );
// }