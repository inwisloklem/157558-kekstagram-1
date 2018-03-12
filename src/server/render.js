const {prettyPrint} = require(`../utils`);

const ACCEPT_TYPES = [`json`, `html`];

const makeHtml = (data) =>
  `<!DOCTYPE html>
    <html lang="ru">
    <head>
        <meta charset="UTF-8">
        <title>Kekstagram</title>
    </head>
    <body>
      <pre>${prettyPrint(data)}</pre>
    </body>
  </html>`;

const render = (request, response, data) => {
  switch (request.accepts(ACCEPT_TYPES)) {
    case `html`:
      response.set(`Content-Type`, `text/html`);
      response.send(makeHtml(data));
      break;
    default:
      response.set(`Content-Type`, `application/json`);
      response.json(data);
  }
};

module.exports = render;
