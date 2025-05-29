//components/category/EditCategory.tsx
'use client';
import { useState } from 'react';
import { Product, RawProduct, Category, RawCategory } from '@/types/product'; 

interface Props {
  category: Category;
  onCancel: () => void;
  onSave: (updatedCategory: Category) => void;
}

export default function EditTab({ category, onCancel, onSave }: Props) {
  const [name, setName] = useState(category.name);

  const handleSubmit = () => {
    const updated = {
      ...category,
      name,
    };
    onSave(updated);
    onCancel();
  };

    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onCancel();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={handleOverlayClick}
    >
      <div
        className="bg-white p-6 rounded shadow-md w-full max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl mb-4">Редактирай категория</h2>

        <label className="block mb-2">Име на категорията:</label>
        <input
          className="w-full border px-2 py-1 rounded mb-4"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <div className="flex justify-end gap-2">
          <button
            className="bg-gray-400 text-white px-4 py-2 rounded"
            onClick={onCancel}
          >
            Отказ
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={handleSubmit}
          >
            Запази
          </button>
        </div>
      </div>
    </div>
  );
}