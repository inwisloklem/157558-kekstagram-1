const Errors = require(`./errors.js`);

const {
  async,
  createStreamFromBuffer,
} = require(`./utils.js`);

const validate = require(`./validate.js`);
const {scheme} = require(`./post-scheme.js`);

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

      return;
    }

    await this.imageStore
        .save(data.filename.path, createStreamFromBuffer(image.buffer));

    await this.postStore
        .savePost(data);

    response
        .status(200)
        .send(data);
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
  }

  async getImage(request, response) {
    const date = request.params.date;

    if (!Number.isInteger(Number(request.params.date))) {
      response
          .status(400)
          .json([Errors.BAD_REQUEST])
          .end();

      return;
    }

    const post = await this.postStore
        .getPostByQuery({date: String(date)});

    if (!post) {
      response
          .status(404)
          .json([Errors.NOT_FOUND])
          .end();

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

      return;
    }

    response
        .set(`content-type`, filename.mimetype)
        .set(`content-length`, info.length)
        .status(200);

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

      return;
    }

    const post = await this.postStore
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
  }

  handleNotImplemented(request, response) {
    response
        .status(501)
        .json([Errors.NOT_IMPLEMENTED])
        .end();
  }

  handleInternalServerError(exception, request, response, next) {
    response
        .status(500)
        .json([Errors.INTERNAL_SERVER_ERROR])
        .end();

    next();
  }
}

module.exports = PostController;
