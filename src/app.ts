import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes';
import hemocentroRoutes from './routes/hemocentroRoutes';
import agendamentoRoutes from './routes/agendamentoRoutes';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRoutes);
app.use('/api/hemocentros', hemocentroRoutes);
app.use('/api/agendamentos', agendamentoRoutes);

export default app;
