const express = require(`express`);
const app = express();

const {log} = require(`./utils.js`);

const postStore = require(`./post-store.js`);
const imageStore = require(`./image-store.js`);

const postRoutes = require(`./post-routes.js`)(postStore, imageStore);

const {
  SERVER_HOST,
  SERVER_PORT,
} = require(`./config.js`);

app
    .set(`host`, SERVER_HOST)
    .set(`port`, process.argv[3] || SERVER_PORT)

    .use(`/api/posts`, postRoutes)
    .use(express.static(`static`));

// .all(/api\/posts/, postRoutes.controller.handleNotImplemented);

module.exports = {
  app,
  name: `server`,
  description: `Starts local server`,
  execute() {
    app.listen(app.get(`port`), () => log({
      message: `Local server starts now at ${app.get(`host`)}:${app.get(`port`)}.`,
      type: `text`,
    }));
  }
};
