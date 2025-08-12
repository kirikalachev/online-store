// server.ts
import dotenv from 'dotenv';
import connectDB from './config/db';
import app from './app';

dotenv.config();

// Стартирай връзка с БД
(async () => {
  try {
    console.log('🔌 Connecting to DB...');
    await connectDB();
    console.log('✅ DB connected.');

    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`🚀 Server is running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error('❌ Failed to connect to DB:', error);
    process.exit(1);
  }
})();
