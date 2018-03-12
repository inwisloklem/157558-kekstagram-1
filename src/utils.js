const {Duplex} = require(`stream`);

const async = (fn) =>
  (request, response, next) =>
    fn(request, response, next)
        .catch(next);

const byName = (name) =>
  (array) =>
    array.name === name;

const byDate = (date) =>
  (item) =>
    item.date === date;

const createStreamFromBuffer = (buffer) => {
  const stream = new Duplex();

  stream.push(buffer);
  stream.push(null);

  return stream;
};

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

const log = ({message, type}) => {
  const MessageType = {
    TEXT: `text`,
    ERROR: `error`,
  };

  switch (type) {
    case MessageType.TEXT:
      console.log(message.green);
      break;
    case MessageType.ERROR:
      console.error(message.red);
      break;
    default:
      console.log(message);
  }
};

const pipe = (...fns) =>
  fns.reduce((f, g) => (...args) => g(f(...args)));

const partial = (fn, ...currentArgs) =>
  (...laterArgs) =>
    fn(...currentArgs, ...laterArgs);

const prettyPrint = (object) =>
  JSON.stringify(object, null, 2);

module.exports = {
  async,
  byDate,
  byName,
  createStreamFromBuffer,
  eachIsInArray,
  eachIsUnique,
  eachLengthIsLt,
  eachStartsWithSymbol,
  getRandomArrayElement,
  getRandomNumber,
  getRandomSubarray,
  log,
  pipe,
  partial,
  prettyPrint,
};
