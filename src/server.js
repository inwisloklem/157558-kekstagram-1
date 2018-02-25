const fs = require(`fs`);
const http = require(`http`);
const url = require(`url`);
const path = require(`path`);
const {promisify} = require(`util`);
const {log} = require(`./utils.js`);

const stat = promisify(fs.stat);
const readfile = promisify(fs.readFile);
const readdir = promisify(fs.readdir);

const readFile = async (filePath, response) => {
  const CONTENT_TYPE = {
    'css': `text/css`,
    'gif': `image/gif`,
    'html': `text/html; charset=UTF-8`,
    'ico': `image/x-icon`,
    'jpg': `image/jpeg`,
    'png': `image/png`,
  };

  const data = await readfile(filePath);
  const fileExt = path.extname(filePath).slice(1);

  const contentType = CONTENT_TYPE[fileExt] ?
    CONTENT_TYPE[fileExt] : `text/plain`;

  response.setHeader(`content-type`, contentType);
  response.setHeader(`content-length`, Buffer.byteLength(data));
  response.end(data);
};

const readDir = async (filePath, response) => {
  const files = await readdir(filePath);

  const printFilesList = (filesArray) =>
    filesArray.reduce((prev, current) => {
      prev += `<li><a href="${current}">${current}</a></li>`;
      return prev;
    }, `<li><a href="..">..</a></li>`);

  const filesList = `<ul>${printFilesList(files)}</ul>`;

  const pageContent = `
    <!DOCTYPE html>
    <html lang="ru">
      <head>
        <meta charset="utf-8">
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Open+Sans+Condensed:300,700|Open+Sans&subset=latin,cyrillic">
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon">
        <title>Кекстаграм</title>
        <style>
          body {
            font-family: "Open Sans", "Tahoma", sans-serif;
            color: #333
          }
          ul {
            list-style: none;
            line-height: 1.5
          }
          a {
            color: inherit;
            border-bottom: solid 1px #bbb;
            text-decoration: none;
            transition: 0.3s ease-in-out;
            transition-property: border
          }
          a:hover {
            border-bottom-color: transparent
          }
        </style>
      </head>
      <body>
        ${filesList}
      </body>
    </html>
  `;

  response.setHeader(`content-type`, `text/html`);
  response.end(pageContent);
};

const server = http.createServer((request, response) => {
  const makeResponse = async () => {
    try {
      const {pathname} = url.parse(request.url);
      const filePath = path.join(process.cwd(), `static`, pathname);

      const fileStat = await stat(filePath);

      if (filePath.endsWith(`static/`)) {
        readFile(filePath + `index.html`, response);
        return;
      }

      if (fileStat.isDirectory()) {
        readDir(filePath, response);
        return;
      }
      readFile(filePath, response);

    } catch (e) {
      const pageContent = `
        <!DOCTYPE html>
        <html lang="ru">
          <head>
            <meta charset="utf-8">
            <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Open+Sans+Condensed:300,700|Open+Sans&subset=latin,cyrillic">
            <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon">
            <title>Кекстаграм. 404</title>
            <style>
              body {
                font-family: "Open Sans", "Tahoma", sans-serif;
                color: #333
              }
            </style>
          </head>
          <body>
            <h1>404. Not Found</h1>
            <p>${e}</p>
          </body>
        </html>
      `;

      response.setHeader(`content-type`, `text/html`);
      response.end(pageContent);
    }
  };

  makeResponse()
      .catch((e) => {
        const pageContent = `
          <!DOCTYPE html>
          <html lang="ru">
            <head>
              <meta charset="utf-8">
              <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Open+Sans+Condensed:300,700|Open+Sans&subset=latin,cyrillic">
              <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon">
              <title>Кекстаграм. 500</title>
              <style>
                body {
                  font-family: "Open Sans", "Tahoma", sans-serif;
                  color: #333
                }
              </style>
            </head>
            <body>
              <h1>500. Internal Server Error</h1>
              <p>${e}</p>
            </body>
          </html>
        `;

        response.setHeader(`content-type`, `text/html`);
        response.end(pageContent);
      });
});

module.exports = {
  name: `server`,
  description: `Starts local server`,
  execute() {
    const options = {
      host: `127.0.0.1`,
      port: process.argv[3] || `3000`,
    };

    log({message: `Local server starts now.`, type: `text`});
    server.listen(options);
  }
};
