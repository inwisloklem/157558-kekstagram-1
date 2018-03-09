const {EFFECTS} = require(`./data.js`);

const Settings = require(`./post-settings.js`);

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

module.exports = scheme;
