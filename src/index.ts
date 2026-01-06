import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from '@/routes/authRoutes.js';
import userRoutes from '@/routes/userRoutes.js';
import adminRoutes from '@/routes/adminRoutes.js';
import { globalErrorHandler } from './middleware/globalErrorHandler.js';
import { notFoundHandler } from './middleware/notFound.js';
// import { setupGraphQL } from './graphql/setup.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// setupGraphQL(app);

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/admin', adminRoutes);

app.get('/', (req, res) => {
  res.send('API is running!');
});

app.use(notFoundHandler);
app.use(globalErrorHandler);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
