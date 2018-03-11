const winston = require(`winston`);
const {prettyPrint} = require(`../utils`);

require(`dotenv`).config();

const {
  combine,
  timestamp,
  printf,
} = winston.format;

const format = combine(
    timestamp(),
    printf((info) => {
      const message = `${info.level.toUpperCase().cyan} ${info.timestamp} ${info.message}`;
      return info.details ? `${message}\n${prettyPrint(info.details).grey}` : message;
    })
);

const logger = winston.createLogger({
  level: process.env.SERVER_LOG_LEVEL.toLowerCase() || `info`,
  format: printf((info) => `${prettyPrint(info)},`),
  transports: [
    new winston.transports.File({filename: `error.log`, level: `error`}),
    new winston.transports.File({filename: `combined.log`, level: `silly`}),
    new winston.transports.File({filename: `combined.log`, level: `info`}),
  ]
});

logger.silly = (...args) =>
  logger.log(`silly`, ...args);

if (process.env.NODE_ENV !== `production`) {
  logger.add(new winston.transports.Console({format}));
}

module.exports = logger;