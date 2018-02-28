const {Router} = require(`express`);
const bodyParser = require(`body-parser`);
const multer = require(`multer`);

const {
  createPost,
  getAllData,
  getDataByDate,
} = require(`./controller.js`);

const router = new Router();
const upload = multer({storage: multer.memoryStorage()});

router
    .use(bodyParser.json())
    .get(`/`, getAllData)
    .get(`/:date`, getDataByDate)
    .post(`/`, upload.single(), createPost);

module.exports = router;
