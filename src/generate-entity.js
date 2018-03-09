const {
  COMMENTS,
  EFFECTS,
  HASHTAGS,
} = require(`./data.js`);

const {Settings} = require(`./post-scheme.js`);

const {
  getRandomNumber,
  getRandomArrayElement,
  getRandomSubarray,
} = require(`./utils.js`);

const generateEntity = () => {
  const date = Date.now() + getRandomNumber(Settings.DATE_FROM, Settings.DATE_TO);

  return {
    comments: getRandomSubarray(COMMENTS, getRandomNumber(Settings.MIN_COMMENTS, Settings.MAX_COMMENTS)),
    date,
    description: getRandomArrayElement(COMMENTS),
    effect: getRandomArrayElement(EFFECTS),
    hashtags: getRandomSubarray(HASHTAGS, getRandomNumber(Settings.MIN_HASHTAGS, Settings.MAX_HASHTAGS)).join(` `),
    likes: getRandomNumber(Settings.MIN_LIKES, Settings.MAX_LIKES),
    scale: getRandomNumber(Settings.MIN_SCALE, Settings.MAX_SCALE),
    url: `/api/posts/${date}/image`,
  };
};

module.exports = generateEntity;
