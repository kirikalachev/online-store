// components/Navbar.tsx
"use client"

import Link from "next/link"

export default function Navbar() {
  return (
    <nav className="bg-gray-800 text-white p-4 flex gap-6">
      <Link href="/" className="hover:underline">
        Начало
      </Link>
      <Link href="/profile" className="hover:underline">
        Профил
      </Link>
      <Link href="/admin" className="hover:underline">
        Админ
      </Link>
    </nav>
  )
}
