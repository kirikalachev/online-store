// product.routes.ts
// import express, { Request, Response } from 'express';
// import { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct } from './product.controller';
// import upload from '../middleware/multerConfig';
// import Product from './product.model';
// import mongoose from 'mongoose';

// const router = express.Router();

// // Създаване на продукт
// router.post(
//   '/',
//   upload.fields([
//     { name: 'mainImage', maxCount: 1 },
//     { name: 'galleryImages', maxCount: 5 },
//   ]),
//   createProduct
// );

// // Вземане на всички продукти
// router.get('/', getAllProducts);

// // Batch fetch (трябва да е преди '/:id')
// // Винаги преди '/:id'
// router.get('/batch', async (req, res) => {
//   try {
//     const idsQuery = req.query.ids as string;
//     if (!idsQuery) return res.status(400).json({ message: 'No IDs provided' });

//     const ids = idsQuery.split(',').filter(id => mongoose.Types.ObjectId.isValid(id));
//     const objectIds = ids.map(id => new mongoose.Types.ObjectId(id));
//     const products = await Product.find({ _id: { $in: objectIds } });

//     return res.json({ products });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: 'Failed to fetch products' });
//   }
// });



// // Вземане на продукт по ID
// router.get('/:id', getProductById);

// // Обновяване на продукт
// router.put(
//   '/:id',
//   upload.fields([
//     { name: 'mainImage', maxCount: 1 },
//     { name: 'galleryImages', maxCount: 5 },
//   ]),
//   updateProduct
// );

// // Изтриване на продукт
// router.delete('/:id', deleteProduct);

// export default router;




import express from 'express';

import { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct } from './product.controller';
import upload from '../middleware/multerConfig';

const router = express.Router();

router.post(
  '/',
  upload.fields([
    { name: 'mainImage', maxCount: 1 },
    { name: 'galleryImages', maxCount: 5 },
  ]),
  createProduct
);

router.get('/', getAllProducts);

router.get('/:id', getProductById);

router.put(
  '/:id',
  upload.fields([
    { name: 'mainImage', maxCount: 1 },
    { name: 'galleryImages', maxCount: 5 },
  ]),
  updateProduct
);

router.delete('/:id', deleteProduct);

export default router;

