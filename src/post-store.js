const mainDb = require(`./database.js`);
const {log} = require(`./utils.js`);

const setupCollection = async () => {
  const dBase = await mainDb;

  const collection = dBase.collection(`posts`);
  collection.createIndex({date: -1}, {unique: true});

  return collection;
};

class PostStore {
  constructor(collection) {
    this.collection = collection;
  }

  async getAllPosts() {
    return (await this.collection)
        .find();
  }

  async getPostByQuery(query) {
    return (await this.collection)
        .findOne(query);
  }

  async savePost(data) {
    return (await this.collection)
        .insertOne(data);
  }
}

module.exports = new PostStore(
    setupCollection()
        .catch((e) => log({message: `Failed to setup collecton: ${e}`, type: `error`}))
);
