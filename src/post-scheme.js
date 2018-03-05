const {EFFECTS} = require(`./data.js`);

const {
  everyTextInRange,
  everyWordIsUnique,
  everyWordStartsWith,
  greaterThanEqual,
  image,
  inRange,
  integer,
  oneOf,
  maxWords,
  required,
  textInRange,
} = require(`./asserts.js`);

const scheme = {
  date: [
    required,
    integer,
    greaterThanEqual(0),
  ],
  description: [
    textInRange(0, 140),
  ],
  effect: [
    required,
    oneOf(EFFECTS),
  ],
  filename: [
    required,
    image,
  ],
  hashtags: [
    everyTextInRange(0, 20),
    everyWordIsUnique,
    everyWordStartsWith(`#`),
    maxWords(5),
  ],
  scale: [
    required,
    integer,
    inRange(0, 100),
  ],
};

module.exports = scheme;
