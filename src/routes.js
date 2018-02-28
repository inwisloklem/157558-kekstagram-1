const {Router} = require(`express`);
const bodyParser = require(`body-parser`);
const multer = require(`multer`);

const {
  createPost,
  getAllPosts,
  getByDate,
} = require(`./controller.js`);

const router = new Router();
const upload = multer({storage: multer.memoryStorage()});

router
    .use(bodyParser.json())

    .get(`/`, getAllPosts)
    .get(`/:date`, getByDate(`post`))
    .get(`/:date/image`, getByDate(`image`))

    .post(`/`, upload.single(), createPost);

module.exports = router;
