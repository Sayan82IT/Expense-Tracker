import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { connectDB } from './config/db.js';
import userRouter from './routes/userRoute.js';
import incomeRouter from './routes/incomeRoute.js';
import expenseRouter from './routes/expenseRoute.js';
import dashboardRouter from './routes/dashboardRoute.js';

const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//DB
connectDB();

// Routes

app.use('/api/users', userRouter);
app.use('/api/incomes', incomeRouter);
app.use('/api/expenses',expenseRouter)
app.use('/api/dashboard', dashboardRouter);

app.get('/', (req, res) => {
  res.send('Api is running');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});