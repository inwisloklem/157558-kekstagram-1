const {Router} = require(`express`);
const bodyParser = require(`body-parser`);
const multer = require(`multer`);

const {
  createPost,
  getAllPosts,
  getImage,
  getPostByDate,
  handleInternalServerError,
} = require(`./post-controller.js`);

const router = new Router();
const upload = multer({storage: multer.memoryStorage()});

router
    .use(bodyParser.json())

    .get(`/`, getAllPosts)
    .get(`/:date/image`, getImage)
    .get(`/:date`, getPostByDate)

    .post(`/`, upload.single(`filename`), createPost)

    .use(handleInternalServerError);

module.exports = router;
