const Errors = require(`./errors`);

const logger = require(`./logger`);

const {
  async,
  createStreamFromBuffer,
} = require(`../utils`);

const validate = require(`./validate`);
const scheme = require(`./post-scheme`);

class PostController {
  constructor(postStore, imageStore) {
    this.postStore = postStore;
    this.imageStore = imageStore;

    this.createPost = async(this.createPost.bind(this));
    this.getAllPosts = async(this.getAllPosts.bind(this));
    this.getImage = async(this.getImage.bind(this));
    this.getPostByDate = async(this.getPostByDate.bind(this));
  }

  async createPost(request, response) {
    const data = Object.assign({}, request.body);
    const image = request.file;

    if (image) {
      data.filename = {
        path: `/photos/${data.date}`,
        mimetype: image.mimetype
      };

      data.url = `/api/posts/${data.date}/image`;
    }

    const errors = validate(data, scheme);

    if (errors.length > 0) {
      response
          .status(400)
          .json(errors)
          .end();

      logger.info(`Server responds w/ 400 Bad Request (validation errors).`);
      return;
    }

    await this.imageStore
        .save(data.filename.path, createStreamFromBuffer(image.buffer));

    await this.postStore
        .savePost(data);

    response
        .status(200)
        .send(data);

    logger.info(`Server responds w/ 200 OK (accepted data).`);
  }

  async getAllPosts(request, response) {
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

      logger.info(`Server responds w/ 400 Bad Request.`);
      return;
    }

    const cursor = await this.postStore
        .getAllPosts();

    const data = await cursor
        .skip(skip).limit(limit)
        .toArray();

    response
        .status(200)
        .json(data);

    logger.info(`Server responds w/ 400 Bad Request.`);
  }

  async getImage(request, response) {
    const date = request.params.date;

    if (!Number.isInteger(Number(request.params.date))) {
      response
          .status(400)
          .json([Errors.BAD_REQUEST])
          .end();

      logger.info(`Server responds w/ 400 Bad Request.`);
      return;
    }

    const post = await this.postStore
        .getPostByQuery({date: String(date)});

    if (!post) {
      response
          .status(404)
          .json([Errors.NOT_FOUND])
          .end();

      logger.info(`Server responds w/ 404 Not Found.`);
      return;
    }

    const {filename} = post;

    const {info, stream} = await this.imageStore
        .get(filename.path);

    if (!filename || !info || !stream) {
      response
          .status(404)
          .json([Errors.NOT_FOUND])
          .end();

      logger.info(`Server responds w/ 404 Not Found.`);
      return;
    }

    response
        .set(`content-type`, filename.mimetype)
        .set(`content-length`, info.length)
        .status(200);

    logger.info(`Server responds w/ 200 OK.`);

    stream
        .pipe(response);
  }

  async getPostByDate(request, response) {
    const date = request.params.date;

    if (!Number.isInteger(Number(request.params.date))) {
      response
          .status(400)
          .json([Errors.BAD_REQUEST])
          .end();

      logger.info(`Server responds w/ 200 OK.`);
      return;
    }

    const post = await this.postStore
        .getPostByQuery({date: String(date)});

    if (!post) {
      response
          .status(404)
          .json([Errors.NOT_FOUND])
          .end();

      logger.info(`Server responds w/ 404 Not Found.`);
      return;
    }

    response
        .status(200)
        .json(post);

    logger.info(`Server responds w/ 200 OK.`);
  }

  handleCORS(request, response, next) {
    response
        .header(`Access-Control-Allow-Origin`, `*`)
        .header(`Access-Control-Allow-Headers`, `Origin, X-Requested-With, Content-Type, Accept`);

    logger.info(`Server sets proper CORS headers.`);
    next();
  }

  handleNotImplemented(request, response) {
    response
        .status(501)
        .json([Errors.NOT_IMPLEMENTED])
        .end();

    logger.info(`Server responds w/ 501 Not Implemented.`);
  }

  handleInternalServerError(exception, request, response, next) {
    response
        .status(500)
        .json([Errors.INTERNAL_SERVER_ERROR])
        .end();

    logger.error(`Server responds w/ 500 Internal Server Error.`, exception);
    next();
  }
}

module.exports = PostController;
