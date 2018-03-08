const {Router} = require(`express`);
const bodyParser = require(`body-parser`);
const multer = require(`multer`);

// const postStore = require(`./post-store.js`);
// const imageStore = require(`./image-store.js`);

const {
  createPost,
  getAllPosts,
  getImage,
  getPostByDate,
} = require(`./post-controller.js`);

// Я хочу в тестах подменять postStore, imageStore

/*
const {
  createPost,
  getAllPosts,
  getImage,
  getPostByDate,
} = require(`./post-controller.js`)(postStore, imageStore);
*/

const router = new Router();
const upload = multer({storage: multer.memoryStorage()});

router
    .use(bodyParser.json())

    .get(`/`, getAllPosts)
    .get(`/:date/image`, getImage)
    .get(`/:date`, getPostByDate)

    .post(`/`, upload.single(`filename`), createPost);

module.exports = router;
