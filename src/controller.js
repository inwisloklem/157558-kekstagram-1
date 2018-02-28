const DB_MOCK = require(`./mock.js`);
const {byDate} = require(`./utils.js`);

const createPost = async (request, response) => {
  response
      .status(200)
      .send(request.body);
};

const getAllData = async (request, response) => {
  const {
    limit = 50,
    skip = 0,
  } = request.query;

  if (!Number.isInteger(+skip) || !Number.isInteger(+limit)) {
    response
        .status(400)
        .end();

    return;
  }

  response
      .status(200)
      .json(DB_MOCK.slice(skip, limit));
};

const getDataByDate = async (request, response) => {
  const date = +request.params.date;

  const posts = DB_MOCK.filter(byDate(date));

  if (!Number.isInteger(date)) {
    response
        .status(400)
        .end();

    return;
  }

  if (!posts.length) {
    response
        .status(404)
        .end();

    return;
  }

  response
      .status(200)
      .json(posts);
};

module.exports = {
  createPost,
  getAllData,
  getDataByDate,
};
