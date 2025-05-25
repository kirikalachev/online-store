'use client';
import axios from 'axios';
import { useState } from 'react';
import EditTab from './EditTab';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  createdAt: Date;
}

interface Props {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}

export default function ProductList({ products, setProducts }: Props) {
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const handleDelete = async (id: string) => {
    try {
      const confirmDelete = window.confirm("Сигурни ли сте, че искате да изтриете този продукт?");
      if (!confirmDelete) return;

      await axios.delete(`http://localhost:3000/api/products/${id}`);
      console.log("Product deleted", { id });

      setProducts(prev => prev.filter(p => p.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

 const handleUpdate = async (updated: Product) => {
    try {
      await axios.put(`http://localhost:3000/api/products/${updated.id}`, updated);
      setProducts(prev =>
        prev.map(p => (p.id === updated.id ? updated : p))
      );
      setEditingProduct(null);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='flex flex-wrap'>
      {products.map(product => (
        <div key={product.id} className='bg-red-200 m-3 p-4 rounded w-60'>
          <h3 className='font-bold'>{product.name}</h3>
          <p>Цена: ${product.price}</p>
          <p>Описание: {product.description}</p>
          <p>Категория: {product.category}</p>
          <p>Създаден на: {new Date(product.createdAt).toLocaleDateString('bg-BG')}</p>

          <button
            className='mt-2 bg-green-500 text-white px-2 py-1 rounded'
            onClick={() => handleDelete(product.id)}
          >
            Изтрий
          </button>
          <button
            className='mt-2 bg-blue-500 text-white px-2 py-1 rounded ml-2'
            onClick={() => setEditingProduct(product)}
          >
            Редактиране
          </button>
        </div>
      ))}

          {editingProduct && (
            <div className='mt-6'>
              <h2 className='text-xl mb-2'>Редактиране на продукт:</h2>
              <EditTab
                key={editingProduct.id}
                product={editingProduct}
                onCancel={() => setEditingProduct(null)}
                onSave={handleUpdate}
              />
            </div>
          )}

    </div>
  );
}
