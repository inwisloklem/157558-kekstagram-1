const {MongoClient} = require(`mongodb`);
const {log} = require(`./utils.js`);

const url = `mongodb://localhost:27017`;

module.exports = MongoClient
    .connect(url)
    .then((client) => client.db(`kekstagram`))
    .catch((e) => {
      log({message: `Failed to connect to database: ${e}`, type: `error`});
      process.exit(1);
    });
