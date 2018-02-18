const byName = (name) =>
  (array) =>
    array.name === name;

const byRandom = () =>
  0.5 - Math.random();

const eachIsInArray = (array, arrayToCompare) =>
  array.reduce((prev, current) => {
    if (!arrayToCompare.includes(current)) {
      return false;
    }
    return prev;
  }, true);

const eachLengthIsLt = (array, max) =>
  array.reduce((prev, current) => {
    if (current.length > max) {
      return false;
    }
    return prev;
  }, true);

const eachStartsWithSymbol = (array, symbol) =>
  array.reduce((prev, current) => {
    if (current[0] !== symbol) {
      return false;
    }
    return prev;
  }, true);

const getRandomArrayElement = (array) =>
  array[Math.floor(Math.random() * array.length)];

const getRandomNumber = (min, max) =>
  Math.floor(Math.random() * ((max - min) + 1)) + min;

const getRandomSubarray = (array, number) =>
  array.sort(byRandom).slice(0, number);

const isUnique = (array) =>
  (new Set(array)).size === array.length;

const pipe = (...fns) =>
  fns.reduce((f, g) => (...args) => g(f(...args)));

module.exports = {
  byName,
  byRandom,
  eachIsInArray,
  eachLengthIsLt,
  eachStartsWithSymbol,
  getRandomArrayElement,
  getRandomNumber,
  getRandomSubarray,
  isUnique,
  pipe,
};
