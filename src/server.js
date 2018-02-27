const fs = require(`fs`);
const http = require(`http`);
const url = require(`url`);
const path = require(`path`);
const {promisify} = require(`util`);
const {log} = require(`./utils.js`);

const {
  SERVER_HOST,
  SERVER_PORT,
} = require(`./config.js`);

const stat = promisify(fs.stat);
const readFile = promisify(fs.readFile);

const sendFile = async (filePath, response) => {
  const mapExtToContentType = {
    'css': `text/css`,
    'gif': `image/gif`,
    'html': `text/html; charset=UTF-8`,
    'ico': `image/x-icon`,
    'jpg': `image/jpeg`,
    'png': `image/png`,
  };

  const data = await readFile(filePath);
  const fileExt = path.extname(filePath).slice(1);

  const contentType = mapExtToContentType[fileExt] ?
    mapExtToContentType[fileExt] : `text/plain`;

  response.setHeader(`content-type`, contentType);
  response.setHeader(`content-length`, Buffer.byteLength(data));
  response.end(data);
};

const handleResponse = async (request, response) => {
  try {
    const {pathname} = url.parse(request.url);
    const filePath = path.join(process.cwd(), `static`, pathname);

    const fileStat = await stat(filePath);

    if (filePath.endsWith(`static${path.sep}`)) {
      await sendFile(filePath + `index.html`, response);
      return;
    }

    if (fileStat.isDirectory()) {
      throw new Error(`404`);
    }
    await sendFile(filePath, response);

  } catch (e) {
    if (e.message === `404` || e.message.startsWith(`ENOENT`)) {
      await sendFile(`${process.cwd()}/pages/404.html`, response);
      return;
    }

    await sendFile(`${process.cwd()}/pages/500.html`, response);
  }
};

const server = http.createServer((request, response) => {
  handleResponse(request, response)
      .catch((e) => log({message: `Error occured: ${e}`, type: `error`}));
});

module.exports = {
  name: `server`,
  description: `Starts local server`,
  execute() {
    const options = {
      host: SERVER_HOST,
      port: process.argv[3] || SERVER_PORT,
    };

    log({message: `Local server starts now.`, type: `text`});
    server.listen(options);
  }
};
