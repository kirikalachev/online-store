'use client';
import axios from 'axios';
import { useState } from 'react';

export default function CategoryForm() {
    const [categoryName, setCategoryName] = useState('');


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            
        } catch (error) {
            
        }
    }

    return (
    <form onSubmit={handleSubmit} className='bg-blue-200 p-4 rounded'>
        <label>Име на категорията:</label>
        <input
            type="text"
            value={categoryName}
            onChange={e => setCategoryName(e.target.value)}
            required
            className="block mb-2"
        />

        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
            Създай
        </button>
    </form>
  )
}
