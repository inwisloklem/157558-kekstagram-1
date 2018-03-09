const Errors = require(`./errors.js`);

const {
  async,
  createStreamFromBuffer,
} = require(`./utils.js`);

const validate = require(`./validate.js`);
const scheme = require(`./post-scheme.js`);

const postStore = require(`./post-store.js`);
const imageStore = require(`./image-store.js`);

const createPost = async(async (request, response) => {
  const data = Object.assign({}, request.body);
  const image = request.file;

  if (image) {
    data.filename = {
      path: `/photos/${data.date}`,
      mimetype: image.mimetype
    };
  }

  const errors = validate(data, scheme);

  if (errors.length > 0) {
    response
        .status(400)
        .json(errors)
        .end();

    return;
  }

  await imageStore
      .save(data.filename.path, createStreamFromBuffer(image.buffer));

  await postStore
      .savePost(data);

  response
      .status(200)
      .send(data);
});

const getAllPosts = async(async (request, response) => {
  let {
    skip = 0,
    limit = 50,
  } = request.query;

  [skip, limit] = [Number(skip), Number(limit)];

  if (!Number.isInteger(skip) || !Number.isInteger(limit) || skip < 0 || limit < 1) {
    response
        .status(400)
        .json([Errors.BAD_REQUEST])
        .end();

    return;
  }

  const cursor = await postStore
      .getAllPosts();

  const data = await cursor
      .skip(skip).limit(limit)
      .toArray();

  response
      .status(200)
      .json(data);
});

const getImage = async(async (request, response) => {
  const date = request.params.date;

  if (!Number.isInteger(Number(request.params.date))) {
    response
        .status(400)
        .json([Errors.BAD_REQUEST])
        .end();

    return;
  }

  const post = await postStore
      .getPostByQuery({date: String(date)});

  if (!post) {
    response
        .status(404)
        .json([Errors.NOT_FOUND])
        .end();

    return;
  }

  const {filename} = post;

  const {info, stream} = await imageStore
      .get(filename.path);

  if (!filename || !info || !stream) {
    response
        .status(404)
        .json([Errors.NOT_FOUND])
        .end();

    return;
  }

  response
      .set(`content-type`, filename.mimetype)
      .set(`content-length`, info.length)
      .status(200);

  stream
      .pipe(response);
});

const getPostByDate = async(async (request, response) => {
  const date = request.params.date;

  if (!Number.isInteger(Number(request.params.date))) {
    response
        .status(400)
        .json([Errors.BAD_REQUEST])
        .end();

    return;
  }

  const post = await postStore
      .getPostByQuery({date: String(date)});

  if (!post) {
    response
        .status(404)
        .json([Errors.NOT_FOUND])
        .end();

    return;
  }

  response
      .status(200)
      .json(post);
});

const handleNotImplemented = (request, response) => {
  response
      .status(501)
      .json([Errors.NOT_IMPLEMENTED])
      .end();
};

const handleInternalServerError = (exception, request, response, next) => {
  response
      .status(500)
      .json([Errors.INTERNAL_SERVER_ERROR])
      .end();

  next();
};

module.exports = {
  createPost,
  getAllPosts,
  getImage,
  getPostByDate,
  handleInternalServerError,
  handleNotImplemented,
};
