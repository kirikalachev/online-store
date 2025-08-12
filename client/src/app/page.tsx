// Page.tsx
import { getProducts } from "@/lib/getProducts";
import ProductCard from "@/components/products/ProductCard";
import Link from "next/link";
import UserProfileSection from "@/components/profile/UserProfileSection";

export default async function HomePage() {
  const products = await getProducts();

  return (
    <main className="">
      <UserProfileSection />
      <Link href={'http://localhost:3001/admin'}>Продукти</Link>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </main>
  );
}