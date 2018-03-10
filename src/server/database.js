const {MongoClient} = require(`mongodb`);
const {log} = require(`../utils`);

const {DB_HOST} = require(`../config.js`);

const url = process.env.DB_HOST || DB_HOST;

const initMainDb = () => MongoClient
    .connect(url)
    .then((client) => client.db(`kekstagram`))
    .catch((e) => {
      log({message: `Failed to connect to database: ${e}`, type: `error`});
      process.exit(1);
    });

module.exports = initMainDb;
