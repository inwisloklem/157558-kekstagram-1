const mongodb = require(`mongodb`);
const connectDb = require(`./connect-database`);

class ImageStore {
  async getBucket() {
    if (this._bucket) {
      return this._bucket;
    }

    const dBase = await connectDb();

    if (!this._bucket) {
      this._bucket = new mongodb.GridFSBucket(dBase, {
        chunkSizeBytes: 1024 * 1024,
        bucketName: `images`
      });
    }

    return this._bucket;
  }

  async get(filename) {
    const bucket = await this.getBucket();

    const results = await (bucket)
        .find({filename})
        .toArray();

    const entity = results[0];

    if (!entity) {
      return null;
    }

    return {
      info: entity,
      stream: bucket.openDownloadStreamByName(filename),
    };
  }

  async save(filename, stream) {
    const bucket = await this.getBucket();

    return new Promise((success, fail) => {
      stream
          .pipe(bucket.openUploadStream(filename))
          .on(`error`, fail).on(`finish`, success);
    });
  }
}

module.exports = ImageStore;
