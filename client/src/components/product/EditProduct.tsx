'use client';
import { useState } from 'react';
import { Product, Category } from '@/types/product';

interface Props {
  product: Product;
  categories: Category[]; // 🆕 Добавяме списък с налични категории
  onCancel: () => void;
  onSave: (updatedProduct: Product) => void;
}

export default function EditTab({ product, categories, onCancel, onSave }: Props) {
  const [name, setName] = useState(product.name);
  const [description, setDescription] = useState(product.description);
  const [price, setPrice] = useState(product.price);
  const [selectedCategoryId, setSelectedCategoryId] = useState(product.category.id); // 🆕 Работим с ID

  const handleSubmit = () => {
    if (!name.trim() || price <= 0 || !selectedCategoryId) {
      alert("Моля, попълнете всички полета коректно.");
      return;
    }

    // 🧠 Намираме пълния Category обект по ID
    const category = categories.find(cat => cat.id === selectedCategoryId);
    if (!category) {
      alert("Избраната категория не е валидна.");
      return;
    }

    const updated: Product = {
      ...product,
      name,
      description,
      price,
      category // 🟢 Подаваме пълен обект, не само ID
    };

    onSave(updated);
  };

  return (
    <div className="bg-white p-4 rounded shadow-md w-full max-w-md">
      <label className="block mb-2">
        Име:
        <input
          className="w-full border px-2 py-1 rounded"
          value={name}
          onChange={e => setName(e.target.value)}
        />
      </label>

      <label className="block mb-2">
        Цена:
        <input
          className="w-full border px-2 py-1 rounded"
          type="number"
          value={price}
          onChange={e => setPrice(Number(e.target.value))}
        />
      </label>

      <label className="block mb-2">
        Описание:
        <input
          className="w-full border px-2 py-1 rounded"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
      </label>

      {/* 🆕 Селект за избор на категория */}
      <label className="block mb-4">
        Категория:
        <select
          className="w-full border px-2 py-1 rounded"
          value={selectedCategoryId}
          onChange={e => setSelectedCategoryId(e.target.value)}
        >
          <option value="">Изберете категория</option>
          {categories.map(cat => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </label>

      <div className="flex gap-4">
        <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleSubmit}>
          Запази
        </button>
        <button className="bg-gray-400 text-white px-4 py-2 rounded" onClick={onCancel}>
          Отказ
        </button>
      </div>
    </div>
  );
}
