import { config } from 'dotenv';
import { join } from 'path';
import { createLogger, format, transports } from 'winston';
const { combine, timestamp, prettyPrint } = format;

// Leer variables de entorno del archivo .env
config();

export const log = createLogger({
  transports: [
    new transports.File({
      filename: join(__dirname, process.env.LOG_FILE),
      format: combine(timestamp(), prettyPrint()),
    }),
  ],
});

// set logging level one of { error: 0, warn: 1, info: 2, verbose: 3, debug: 4, silly: 5 }
if (process.env.VERBOSE) {
  log.level = 'debug';
}
