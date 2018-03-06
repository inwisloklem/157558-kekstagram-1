const {EFFECTS} = require(`./data.js`);

const {
  combine,
  everyTextLength,
  everyWordIsUnique,
  everyWordStartsWith,
  isGreaterThanOrEqual,
  isImage,
  isInRange,
  isInteger,
  isOneOf,
  maxWords,
  textLength,
} = require(`./asserts.js`);

const scheme = {
  date: {
    required: true,
    asserts: [
      isInteger,
      isGreaterThanOrEqual(0),
    ],
  },
  description: {
    asserts: [
      textLength(0, 140),
    ],
  },
  effect: {
    required: true,
    asserts: [
      isOneOf(EFFECTS),
    ],
  },
  filename: {
    required: true,
    asserts: [
      isImage,
    ],
  },
  hashtags: {
    asserts: [
      combine(
          everyTextLength(0, 20),
          everyWordIsUnique,
          everyWordStartsWith(`#`),
          maxWords(5),
      ),
    ],
  },
  scale: {
    required: true,
    asserts: [
      isInteger,
      isInRange(0, 100),
    ],
  },
};

module.exports = scheme;
