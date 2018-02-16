const {
  COMMENTS,
  EFFECTS,
  HASHTAGS,
} = require(`./data.js`);

const {
  getRandomNumber,
  pipe,
} = require(`./utils.js`);

const getRandomElement = (randomFn) =>
  (array) =>
    () => array[randomFn(0, array.length - 1)];

const getRandomFrom = getRandomElement(getRandomNumber);

const generateBy = (fn) =>
  (number) => {
    let result = [];

    for (let max = number; max--;) {
      result.push(fn());
    }

    return result;
  };

const getRandomComment = getRandomFrom(COMMENTS);
const getRandomEffect = getRandomFrom(EFFECTS);
const getRandomHashtag = getRandomFrom(HASHTAGS);

const generateComments = pipe(getRandomNumber, generateBy(getRandomComment));
const generateHashtags = pipe(getRandomNumber, generateBy(getRandomHashtag));

const generateEntity = () => {
  return {
    url: `https://picsum.photos/600/?random`,
    scale: getRandomNumber(0, 100),
    effect: getRandomEffect(),
    hashtags: generateHashtags(0, 5),
    description: getRandomComment(),
    likes: getRandomNumber(0, 1000),
    comments: generateComments(0, 10),
  };
};

module.exports = generateEntity;
