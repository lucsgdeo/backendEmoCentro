require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./src/config/db');
const logger = require('./src/utils/logger');

const authRoutes = require('./src/routes/authRoutes');
const hemocentroRoutes = require('./src/routes/hemocentroRoutes');
const agendamentoRoutes = require('./src/routes/agendamentoRoutes');

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

app.get('/', (req, res) => {
  res.send('220 - SERVER OK');
  console.log('Server accessed');
});

// Error handling middleware (optional but good practice)
app.use((err, req, res, next) => {
  logger.error(err.stack);
  res.status(500).send('Algo deu errado!');
});

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
  logger.info(`Server running on port ${PORT}`);
});
