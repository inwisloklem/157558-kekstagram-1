const {Router} = require(`express`);
const bodyParser = require(`body-parser`);
const multer = require(`multer`);

const {
  createPost,
  getAllPosts,
  getPostByDate,
} = require(`./post-controller.js`);

const router = new Router();
const upload = multer({storage: multer.memoryStorage()});

router
    .use(bodyParser.json())

    .get(`/`, getAllPosts)
    .get(`/:date`, getPostByDate)

    .post(`/`, upload.single(`filename`), createPost);

module.exports = router;
