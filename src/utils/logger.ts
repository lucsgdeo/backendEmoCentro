import fs from 'fs';
import path from 'path';

const LOG_DIR = path.join(__dirname, '..', 'logs');
const LOG_FILE = path.join(LOG_DIR, 'app.log');

// Ensure log directory exists
if (!fs.existsSync(LOG_DIR)) {
  fs.mkdirSync(LOG_DIR, { recursive: true });
}

const log = (type: string, message: string) => {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] [${type}] ${message}\n`;
  
  try {
    fs.appendFileSync(LOG_FILE, logMessage, 'utf8');
  } catch (err) {
    console.error('Error writing to log file:', err);
  }
};

export default {
  info: (message: string) => log('INFO', message),
  error: (message: string) => log('ERROR', message)
};
