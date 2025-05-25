'use client';
import { useState } from 'react';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  createdAt: Date;
}

interface Props {
  product: Product;
  onCancel: () => void;
  onSave: (updatedProduct: Product) => void;
}

export default function EditTab({ product, onCancel, onSave }: Props) {
  const [name, setName] = useState(product.name);
  const [description, setDescription] = useState(product.description);
  const [price, setPrice] = useState(product.price);
  const [category, setCategory] = useState(product.category);

  const handleSubmit = () => {
    if (!name.trim() || price <= 0 || !category.trim()) {
      alert("Моля, попълнете всички полета коректно.");
      return;
    }
    const updated = {
      ...product,
      name,
      description,
      price,
      category,
    };
    onSave(updated);
  };

  return (
    <div className='bg-white p-4 rounded shadow-md w-full max-w-md'>
      <label className='block mb-2'>
        Име:
        <input
          className='w-full border px-2 py-1 rounded'
          value={name}
          onChange={e => setName(e.target.value)}
        />
      </label>

      <label className='block mb-2'>
        Цена:
        <input
          className='w-full border px-2 py-1 rounded'
          type='number'
          value={price}
          onChange={e => setPrice(Number(e.target.value))}
        />
      </label>

      <label className='block mb-2'>
        Описание:
        <input
          className='w-full border px-2 py-1 rounded'
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
      </label>

      <label className='block mb-4'>
        Категория:
        <input
          className='w-full border px-2 py-1 rounded'
          value={category}
          onChange={e => setCategory(e.target.value)}
        />
      </label>

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
