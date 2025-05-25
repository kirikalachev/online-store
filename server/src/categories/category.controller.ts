// category.controller.ts
import { Request, Response, NextFunction } from 'express';
import Category from './category.model';

// Създаване на категория с проверка за дубликати
export const createCategory = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    let { name } = req.body;

    if (!name || typeof name !== 'string') {
      res.status(400).json({ message: 'Missing or invalid category name.' });
      return;
    }

    // Почисти входа
    name = name.trim();

    // Проверка дали вече съществува категория с това име (case-insensitive)
    const existingCategory = await Category.findOne({
      name: { $regex: `^${name}$`, $options: 'i' }
    });

    if (existingCategory) {
      res.status(409).json({ message: 'Category already exists.' });
      return;
    }

    const newCategory = new Category({ name });
    await newCategory.save();

    res.status(201).json({ message: 'Category created successfully!', category: newCategory });

  } catch (error: any) {
    // Обработка на MongoDB грешка за дублиращ уникален запис
    if (error.code === 11000) {
      res.status(409).json({ message: 'Category already exists (duplicate).' });
      return;
    }

    res.status(500).json({
      message: 'Error creating category!',
      error: error instanceof Error ? error.message : error
    });
  }
};

// Извличане на всички продукти
export const getAllCategories = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching categories.' });
  }
};

// Извличане на продукт по ID
export const getCategoryById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const category = await Category.findById(id);
    if (!category) {
      res.status(404).json({ message: 'Category not found.' });
      return;
    }
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching category.' });
  }
};

// Обновяване на продукт
export const updateCategory = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      { name },
      { new: true }
    );
    if (!updatedCategory) {
      res.status(404).json({ message: 'Category not found.' });
      return;
    }
    res.status(200).json(updatedCategory);
  } catch (error) {
    res.status(500).json({ message: 'Error updating category.' });
  }
};

// Изтриване на продукт
export const deleteCategory = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const deletedCategory = await Category.findByIdAndDelete(id);
    if (!deletedCategory) {
      res.status(404).json({ message: 'Category not found.' });
      return;
    }
    res.status(200).json({ message: 'Category deleted successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting category.' });
  }
};
