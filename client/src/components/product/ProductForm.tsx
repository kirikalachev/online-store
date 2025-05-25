'use client';
import axios from 'axios';
import { useState } from 'react';

interface Props {
  onProductCreated: () => void;
}

export default function ProductForm({ onProductCreated }: Props) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('S');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const priceNumber = Number(price);
    if (isNaN(priceNumber) || priceNumber <= 0) {
      alert('Please enter a valid price greater than zero.');
      return;
    }

    try {
      await axios.post('http://localhost:3000/api/products/', {
        name,
        description,
        price: priceNumber,
        category,
      });

      alert('Product created!');
      setName('');
      setDescription('');
      setPrice('');
      setCategory('S');

      onProductCreated(); // 🔁 Обновяване на списъка
    } catch (err: any) {
      console.error('Axios error:', err.response?.data || err.message);
      alert('Error creating product');
    }
  };

  return (
    <form onSubmit={handleSubmit} className='bg-yellow-200 p-4 rounded'>
      <label>Име:</label>
      <input
        type="text"
        value={name}
        onChange={e => setName(e.target.value)}
        required
        className="block mb-2"
      />

      <label>Описание:</label>
      <textarea
        value={description}
        onChange={e => setDescription(e.target.value)}
        required
        className="block mb-2"
      />

      <label>Цена:</label>
      <input
        type="number"
        value={price}
        onChange={e => setPrice(e.target.value)}
        required
        className="block mb-2"
      />

      <label>Категория:</label>
      <select value={category} onChange={e => setCategory(e.target.value)} className="block mb-4">
        <option value="S">S</option>
        <option value="M">M</option>
        <option value="L">L</option>
        <option value="XL">XL</option>
        <option value="XXL">XXL</option>
      </select>

      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Създай
      </button>
    </form>
  );
}
