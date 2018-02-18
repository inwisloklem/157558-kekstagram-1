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
    url: `https://picsum.photos/600/?random`,
    scale: getRandomNumber(0, 100),
    effect: getRandomArrayElement(EFFECTS),
    hashtags: getRandomSubarray(HASHTAGS, getRandomNumber(0, 5)),
    description: getRandomArrayElement(COMMENTS),
    likes: getRandomNumber(0, 1000),
    comments: getRandomSubarray(COMMENTS, getRandomNumber(0, 10)),
  };
};

module.exports = generateEntity;
