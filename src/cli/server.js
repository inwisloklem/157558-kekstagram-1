const express = require(`express`);
const app = express();

const {log} = require(`../utils`);

const postStore = require(`../server/post-store`);
const imageStore = require(`../server/image-store`);

const router = require(`../server/post-routes`)(postStore, imageStore);

const {
  SERVER_HOST,
  SERVER_PORT,
} = require(`./config`);

app
    .set(`host`, SERVER_HOST)
    .set(`port`, process.argv[3] || SERVER_PORT)

    .use(`/api/posts`, router)
    .use(express.static(`static`));

module.exports = {
  name: `server`,
  description: `Starts local server`,
  execute() {
    app.listen(app.get(`port`), () => log({
      message: `Local server starts now at ${app.get(`host`)}:${app.get(`port`)}.`,
      type: `text`,
    }));
  }
};
