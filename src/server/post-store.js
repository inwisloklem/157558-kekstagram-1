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

module.exports = PostStore;
