'use client';
import axios from 'axios';
import { useState } from 'react';

interface Props {
  onCategoryCreated: () => void;
}

export default function CategoryForm({ onCategoryCreated } : Props) {
    const [name, setName] = useState('');


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // some validation

        try {
            await axios.post('http://localhost:3000/api/categories/', { name, });
            alert("Category created");
            setName('');

            onCategoryCreated();
        } catch (err: any) {
            console.error('Axios error:', err.response?.data || err.message);
            alert('Error creating product');
        }
    };

    return (
    <form onSubmit={handleSubmit} className='bg-blue-200 p-4 rounded'>
        <label>Име на категорията:</label>
        <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            required
            className="block mb-2"
        />

        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
            Създай
        </button>
    </form>
  )
}
