const generateEntity = require(`./generate-entity`);

const {
  pipe,
  partialApply,
} = require(`../utils`);

const generateData = (fn, count) =>
  [...Array(count)].map(fn);

const formatData = (data) =>
  JSON.stringify(data, null, 2);

const generateFormattedData = partialApply(pipe(generateData, formatData), generateEntity);

module.exports = {
  generateData,
  generateFormattedData,
};
