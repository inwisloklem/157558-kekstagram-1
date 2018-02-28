const DB_MOCK = require(`./mock.js`);
const {byDate} = require(`./utils.js`);

const createPost = async (request, response) => {
  response
      .status(200)
      .send(request.body);
};

const getAllPosts = async (request, response) => {
  const {
    limit = 50,
    skip = 0,
  } = request.query;

  if (Number.isNaN(+skip) || Number.isNaN(+limit) || skip < 0 || limit < 1) {
    response
        .status(400)
        .end();

    return;
  }

  response
      .status(200)
      .json(DB_MOCK.slice(+skip, +limit));
};

const getByDate = (type) =>
  async (request, response) => {
    const date = +request.params.date;

    const post = DB_MOCK.find(byDate(date));

    if (!Number.isInteger(date)) {
      response
          .status(400)
          .end();

      return;
    }

    if (typeof post !== `object`) {
      response
          .status(404)
          .end();

      return;
    }

    if (type === `image`) {
      response
          .status(302)
          .redirect(post.url);

      return;
    }

    if (type === `post`) {
      response
          .status(200)
          .json(post);

      return;
    }

    response
        .status(500)
        .end();
  };

module.exports = {
  createPost,
  getAllPosts,
  getByDate,
};
