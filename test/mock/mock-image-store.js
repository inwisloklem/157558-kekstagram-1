class MockImageStore {
  async getBucket() {}

  async get() {}

  async save() {}
}

module.exports = new MockImageStore();
