// components/ProductForm.ts
"use client"

import type React from "react"
import axios from "axios"
import { useState } from "react"

interface Category {
  id: string
  name: string
}

interface Props {
  onProductCreated: () => void;
  onClose: () => void;
  categories: Category[];
}

export default function ProductForm({ onProductCreated, onClose, categories }: Props) {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState<string>("")
  // const [imageUrl, setImageUrl] = useState("")
  const [category, setCategory] = useState("")

   const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      await axios.post('http://localhost:3000/api/products/', {
        name,
        description,
        price: Number(price),
        category,
      });

      alert('Product created!');
      setName('');
      setDescription('');
      setPrice('');
      setCategory('');
      onProductCreated(); // 🔁 Обновяване на списъка
      onClose();
    } catch (error) {
      console.error("Error creating product:", error)
    }
  }

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={handleOverlayClick}>
      <div className="bg-white p-6 rounded-lg shadow-lg relative w-full max-w-md">
        {/* Затварящ бутон */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-black text-xl"
        >
          &times;
        </button>

        <h2 className="text-xl font-bold mb-4">Създай нов продукт</h2>

        <form onSubmit={handleSubmit}>
          <label>Име:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="block w-full mb-4 border px-2 py-1 rounded"
            required
          />

          <label>Описание:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="block w-full mb-4 border px-2 py-1 rounded"
            required
          />

          <label>Цена:</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="block w-full mb-4 border px-2 py-1 rounded"
            required
          />

          <label>Категория:</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="block w-full mb-4 border px-2 py-1 rounded"
            required
          >
            <option value="">Изберете категория</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
            >
              Създай продукт
            </button>
          </div>
        </form>
      </div>
    </div>
    // <form onSubmit={handleSubmit} className="max-w-md mx-auto">
    //   <label>Име:</label>
    //   <input
    //     type="text"
    //     value={name}
    //     onChange={(e) => setName(e.target.value)}
    //     className="block mb-4 border px-2 py-1 rounded"
    //     required
    //   />

    //   <label>Описание:</label>
    //   <textarea
    //     value={description}
    //     onChange={(e) => setDescription(e.target.value)}
    //     className="block mb-4 border px-2 py-1 rounded"
    //     required
    //   />

    //   <label>Цена:</label>
    //   <input
    //     type="number"
    //     value={price}
    //     onChange={(e) => setPrice(e.target.value)}
    //     className="block mb-4 border px-2 py-1 rounded"
    //     required
    //   />

    //   {/* <label>URL на изображението:</label>
    //   <input
    //     type="url"
    //     value={imageUrl}
    //     onChange={(e) => setImageUrl(e.target.value)}
    //     className="block mb-4 border px-2 py-1 rounded"
    //     required
    //   /> */}

    //   <label>Категория:</label>
    //   <select
    //     value={category}
    //     onChange={(e) => setCategory(e.target.value)}
    //     className="block mb-4 border px-2 py-1 rounded"
    //     required
    //   >
    //     <option value="">Изберете категория</option>
    //     {categories.map((cat) => (
    //       <option key={cat.id} value={cat.id}>
    //         {cat.name}
    //       </option>
    //     ))}
    //   </select>

    //   <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700">
    //     Създай продукт
    //   </button>
    // </form>
  )
}
