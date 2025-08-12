//admin/page.tsx
"use client";
import { useEffect, useState, useCallback } from "react";
import ProductList from "@/components/admin/product/ProductList";
import ProductForm from "@/components/admin/product/ProductForm";
import CategoryForm from "@/components/admin/category/CategoryForm";
import CategoryList from "@/components/admin/category/CategoryList";
import type { Product, RawProduct, Category, RawCategory } from "@/types/product";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([])
  const [creatingProduct, setCreatingProduct] = useState(false)

  const [categories, setCategories] = useState<Category[]>([])
  const [creatingCategory, setCreatingCategory] = useState(false)

  // Мемоизирам fetchCategories
  const fetchCategories = useCallback(async () => {
    const response = await fetch("http://localhost:3000/api/categories")
    const data = (await response.json()) as RawCategory[]
    const mapped = data.map((category) => ({
      id: category._id,
      name: category.name,
      createdAt: new Date(category.createdAt),
    }))
    setCategories(mapped)
    return mapped
  }, [])

  // Мемоизирам fetchProducts, зависим от categories
  const fetchProducts = useCallback(
    async (categoriesList?: Category[]) => {
      const response = await fetch("http://localhost:3000/api/products")
      const data = (await response.json()) as RawProduct[]

      const categoriesToUse = categoriesList || categories

      const mapped = data.map((product) => {
        let categoryId: string

        if (typeof product.category === "string") {
          categoryId = product.category
        } else if (product.category && typeof product.category === "object") {
          categoryId = product.category._id
        } else {
          console.warn(`Invalid category format for product ${product.name}:`, product.category)
          categoryId = ""
        }

        const category = categoriesToUse.find((c) => c.id === categoryId)

        if (!category) {
          console.warn(`Category not found for product ${product.name}, category ID: ${categoryId}`)
          return {
            id: product._id,
            name: product.name,
            description: product.description,
            price: product.price,
            category: {
              id: categoryId || "unknown",
              name: "Unknown Category",
              createdAt: new Date(),
            },
            mainImage: product.mainImage,
            galleryImages: product.galleryImages,
            createdAt: new Date(product.createdAt),
          }
        }

        return {
          id: product._id,
          name: product.name,
          description: product.description,
          price: product.price,
          category: category,
          mainImage: product.mainImage,
          galleryImages: product.galleryImages,
          createdAt: new Date(product.createdAt),
        }
      })

      setProducts(mapped)
    },
    [categories]
  )

  const handleProductCreated = async () => {
    // Reload products after creating a new one
    await fetchProducts()
  }

  const handleCategoryCreated = async () => {
    // Reload categories and then products after creating a new category
    const newCategories = await fetchCategories()
    await fetchProducts(newCategories)
  }

  useEffect(() => {
    const loadData = async () => {
      try {
        const loadedCategories = await fetchCategories()
        await fetchProducts(loadedCategories)
      } catch (error) {
        console.error("Error loading data:", error)
      }
    }

    loadData()
  }, [fetchCategories, fetchProducts])

  useEffect(() => {
    setProducts((prev) =>
      prev.map((p) => {
        const updatedCategory = categories.find((c) => c.id === p.category.id)
        if (!updatedCategory) return p
        return { ...p, category: updatedCategory }
      })
    )
  }, [categories])

  return (
    <main>
      <h1 className="text-2xl m-5">Администраторски панел</h1>
      <div className="bg-green-800">
        <h2 className="text-xl m-3">Управление на продуктите:</h2>
        <button
          className="bg-green-200 rounded p-4 m-2"
          onClick={() => setCreatingProduct(!creatingProduct)}
        >
          {creatingProduct ? "Затвори" : "Създай продукт"}
        </button>
        {creatingProduct ? (
          <ProductForm
            onProductCreated={handleProductCreated}
            onClose={() => setCreatingProduct(false)}
            categories={categories}
          />
        ) : null}

        <h3 className="text-lg m-2">Създадени продукти:</h3>
        <ProductList products={products} setProducts={setProducts} categories={categories} />
      </div>
      <hr />

      <div className="bg-orange-900">
        <h2 className="text-xl m-3">Управление на категориите:</h2>
        <button
          className="bg-green-200 rounded p-4 m-2"
          onClick={() => setCreatingCategory(!creatingCategory)}
        >
          {creatingCategory ? "Затвори" : "Създай категория"}
        </button>
        {creatingCategory ? (
          <CategoryForm onCategoryCreated={handleCategoryCreated} onClose={() => setCreatingCategory(false)} />
        ) : null}

        <h3 className="text-lg m-2">Създадени категории:</h3>
        <CategoryList categories={categories} setCategories={setCategories} />
      </div>
    </main>
  )
}
