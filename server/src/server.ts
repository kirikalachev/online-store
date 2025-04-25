// src/server.ts
import dotenv from 'dotenv';
import connectDB from './config/db';
import app from './app';

dotenv.config();
connectDB();

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

console.log('EMAIL_ADDRESS:', process.env.EMAIL_ADDRESS);
console.log('EMAIL_APP_PASS:', process.env.EMAIL_APP_PASS);
