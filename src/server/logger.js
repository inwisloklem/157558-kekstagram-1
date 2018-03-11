const winston = require(`winston`);

require(`dotenv`).config();

const {
  combine,
  timestamp,
  printf,
} = winston.format;

const logger = winston.createLogger({
  level: process.env.SERVER_LOG_LEVEL || `info`,
  format: winston.format.json(),
  transports: [
    new winston.transports.File({filename: `error.log`, level: `error`}),
    new winston.transports.File({filename: `combined.log`})
  ]
});

if (process.env.NODE_ENV !== `production`) {
  logger.add(new winston.transports.Console({
    format: combine(
        timestamp(),
        printf((info) =>
          `${info.level.toUpperCase().cyan} ${info.timestamp.gray} ${info.message}`),
    ),
  }));
}

module.exports = logger;
