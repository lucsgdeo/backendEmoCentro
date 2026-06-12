import dotenv from 'dotenv';
dotenv.config();

import app from './app';
import connectDB from './config/db';
import logger from './utils/logger';

const PORT = process.env.PORT || 3000;

// Connect to Database
connectDB();

app.get('/', (req, res) => {
  res.send('220 - SERVER OK (TypeScript)');
});

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
  logger.info(`Server running on port ${PORT}`);
});
