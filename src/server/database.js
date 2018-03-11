const {MongoClient} = require(`mongodb`);
const logger = require(`./logger`);

const {DB_HOST} = require(`../config`);

require(`dotenv`).config();

const url = process.env.DB_HOST || DB_HOST;

const initMainDb = () => MongoClient
    .connect(url)
    .then(
        (client) => {
          logger.info(`Connected to database.`);
          return client.db(`kekstagram`);
        })
    .catch((e) => {
      logger.error(`Failed to connect to database.`, {details: {error: e}});
      process.exit(1);
    });

module.exports = initMainDb;
