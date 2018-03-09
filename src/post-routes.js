const {Router} = require(`express`);
const bodyParser = require(`body-parser`);
const multer = require(`multer`);

const PostController = require(`./post-controller.js`);

module.exports = (postStore, imageStore) => {
  const controller = new PostController(postStore, imageStore);

  const router = new Router();
  const upload = multer({storage: multer.memoryStorage()});

  router
      .use(bodyParser.json())

      .get(`/`, controller.getAllPosts)
      .get(`/:date/image`, controller.getImage)
      .get(`/:date`, controller.getPostByDate)

      .post(`/`, upload.single(`filename`), controller.createPost)

      .use(controller.handleInternalServerError)
      .all(`*`, controller.handleNotImplemented);

  return router;
};
