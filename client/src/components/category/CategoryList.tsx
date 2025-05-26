//components/CategoryList.tsx
'use client';
import axios from 'axios';
import { useState } from 'react';
import EditCategory from './EditCategory';
import { Product, RawProduct, Category, RawCategory } from '@/types/product'; 

interface Props {
  categories: Category[];
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
}

export default function ProductList({ categories, setCategories }: Props) {
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm("Сигурни ли сте, че искате да изтриете тази категория?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:3000/api/categories/${id}`);
      setCategories(prev => prev.filter(cat => cat.id !== id));
    } catch (error: any) {
      if (error.response && error.response.status === 400) {
        alert(error.response.data.message || 'Категорията не може да бъде изтрита.');
      } else {
        alert('Възникна непредвидена грешка');
        console.error(error);
      }
    }
  };



 const handleUpdate = async (updated: Category) => {
    try {
      await axios.put(`http://localhost:3000/api/categories/${updated.id}`, updated);
      setCategories(prev =>
        prev.map(p => (p.id === updated.id ? updated : p))
      );
      setEditingCategory(null);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='flex flex-wrap'>
      {categories.map(category => (
        <div key={category.id} className='bg-red-200 m-3 p-4 rounded w-60'>
          <h3 className='font-bold'>{category.name}</h3>
          <p>Създаден на: {new Date(category.createdAt).toLocaleDateString('bg-BG')}</p>

          <button
            className='mt-2 bg-green-500 text-white px-2 py-1 rounded'
            onClick={() => handleDelete(category.id)}
          >
            Изтрий
          </button>
          <button
            className='mt-2 bg-blue-500 text-white px-2 py-1 rounded ml-2'
            onClick={() => setEditingCategory(category)}
          >
            Редактиране
          </button>
        </div>
      ))}

          {editingCategory && (
            <div className='mt-6'>
              <h2 className='text-xl mb-2'>Редактиране на продукт:</h2>
              <EditCategory
                key={editingCategory.id}
                category={editingCategory}
                onCancel={() => setEditingCategory(null)}
                onSave={handleUpdate}
              />
            </div>
          )}

    </div>
  );
}
