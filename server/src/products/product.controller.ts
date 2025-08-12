//products/product.controller.ts
import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import Product from './product.model';
import Category from '../categories/category.model';
import fs from 'fs';
import path from 'path';

export const createProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    let { name, description, price, category } = req.body;

    if (!name || !description || price == null || !category) {
      res.status(400).json({ message: 'Missing required fields.' });
      return;
    }

    const files = req.files as {
      [fieldname: string]: Express.Multer.File[];
    };

    const mainImage = files?.mainImage?.[0]?.filename;
    const galleryImages = files?.galleryImages?.map(file => file.filename) || [];

    if (!mainImage) {
      res.status(400).json({ message: 'Main image is required.' });
      return;
    }

    const newProduct = new Product({
      name: name.trim(),
      description: description.trim(),
      price,
      category,
      mainImage: `/uploads/${mainImage}`,
      galleryImages: galleryImages.map(file => `/uploads/${file}`),
    });

    await newProduct.save();

    res.status(201).json({
      message: 'Product created successfully!',
      product: newProduct,
    });
  } catch (error: any) {
    res.status(500).json({
      message: 'Error creating product!',
      error: error instanceof Error ? error.message : error,
    });
  }
};


// Извличане на всички продукти
export const getAllProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const products = await Product.find().populate('category');
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products.' });
  }
};

// Извличане на продукт по ID
export const getProductById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({ message: 'Invalid product ID format.' });
      return;
    }

    const product = await Product.findById(id).populate('category');
    if (!product) {
      res.status(404).json({ message: 'Product not found.' });
      return;
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching product.' });
  }
};

export const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const { name, description, price, categoryId, existingExtraImages } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({ message: 'Invalid product ID format.' });
      return;
    }

    const existingProduct = await Product.findById(id);
    if (!existingProduct) {
      res.status(404).json({ message: 'Product not found.' });
      return;
    }

    const updates: any = {};

    if (name) updates.name = name.trim();
    if (description) updates.description = description.trim();

    if (price != null) {
      const parsedPrice = parseFloat(price);
      if (isNaN(parsedPrice) || parsedPrice < 0) {
        res.status(400).json({ message: 'Invalid price value.' });
        return;
      }
      updates.price = parsedPrice;
    }

    if (categoryId) {
      if (!mongoose.Types.ObjectId.isValid(categoryId)) {
        res.status(400).json({ message: 'Invalid category ID.' });
        return;
      }

      const categoryExists = await Category.findById(categoryId);
      if (!categoryExists) {
        res.status(400).json({ message: 'Category not found.' });
        return;
      }

      updates.category = categoryId;
    }

    const files = req.files as { [fieldname: string]: Express.Multer.File[] };
    const uploadsDir = path.join(__dirname, '../../uploads');

    // 🔁 Подмяна на главно изображение
    if (files?.mainImage?.[0]) {
      if (existingProduct.mainImage) {
        const oldPath = path.join(uploadsDir, path.basename(existingProduct.mainImage));
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }

      updates.mainImage = `/uploads/${files.mainImage[0].filename}`;
    }

    // 🖼️ Обработка на допълнителни изображения
    const stillUsed = JSON.parse(existingExtraImages || '[]') as string[];
    const toDelete = (existingProduct.galleryImages || []).filter(img => !stillUsed.includes(img));

    // Изтриване на отпадналите снимки
    for (const url of toDelete) {
      const filePath = path.join(uploadsDir, path.basename(url));
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }

    // Добавяне на новите
    const newGallery = [
      ...stillUsed,
      ...(files?.galleryImages?.map(file => `/uploads/${file.filename}`) || [])
    ];

    updates.galleryImages = newGallery;

    const updatedProduct = await Product.findByIdAndUpdate(id, updates, {
      new: true
    }).populate('category');

    res.status(200).json({
      message: 'Product updated successfully.',
      product: updatedProduct
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating product.' });
  }
};

export const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({ message: 'Invalid product ID format.' });
      return;
    }

    const product = await Product.findById(id);
    if (!product) {
      res.status(404).json({ message: 'Product not found.' });
      return;
    }

    const uploadsDir = path.join(__dirname, '../../uploads');

    // 🧹 Изтриване на главна снимка
    if (product.mainImage) {
      const mainPath = path.join(uploadsDir, path.basename(product.mainImage));
      if (fs.existsSync(mainPath)) fs.unlinkSync(mainPath);
    }

    // 🧹 Изтриване на второстепенни снимки
    if (product.galleryImages && product.galleryImages.length) {
      for (const image of product.galleryImages) {
        const imagePath = path.join(uploadsDir, path.basename(image));
        if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
      }
    }

    // 🔥 Накрая изтриваме записа от базата
    const deletedProduct = await Product.findByIdAndDelete(id);

    res.status(200).json({
      message: 'Product deleted successfully!',
      product: deletedProduct
    });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting product.' });
  }
};