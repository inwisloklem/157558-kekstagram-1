const {MongoClient} = require(`mongodb`);
const logger = require(`./logger`);

const {DB_HOST} = require(`../config.js`);

const url = process.env.DB_HOST || DB_HOST;

const initMainDb = () => MongoClient
    .connect(url)
    .then((client) => client.db(`kekstagram`))
    .catch((e) => {
      logger.error(`Fails to connect to database`, e);
      process.exit(1);
    });

module.exports = initMainDb;
