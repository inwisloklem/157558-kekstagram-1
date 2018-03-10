const express = require(`express`);

const {log} = require(`../utils`);

const PostStore = require(`../server/post-store`);
const ImageStore = require(`../server/image-store`);

const initMainDb = require(`../server/database`);
const setupCollection = require(`../server/setup`);

const Config = require(`../config`);

module.exports = {
  name: `server`,
  description: `Starts local server`,
  execute() {
    const app = express();

    const postStore = new PostStore(
        setupCollection(initMainDb)
            .catch((e) => log({message: `Failed to setup collecton: ${e}`, type: `error`}))
    );

    const imageStore = new ImageStore();

    const router = require(`../server/post-routes`)(postStore, imageStore);

    app
        .set(`host`, Config.SERVER_HOST)
        .set(`port`, process.argv[3] || Config.SERVER_PORT)

        .use(`/api/posts`, router)
        .use(express.static(`static`));

    app.listen(app.get(`port`), () => log({
      message: `Local server starts now at ${app.get(`host`)}:${app.get(`port`)}.`,
      type: `text`,
    }));
  }
};
