const MOCK_DB = require(`./mock-database`);

const {byDate} = require(`../../src/utils`);

class Cursor {
  constructor(data) {
    this.data = data;
  }

  skip(count) {
    return new Cursor(this.data.slice(count));
  }

  limit(count) {
    return new Cursor(this.data.slice(0, count));
  }

  async toArray() {
    return this.data;
  }
}

class MockPostStore {
  async getAllPosts() {
    return new Cursor(MOCK_DB);
  }

  async getPostByQuery({date}) {
    return MOCK_DB.find(byDate(Number(date)));
  }

  async savePost() {}
}

module.exports = new MockPostStore();
