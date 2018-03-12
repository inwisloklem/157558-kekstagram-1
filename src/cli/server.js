const express = require(`express`);

const {log} = require(`../utils`);
const logger = require(`../server/logger`);

const PostStore = require(`../server/post-store`);
const ImageStore = require(`../server/image-store`);

const router = require(`../server/post-routes`);

const connectDb = require(`../server/connect-database`);
const setupCollection = require(`../server/setup-collection`);

const Config = require(`../config`);

require(`dotenv`).config();

module.exports = {
  name: `server`,
  description: `Starts local server`,
  execute() {
    const app = express();

    const postStore = new PostStore(
        setupCollection(connectDb)
            .catch((e) => logger.error(`Failed to setup collection.`, {details: {error: e}}))
    );

    const imageStore = new ImageStore();

    const hostname = process.env.SERVER_HOST || Config.SERVER_HOST;
    const port = process.env.SERVER_PORT || process.argv[3] || Config.SERVER_PORT;

    app
        .set(`host`, hostname)
        .set(`port`, port)

        .use(`/api/posts`, router(postStore, imageStore))
        .use(express.static(`static`));

    app.listen(app.get(`port`), () => log({
      message: `Local server starts now at ${app.get(`host`)}:${app.get(`port`)}.`,
      type: `text`,
    }));
  }
};
