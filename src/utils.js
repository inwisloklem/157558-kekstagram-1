const byName = (name) => (array) =>
  array.name === name;

const pipe = (...fns) =>
  fns.reduce((f, g) => (...args) => g(f(...args)));

const getRandomNumber = (min, max) =>
  Math.floor(Math.random() * ((max - min) + 1)) + min;

module.exports = {
  byName,
  getRandomNumber,
  pipe,
};
