'use client';
import { useEffect, useState } from 'react';
import ProductList from '@/components/product/ProductList';
import ProductForm from '@/components/product/ProductForm';
import CategoryForm from '@/components/category/CategoryForm';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  createdAt: Date;
}

interface RawProduct {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  createdAt: string;
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [creatingProduct, setCreatingProduct] = useState(false);
  const [creatingCategory, setCreatingCategory] = useState(false);

  const fetchProducts = async () => {
    const response = await fetch('http://localhost:3000/api/products');
    const data = (await response.json()) as RawProduct[];
    const mapped = data.map(product => ({
      id: product._id,
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      createdAt: new Date(product.createdAt),
    }));
    setProducts(mapped);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <main>
      <h1 className='text-2xl m-5'>Администраторски панел</h1>
      <div className='bg-green-800'>
          <h2 className='text-xl m-3'>Управление на продуктите:</h2>
          <button className='bg-green-200 rounded p-4 m-2' onClick={() => setCreatingProduct(!creatingProduct)}>
              {creatingProduct ? 'Затвори' : 'Създай продукт'}
          </button>
          {creatingProduct? <ProductForm onProductCreated={fetchProducts} /> : null}
          

          <h3 className='text-lg m-2'>Създадени продукти:</h3>
          <ProductList products={products} setProducts={setProducts}/>
      </div>
      <hr />

      <div className='bg-orange-900'>
        <h2 className='text-xl m-3'>Управление на категориите:</h2>
        <button className='bg-green-200 rounded p-4 m-2' onClick={() => setCreatingCategory(!creatingCategory)}>
            {creatingCategory ? 'Затвори' : 'Създай категория'}
        </button>
        {creatingCategory? <CategoryForm /* onCategoryCreated={fetchCategories} */ /> : null}

        <h3 className='text-lg m-2'>Създадени категории:</h3>
        {/* <CategoryList categories={categories} setCategories={setCategories} /> */}
      </div>
      
    </main>
  );
}
