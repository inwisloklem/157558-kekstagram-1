const {EFFECTS} = require(`./data.js`);

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
      checkGreaterThanOrEqual(0),
    ],
  },
  description: {
    asserts: [
      checkTextLength(0, 140),
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
          checkEveryTextLength(0, 20),
          checkEveryWordIsUnique,
          checkEveryWordStartsWith(`#`),
          checkMaxWords(5),
      ),
    ],
  },
  scale: {
    required: true,
    asserts: [
      checkInteger,
      checkInRange(0, 100),
    ],
  },
};

module.exports = scheme;
