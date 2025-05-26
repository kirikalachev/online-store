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
  };

  return (
    <div className='bg-white p-4 rounded shadow-md w-full max-w-md'>
      <label className='block mb-2'>
        Име на категорията:
      </label>
      <input
        className='w-full border px-2 py-1 rounded'
        value={name}
        onChange={e => setName(e.target.value)}
      />


      <div className='flex gap-4'>
        <button className='bg-blue-500 text-white px-4 py-2 rounded' onClick={handleSubmit}>
          Запази
        </button>
        <button className='bg-gray-400 text-white px-4 py-2 rounded' onClick={onCancel}>
          Отказ
        </button>
      </div>
    </div>
  );
}
