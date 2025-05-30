// components/ProductForm.ts
"use client";
import type React from "react";
import axios from "axios";
import { useState } from "react";

interface Category {
  id: string;
  name: string;
  createdAt: Date;
}

interface Props {
  onProductCreated: () => void;
  onClose: () => void;
  categories: Category[];
}

export default function ProductForm({ onProductCreated, onClose, categories }: Props) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<string>("");
  const [category, setCategory] = useState("");
  const [mainImage, setMainImage] = useState<File | null>(null);
  const [galleryImages, setGalleryImages] = useState<File[]>([]);

   const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!mainImage) {
      alert("Моля, изберете главна снимка на продукта.");
      return;
    }
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("mainImage", mainImage);

    galleryImages.forEach((file) => {
      formData.append("galleryImages", file)
    });

    try {
      await axios.post('http://localhost:3000/api/products/', formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        }
      });

      alert('Product created!');
      setName('');
      setDescription('');
      setPrice('');
      setCategory('');
      onProductCreated(); 
      onClose();
    } catch (error) {
      console.error("Error creating product:", error);
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

          <label>Главна снимка:</label>
          <input type="file" accept="image/*" onChange={(e) => {
            const file = e.target.files?.[0] || null;
            setMainImage(file);
          }} className="block w-full mb-4"/>

          <label>Допълнителни снимки:</label>
          <input type="file" accept="image/*" multiple onChange={(e) => {
            const files = Array.from(e.target.files || []);
            setGalleryImages(files);
          }} className="block w-full mb-4"/>

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

  )
}
