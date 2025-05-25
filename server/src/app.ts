// src/app.ts
import express from 'express';
import cors from 'cors';
import productRoutes from './products/product.routes';
import userRoutes from './users/user.routes';
import authRoutes from './auth/auth.routes';
import categoryRoutes from './categories/category.routes';


const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Роутове
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/categories', categoryRoutes);


app.get('/', (req, res) => {
  res.send('Hello, this is the API root!');
});

export default app;
