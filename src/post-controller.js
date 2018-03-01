const DB_MOCK = require(`./mock.js`);
const ERRORS = require(`./errors.js`);
const {byDate} = require(`./utils.js`);

const createPost = (request, response) => {
  response
      .status(200)
      .send(request.body);
};

const getAllPosts = (request, response) => {
  let {
    skip = 0,
    limit = 50,
  } = request.query;

  [skip, limit] = [Number(skip), Number(limit)];

  if (Number.isNaN(skip) || Number.isNaN(limit) || skip < 0 || limit < 1) {
    response
        .status(400)
        .json([ERRORS.BAD_REQUEST])
        .end();

    return;
  }

  const data = DB_MOCK
      .slice(skip, skip + limit);

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
