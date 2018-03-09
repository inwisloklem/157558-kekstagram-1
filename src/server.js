const express = require(`express`);
const app = express();

const {log} = require(`./utils.js`);

const postStore = require(`./post-store.js`);
const imageStore = require(`./image-store.js`);

const router = require(`./post-routes.js`)(postStore, imageStore);

const {
  SERVER_HOST,
  SERVER_PORT,
} = require(`./config.js`);

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
