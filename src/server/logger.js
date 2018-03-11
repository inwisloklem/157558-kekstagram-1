const winston = require(`winston`);
const {prettyPrint} = require(`../utils`);

require(`dotenv`).config();

const {
  combine,
  timestamp,
  printf,
} = winston.format;

const level = process.env.SERVER_LOG_LEVEL || `info`;

const logger = winston.createLogger({
  level: level.toLowerCase(),
  format: printf((info) => `${prettyPrint(info)},`),
  transports: [
    new winston.transports.File({filename: `error.log`, level: `error`}),
    new winston.transports.File({filename: `combined.log`, level: `info`}),
  ]
});

const format = combine(
    timestamp(),
    printf((info) => {
      const message = `${info.level.toUpperCase().cyan} ${info.timestamp} ${info.message}`;
      return info.details ? `${message}\n${prettyPrint(info.details).grey}` : message;
    })
);

if (process.env.NODE_ENV !== `production`) {
  logger.add(new winston.transports.Console({
    format,
  }));
}

const mockLogger = {
  info() {},
  error() {},
};

module.exports = (process.env.NODE_ENV !== `test`) ? logger : mockLogger;
