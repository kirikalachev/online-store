// product.routes.ts
import express from 'express';
import { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct } from './product.controller';
import upload from '../middleware/multerConfig';

const router = express.Router();

router.post(
  '/',
  upload.fields([
    { name: 'mainImage', maxCount: 1 },
    { name: 'additionalImages', maxCount: 5 },
  ]),
  createProduct
);

router.get('/', getAllProducts);

router.get('/:id', getProductById);

router.put(
  '/:id',
  upload.fields([
    { name: 'mainImage', maxCount: 1 },
    { name: 'additionalImages', maxCount: 5 },
  ]),
  updateProduct
);

router.delete('/:id', deleteProduct);

export default router;

