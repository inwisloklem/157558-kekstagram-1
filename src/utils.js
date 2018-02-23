const byName = (name) =>
  (array) =>
    array.name === name;

const eachIsInArray = (array, arrayToCompare) => {
  if (array.length === 0) {
    return true;
  }
  return array.every((element) => arrayToCompare.includes(element));
};

const eachIsUnique = (array) => {
  const unique = new Set(array);
  return unique.size === array.length;
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

const shuffleArray = (array) => {
  let result = [];
  let currentArray = [...array];

  while (currentArray.length !== 0) {
    let ndx = Math.floor(currentArray.length * Math.random());
    result.push(currentArray[ndx]);
    currentArray.splice(ndx, 1);
  }

  return result;
};

const getRandomSubarray = (array, subLength) => {
  const shuffled = shuffleArray(array);
  return shuffled.slice(0, subLength);
};

const pipe = (...fns) =>
  fns.reduce((f, g) => (...args) => g(f(...args)));

const partial = (fn, ...currentArgs) =>
  (...laterArgs) =>
    fn(...currentArgs, ...laterArgs);

module.exports = {
  byName,
  eachIsInArray,
  eachIsUnique,
  eachLengthIsLt,
  eachStartsWithSymbol,
  getRandomArrayElement,
  getRandomNumber,
  getRandomSubarray,
  pipe,
  partial,
};
