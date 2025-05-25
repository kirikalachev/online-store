import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import Product from './product.model';
import Category from '../categories/category.model';

// Създаване на продукт
export const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    let { name, description, price, category } = req.body;

    if (!name || !description || price == null || !category) {
      res.status(400).json({ message: 'Missing required fields.' });
      return;
    }

    name = name.trim();
    description = description.trim();

    if (typeof price !== 'number' || price < 0) {
      res.status(400).json({ message: 'Invalid price value.' });
      return;
    }

    if (!mongoose.Types.ObjectId.isValid(category)) {
      res.status(400).json({ message: 'Invalid category ID format.' });
      return;
    }

    const categoryExists = await Category.findById(category);
    if (!categoryExists) {
      res.status(400).json({ message: 'Category not found.' });
      return;
    }

    const newProduct = new Product({ name, description, price, category });
    await newProduct.save();

    res.status(201).json({
      message: 'Product created successfully!',
      product: newProduct
    });
  } catch (error: any) {
    res.status(500).json({
      message: 'Error creating product!',
      error: error instanceof Error ? error.message : error
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

// Обновяване на продукт
export const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    let { name, description, price, category } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({ message: 'Invalid product ID format.' });
      return;
    }

    const updates: any = {};

    if (name) updates.name = name.trim();
    if (description) updates.description = description.trim();

    if (price != null) {
      if (typeof price !== 'number' || price < 0) {
        res.status(400).json({ message: 'Invalid price value.' });
        return;
      }
      updates.price = price;
    }

    if (category) {
      if (!mongoose.Types.ObjectId.isValid(category)) {
        res.status(400).json({ message: 'Invalid category ID.' });
        return;
      }

      const categoryExists = await Category.findById(category);
      if (!categoryExists) {
        res.status(400).json({ message: 'Category not found.' });
        return;
      }

      updates.category = category;
    }

    const updatedProduct = await Product.findByIdAndUpdate(id, updates, {
      new: true
    }).populate('category');

    if (!updatedProduct) {
      res.status(404).json({ message: 'Product not found.' });
      return;
    }

    res.status(200).json({
      message: 'Product updated successfully.',
      product: updatedProduct
    });
  } catch (error) {
    res.status(500).json({ message: 'Error updating product.' });
  }
};

// Изтриване на продукт
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

    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      res.status(404).json({ message: 'Product not found.' });
      return;
    }

    res.status(200).json({
      message: 'Product deleted successfully!',
      product: deletedProduct
    });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting product.' });
  }
};
