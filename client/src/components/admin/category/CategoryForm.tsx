'use client';
import axios from 'axios';
import { useState } from 'react';

interface Props {
  onCategoryCreated: () => void;
  onClose: () => void;
}

export default function CategoryForm({ onCategoryCreated, onClose } : Props) {
    const [name, setName] = useState('');


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // some validation

        try {
            await axios.post('http://localhost:3000/api/categories/', { name, });
            alert("Category created");
            setName('');
            onCategoryCreated();
            onClose();
        } catch (err) {
            console.error('Axios error:', err);
            alert('Error creating product');
        }
    };

      const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      };

    return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={handleOverlayClick}
    >
      <div
        className="bg-blue-200 p-6 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-xl mb-4">Създай категория</h2>
        <form onSubmit={handleSubmit}>
          <label className="block mb-1">Име на категорията:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full mb-4 p-2 rounded border"
          />
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-400 text-white px-4 py-2 rounded"
            >
              Затвори
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Създай
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
