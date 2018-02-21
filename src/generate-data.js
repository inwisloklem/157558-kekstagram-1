const generateEntity = require(`./generate-entity.js`);

const {
  pipe,
  partial,
} = require(`./utils.js`);

const generateData = (fn, max) =>
  Array(...Array(max)).map(fn);

const formatData = (data) =>
  JSON.stringify(data, null, 2);

const generateFormattedData = partial(pipe(generateData, formatData), generateEntity);

module.exports = generateFormattedData;
