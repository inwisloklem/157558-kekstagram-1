const Errors = require(`./errors`);

const logger = require(`./logger`);

const render = require(`./render`);

const {
  async,
  createStreamFromBuffer,
} = require(`../utils`);

const validate = require(`./validate`);
const scheme = require(`./post-scheme`);

const Messages = {
  OK: `Server responded 200 OK.`,
  OK_ACCEPTED: `Server responded 200 OK (accepted data).`,
  BAD_REQUEST: `Server responded 400 Bad Request.`,
  BAD_REQUEST_VALIDATION: `Server responded 400 Bad Request (validation errors).`,
  NOT_FOUND: `Server responded 404 Not Found.`,
  NOT_IMPLEMENTED: `Server responded 501 Not Implemented.`,
  INTERNAL_SERVER_ERROR: `Server responded 500 Internal Server Error.`,
};

class PostController {
  constructor(postStore, imageStore) {
    this._postStore = postStore;
    this._imageStore = imageStore;

    this.createPost = async(this.createPost.bind(this));
    this.getAllPosts = async(this.getAllPosts.bind(this));
    this.getImage = async(this.getImage.bind(this));
    this.getPostByDate = async(this.getPostByDate.bind(this));
  }

  async createPost(request, response) {
    const data = Object.assign({}, request.body);
    const image = request.file;

    data.date = Date.now();

    if (image) {
      data.filename = {
        path: `/photos/${data.date}`,
        mimetype: image.mimetype
      };

      data.url = `/api/posts/${data.date}/image`;
    }

    const errors = validate(data, scheme);

    if (errors.length > 0) {
      response.status(400);
      render(request, response, errors);

      logger.info(Messages.BAD_REQUEST_VALIDATION, {details: {data, errors}});
      return;
    }

    await this._imageStore
        .save(data.filename.path, createStreamFromBuffer(image.buffer));

    await this._postStore
        .savePost(data);

    response.status(200);
    render(request, response, data);

    logger.info(Messages.OK_ACCEPTED, {details: {data}});
  }

  async getAllPosts(request, response) {
    let {
      skip = 0,
      limit = 50,
    } = request.query;

    [skip, limit] = [Number(skip), Number(limit)];

    if (!Number.isInteger(skip) || !Number.isInteger(limit) || skip < 0 || limit < 1) {
      response.status(400);
      render(request, response, [Errors.BAD_REQUEST]);

      logger.info(Messages.BAD_REQUEST, {details: {skip, limit}});
      return;
    }

    const cursor = await this._postStore
        .getAllPosts();

    const data = await cursor
        .skip(skip).limit(limit)
        .toArray();

    response.status(200);
    render(request, response, data);

    logger.info(Messages.OK, {details: {data}});
  }

  async getImage(request, response) {
    const date = request.params.date;

    if (!Number.isInteger(Number(request.params.date))) {
      response.status(400);
      render(request, response, [Errors.BAD_REQUEST]);

      logger.info(Messages.BAD_REQUEST, {details: {date}});
      return;
    }

    const post = await this._postStore
        .getPostByQuery({date: Number(date)});

    if (!post) {
      response.status(404);
      render(request, response, [Errors.NOT_FOUND]);

      logger.info(Messages.NOT_FOUND, {details: {date}});
      return;
    }

    const {filename} = post;

    const {info, stream} = await this._imageStore
        .get(filename.path);

    if (!filename || !info || !stream) {
      response.status(404);
      render(request, response, [Errors.NOT_FOUND]);

      logger.info(Messages.DETAILS, {details: {filename, info}});
      return;
    }

    response
        .set(`content-type`, filename.mimetype)
        .set(`content-length`, info.length)
        .status(200);

    logger.info(Messages.OK, {details: {filename, info}});

    stream
        .pipe(response);
  }

  async getPostByDate(request, response) {
    const date = request.params.date;

    if (!Number.isInteger(Number(request.params.date))) {
      response.status(400);
      render(request, response, [Errors.BAD_REQUEST]);

      logger.info(Messages.BAD_REQUEST, {details: {date}});
      return;
    }

    const post = await this._postStore
        .getPostByQuery({date: Number(date)});

    if (!post) {
      response.status(404);
      render(request, response, [Errors.NOT_FOUND]);

      logger.info(Messages.NOT_FOUND, {details: {date}});
      return;
    }

    response.status(200);
    render(request, response, post);

    logger.info(Messages.OK, {details: {post}});
  }

  static handleCORS(request, response, next) {
    response
        .header(`Access-Control-Allow-Origin`, `*`)
        .header(`Access-Control-Allow-Headers`, `Origin, X-Requested-With, Content-Type, Accept`);

    next();
  }

  static handleNotImplemented(request, response) {
    response.status(501);
    render(request, response, [Errors.NOT_IMPLEMENTED]);

    logger.info(Messages.NOT_IMPLEMENTED, {details: {url: request.url}});
  }

  static handleInternalServerError(exception, request, response, next) {
    response.status(500);
    render(request, response, [Errors.INTERNAL_SERVER_ERROR]);

    logger.error(Messages.INTERNAL_SERVER_ERROR, {details: {exception}});
    next();
  }
}

module.exports = PostController;
