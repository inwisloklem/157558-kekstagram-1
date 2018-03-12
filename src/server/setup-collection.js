const setupCollection = async (initMainDb) => {
  const dBase = await initMainDb();

  const collection = dBase.collection(`posts`);
  collection.createIndex({date: -1}, {unique: true});

  return collection;
};

module.exports = setupCollection;
