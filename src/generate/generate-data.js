const generateEntity = require(`./generate-entity`);

const {prettyPrint} = require(`../utils`);

const {
  pipe,
  partialApply,
} = require(`../utils`);

const generateData = (fn, count) =>
  [...Array(count)].map(fn);

const generateFormattedData = partialApply(pipe(generateData, prettyPrint), generateEntity);

module.exports = {
  generateData,
  generateFormattedData,
};
