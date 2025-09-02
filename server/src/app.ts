//app.ts
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from 'path';

import productRoutes from './products/product.routes';
import userRoutes from './users/user.routes';
import authRoutes from './auth/auth.routes';
import categoryRoutes from './categories/category.routes';
import favoritesRoutes from './favorites/favorite.routes';
import cartRoutes from './cart/cart.routes';

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: 'http://localhost:3001',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// Статични файлове (внимание на регистъра - малки букви)
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

// Роутове
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/favorites', favoritesRoutes);
app.use('/api/cart', cartRoutes);


app.get('/', (req, res) => {
  res.send('Hello, this is the API root!');
});

export default app;
