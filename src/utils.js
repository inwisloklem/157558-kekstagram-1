const byName = (name) =>
  (array) =>
    array.name === name;

const byRandom = () =>
  0.5 - Math.random();

const eachIsInArray = (array, arrayToCompare) => {
  if (array.length === 0) {
    return true;
  }
  return array.every((element) => arrayToCompare.includes(element));
};

const eachLengthIsLt = (array, max) => {
  if (array.length === 0) {
    return true;
  }
  return array.every((element) => element.length < max);
};

const eachStartsWithSymbol = (array, symbol) => {
  if (array.length === 0) {
    return true;
  }
  return array.every((element) => element[0] === symbol);
};

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
