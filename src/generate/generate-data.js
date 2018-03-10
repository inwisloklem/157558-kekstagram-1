const generateEntity = require(`./generate-entity`);

const {
  pipe,
  partial,
} = require(`../utils`);

const generateData = (fn, count) =>
  [...Array(count)].map(fn);

const formatData = (data) =>
  JSON.stringify(data, null, 2);

const generateFormattedData = partial(pipe(generateData, formatData), generateEntity);

module.exports = generateFormattedData;
