const connectDb = require(`../server/connect-database`);
const setupCollection = require(`../server/setup-collection`);

const generateEntity = require(`../generate/generate-entity`);
const {generateData} = require(`../generate/generate-data`);

const logger = require(`../server/logger`);
const {log} = require(`../utils`);

const DATA_AMOUNT = 100;

const fillDb = async () => {
  const collection = await setupCollection(connectDb);
  const data = generateData(generateEntity, DATA_AMOUNT);

  await collection
      .insertMany(data);

  return collection;
};

module.exports = {
  name: `fill`,
  description: `Fills database with test data`,
  execute() {
    fillDb()
        .then(() => {
          log({message: `Database filled w/ ${DATA_AMOUNT} entities of test data.`, type: `text`});
          logger.info(`Database filled w/ ${DATA_AMOUNT} entities of test data.`);
          process.exit();
        })
        .catch((e) => logger.error(`Failed to load test data to database.`, {details: {error: e}}));
  }
};
