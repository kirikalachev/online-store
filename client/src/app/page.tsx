// page.tsx
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