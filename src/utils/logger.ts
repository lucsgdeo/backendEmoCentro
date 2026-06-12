// Utility for clean terminal logging
const log = (type: string, message: string) => {
  const timestamp = new Date().toISOString();
  
  // Basic colors using ANSI escape codes
  const colors = {
    reset: "\x1b[0m",
    info: "\x1b[36m",    // Cyan
    error: "\x1b[31m",   // Red
    timestamp: "\x1b[90m" // Gray
  };

  const color = type === 'ERROR' ? colors.error : colors.info;
  
  // Format: [ISO_TIMESTAMP] [TYPE] Message
  console.log(`${colors.timestamp}[${timestamp}]${colors.reset} ${color}[${type}]${colors.reset} ${message}`);
};

export default {
  info: (message: string) => log('INFO', message),
  error: (message: string) => log('ERROR', message)
};
