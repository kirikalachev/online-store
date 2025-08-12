//components/product/ProductForm.tsx
'use client';
import axios from 'axios';
import { useState } from 'react';
import EditProduct from './EditProduct';
import { Product, Category } from '@/types/product'; 
// import { toRawProduct } from '@/utils/transform';
import Image from 'next/image';
import Link from 'next/link';

interface Props {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  categories: Category[]; 
}

export default function ProductList({ products, setProducts, categories }: Props) {
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const handleDelete = async (id: string) => {
    try {
      const confirmDelete = window.confirm("Сигурни ли сте, че искате да изтриете този продукт?");
      if (!confirmDelete) return;

      await axios.delete(`http://localhost:3000/api/products/${id}`);
      console.log("Category deleted", { id });

      setProducts(prev => prev.filter(p => p.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

const handleUpdate = async (updated: Product, formData: FormData) => {
  try {
  const res = await axios.put(
    `http://localhost:3000/api/products/${updated.id}`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );

  const data = res.data;
  setProducts(prev =>
    prev.map(p => (p.id === data.product.id ? data.product : p))
  );
  setEditingProduct(null);
} catch (err) {
  console.error('Update failed:', err);
}
};

  return (
    <div className='flex flex-wrap'>
      {products.map(product => (
        <div key={product.id} className='bg-red-200 m-3 p-4 rounded w-60'>
          {product.mainImage ? (
            <div className="relative w-full h-40 mb-2 rounded overflow-hidden">
              <Image
                src={`http://localhost:3000${product.mainImage}`}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, 300px"
                priority
                className="object-cover"
              />
            </div>
          ) : (
            <div className='w-full h-40 bg-gray-200 flex items-center justify-center mb-2 rounded'>
              <span className='text-gray-500'>Няма снимка</span>
            </div>
          )}
          <h3 className='font-bold'>{product.name}</h3>
          <p>Цена: ${product.price}</p>
          <p>Описание: {product.description}</p>
          <p>Категория: {product.category.name}</p>
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
          <Link
            href={`http://localhost:3001/products/${product.id}`}
            className='mt-2 bg-blue-500 text-white px-2 py-1 rounded ml-2'
          >
            Виж продукт
          </Link>
        </div>
      ))}

          {editingProduct && (
            <div className='mt-6'>
              <EditProduct
                key={editingProduct.id}
                product={editingProduct}
                onCancel={() => setEditingProduct(null)}
                onSave={handleUpdate}
                categories={categories}
              />

            </div>
          )}

    </div>
  );
}
