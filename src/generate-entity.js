const {
  COMMENTS,
  EFFECTS,
  HASHTAGS,
} = require(`./data.js`);

const {
  getRandomNumber,
  getRandomArrayElement,
  getRandomSubarray,
} = require(`./utils.js`);

const generateEntity = () => {
  return {
    comments: getRandomSubarray(COMMENTS, getRandomNumber(0, 10)),
    date: Date.now(),
    description: getRandomArrayElement(COMMENTS),
    effect: getRandomArrayElement(EFFECTS),
    hashtags: getRandomSubarray(HASHTAGS, getRandomNumber(0, 5)),
    likes: getRandomNumber(0, 1000),
    scale: getRandomNumber(0, 100),
    url: `https://picsum.photos/600/?random`,
  };
};

module.exports = generateEntity;
