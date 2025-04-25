// productController.ts
import { Request, Response, NextFunction } from 'express';
import Product from './product.model';

// Създаване на продукт
export const createProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { name, description, price, category, stock } = req.body;
    if (!name || !description || price == null || !category || stock == null) {
      res.status(400).json({ message: 'Missing required fields.' });
      return;
    }

    const newProduct = new Product({ name, description, price, category, stock });
    await newProduct.save();
    res.status(201).json({ message: 'Product created successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Error creating product!' });
  }
};

// Извличане на всички продукти
export const getAllProducts = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products.' });
  }
};

// Извличане на продукт по ID
export const getProductById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
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
export const updateProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const { name, description, price, category, stock } = req.body;
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { name, description, price, category, stock },
      { new: true }
    );
    if (!updatedProduct) {
      res.status(404).json({ message: 'Product not found.' });
      return;
    }
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: 'Error updating product.' });
  }
};

// Изтриване на продукт
export const deleteProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      res.status(404).json({ message: 'Product not found.' });
      return;
    }
    res.status(200).json({ message: 'Product deleted successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting product.' });
  }
};
