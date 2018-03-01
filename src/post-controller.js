const DB_MOCK = require(`./mock.js`);
const ERRORS = require(`./errors.js`);
const {byDate} = require(`./utils.js`);

const createPost = (request, response) => {
  response
      .status(200)
      .send(request.body);
};

const getAllPosts = (request, response) => {
  const {
    skip = 0,
    limit = 50,
  } = request.query;

  if (Number.isNaN(Number(skip)) || Number.isNaN(Number(limit)) || skip < 0 || limit < 1) {
    response
        .status(400)
        .json([ERRORS.BAD_REQUEST])
        .end();

    return;
  }

  const data = DB_MOCK
      .slice(Number(skip), Number(skip) + Number(limit));

  response
      .status(200)
      .json(data);
};

const getPostByDate = (request, response) => {
  const date = Number(request.params.date);
  const post = DB_MOCK.find(byDate(date));

  if (!Number.isInteger(date)) {
    response
        .status(400)
        .json([ERRORS.BAD_REQUEST])
        .end();

    return;
  }

  if (typeof post !== `object`) {
    response
        .status(404)
        .json([ERRORS.NOT_FOUND])
        .end();

    return;
  }

  response
      .status(200)
      .json(post);
};

const handleNotImplemented = (request, response) => {
  response
      .status(501)
      .json([ERRORS.NOT_IMPLEMENTED])
      .end();
};

module.exports = {
  createPost,
  getAllPosts,
  getPostByDate,
  handleNotImplemented,
};
