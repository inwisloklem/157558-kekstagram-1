const express = require(`express`);
const app = express();

const {log} = require(`./utils.js`);
const postRoutes = require(`./post-routes.js`);

const {getNotImplemented} = require(`./post-controller.js`);

const {
  SERVER_HOST,
  SERVER_PORT,
} = require(`./config.js`);

app
    .set(`host`, SERVER_HOST)
    .set(`port`, process.argv[3] || SERVER_PORT)

    .use(`/api/posts`, postRoutes)
    .use(express.static(`static`))

    .all(/api\/posts/, getNotImplemented);

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
