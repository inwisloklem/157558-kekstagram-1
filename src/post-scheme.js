const {EFFECTS} = require(`./data.js`);

const Settings = {
  HASHTAG: `#`,
  DATE_FROM: -999999999,
  DATE_TO: 999999999,
  MIN_DATE: 0,
  MAX_COMMENTS: 10,
  MIN_COMMENTS: 0,
  MAX_COMMENT_LENGTH: 140,
  MIN_COMMENT_LENGTH: 0,
  MAX_DESC_LENGTH: 140,
  MIN_DESC_LENGTH: 0,
  MAX_HASHTAG_LENGTH: 20,
  MIN_HASHTAG_LENGTH: 0,
  MAX_HASHTAGS: 5,
  MIN_HASHTAGS: 0,
  MAX_LIKES: 1000,
  MIN_LIKES: 0,
  MAX_SCALE: 100,
  MIN_SCALE: 0,
};

const {
  combineAsserts,
  checkEveryTextLength,
  checkEveryWordIsUnique,
  checkEveryWordStartsWith,
  checkGreaterThanOrEqual,
  checkImage,
  checkInRange,
  checkInteger,
  checkOneOf,
  checkMaxWords,
  checkTextLength,
} = require(`./asserts.js`);

const scheme = {
  date: {
    required: true,
    asserts: [
      checkInteger,
      checkGreaterThanOrEqual(Settings.MIN_DATE),
    ],
  },
  description: {
    asserts: [
      checkTextLength(Settings.MIN_DESC_LENGTH, Settings.MAX_DESC_LENGTH),
    ],
  },
  effect: {
    required: true,
    asserts: [
      checkOneOf(EFFECTS),
    ],
  },
  filename: {
    required: true,
    asserts: [
      checkImage,
    ],
  },
  hashtags: {
    asserts: [
      combineAsserts(
          checkEveryTextLength(Settings.MIN_HASHTAG_LENGTH, Settings.MAX_HASHTAG_LENGTH),
          checkEveryWordIsUnique,
          checkEveryWordStartsWith(Settings.HASHTAG),
          checkMaxWords(Settings.MAX_HASHTAGS),
      ),
    ],
  },
  scale: {
    required: true,
    asserts: [
      checkInteger,
      checkInRange(Settings.MIN_SCALE, Settings.MAX_SCALE),
    ],
  },
};

module.exports = {
  scheme,
  Settings,
};
