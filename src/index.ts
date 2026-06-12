import dotenv from 'dotenv';
dotenv.config();

import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import connectDB from './config/db';
import logger from './utils/logger';

import authRoutes from './routes/authRoutes';
import hemocentroRoutes from './routes/hemocentroRoutes';
import agendamentoRoutes from './routes/agendamentoRoutes';

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to Database
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/hemocentros', hemocentroRoutes);
app.use('/api/agendamentos', agendamentoRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('220 - SERVER OK (TypeScript)');
  console.log('Server accessed');
});

// Error handling middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  logger.error(err.stack);
  res.status(500).send('Algo deu errado!');
});

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
  logger.info(`Server running on port ${PORT}`);
});
