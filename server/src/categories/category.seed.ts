import mongoose from 'mongoose';
import Category from './category.model';

async function ensureDefaultCategory() {
  const existing = await Category.findOne({ isDefault: true });
  if (!existing) {
    await Category.create({
      _id: new mongoose.Types.ObjectId(), // или фиксирай ID по твой избор
      name: 'Uncategorized',
      isDefault: true,
    });
    console.log('Default category created');
  }
}
