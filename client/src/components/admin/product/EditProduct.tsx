//EditProduct.tsx
'use client';
import { useState, ChangeEvent } from 'react';
import { Product, Category } from '@/types/product';
import Image from 'next/image';

interface Props {
  product: Product;
  categories: Category[];
  onCancel: () => void;
  onSave: (updatedProduct: Product, formData: FormData) => void;
}

export default function EditProduct({ product, categories, onCancel, onSave }: Props) {
  const [name, setName] = useState(product.name);
  const [description, setDescription] = useState(product.description);
  const [price, setPrice] = useState(product.price);
  const [selectedCategoryId, setSelectedCategoryId] = useState(product.category.id);

  const [mainImageFile, setMainImageFile] = useState<File | null>(null);
  const [galleryImages, setGalleryImages] = useState<string[]>(product.galleryImages || []);
  const [newGalleryImages, setNewGalleryImages] = useState<File[]>([]);

  const handleMainImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setMainImageFile(e.target.files[0]);
    }
  };

  const handleNewExtraImages = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setNewGalleryImages([...newGalleryImages, ...Array.from(e.target.files)]);
    }
  };

  const handleRemoveExtraImage = (url: string) => {
    setGalleryImages(galleryImages.filter(img => img !== url));
  };

  const handleSubmit = () => {
    if (!name.trim() || price <= 0 || !selectedCategoryId) {
      alert("Моля, попълнете всички полета коректно.");
      return;
    }

    const category = categories.find(c => c.id === selectedCategoryId);
    if (!category) {
      alert("Невалидна категория.");
      return;
    }

    const updated: Product = {
      ...product,
      name,
      description,
      price,
      category,
    };

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('price', price.toString());
    formData.append('categoryId', selectedCategoryId);

    if (mainImageFile) {
      formData.append('mainImage', mainImageFile);
    }

    newGalleryImages.forEach(file => {
      formData.append('galleryImages', file);
    });

    formData.append('existingExtraImages', JSON.stringify(galleryImages));

    onSave(updated, formData);
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={(e) => e.target === e.currentTarget && onCancel()}
    >
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md" onClick={e => e.stopPropagation()}>
        <h2 className="text-xl font-bold mb-4">Редактирай продукт</h2>

        <label className="block mb-2">
          Име:
          <input className="w-full border px-2 py-1 rounded" value={name} onChange={e => setName(e.target.value)} />
        </label>

        <label className="block mb-2">
          Цена:
          <input className="w-full border px-2 py-1 rounded" type="number" value={price} onChange={e => setPrice(+e.target.value)} />
        </label>

        <label className="block mb-2">
          Описание:
          <input className="w-full border px-2 py-1 rounded" value={description} onChange={e => setDescription(e.target.value)} />
        </label>

        <label className="block mb-4">
          Категория:
          <select className="w-full border px-2 py-1 rounded" value={selectedCategoryId} onChange={e => setSelectedCategoryId(e.target.value)}>
            <option value="">Изберете категория</option>
            {categories.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </label>

        {/* Главно изображение */}
        <div className="mb-4">
          <p className="font-semibold">Главно изображение:</p>
          {/* Промяна #1: Добавен wrapper div с relative и зададени размери, Image с fill и sizes */}
          {product.mainImage && !mainImageFile && (
            <div className="relative w-full h-32 my-2 rounded overflow-hidden">
              <Image
                src={`http://localhost:3000${product.mainImage}`}
                alt="Main"
                fill
                sizes="100vw"
                className="object-cover rounded"
              />
            </div>
          )}
          {mainImageFile && (
            <p className="text-sm text-green-600">Ще бъде заменено с нов файл: {mainImageFile.name}</p>
          )}
          <input type="file" accept="image/*" onChange={handleMainImageChange} />
        </div>

        {/* Допълнителни изображения */}
        <div className="mb-4">
          <p className="font-semibold">Допълнителни изображения:</p>
          <div className="flex flex-wrap gap-2 my-2">
            {/* Промяна #2: Добавен wrapper div с relative и размери, Image с fill и sizes */}
            {galleryImages.map((url, i) => (
              <div key={i} className="relative w-20 h-20 rounded overflow-hidden">
                <Image
                  src={`http://localhost:3000${url}`}
                  alt={`Extra ${i}`}
                  fill
                  sizes="80px"
                  className="object-cover rounded"
                />
                <button
                  onClick={() => handleRemoveExtraImage(url)}
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full px-1 text-xs"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
          <input type="file" accept="image/*" multiple onChange={handleNewExtraImages} />
        </div>

        <div className="flex justify-end gap-2">
          <button className="bg-gray-400 text-white px-4 py-2 rounded" onClick={onCancel}>Отказ</button>
          <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleSubmit}>Запази</button>
        </div>
      </div>
    </div>
  );
}
