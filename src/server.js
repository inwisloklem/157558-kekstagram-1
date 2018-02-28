const express = require(`express`);
const app = express();
const {log} = require(`./utils.js`);
const routes = require(`./routes.js`);

const {
  SERVER_HOST,
  SERVER_PORT,
} = require(`./config.js`);

app.set(`host`, SERVER_HOST);
app.set(`port`, process.argv[3] || SERVER_PORT);

app.use(express.static(`static`));
app.use(`/api/posts`, routes);


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
