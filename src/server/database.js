const {MongoClient} = require(`mongodb`);
const {log} = require(`../utils`);

const url = `mongodb://localhost:27017`;

const initMainDb = () => MongoClient
    .connect(url)
    .then((client) => client.db(`kekstagram`))
    .catch((e) => {
      log({message: `Failed to connect to database: ${e}`, type: `error`});
      process.exit(1);
    });

module.exports = initMainDb;
