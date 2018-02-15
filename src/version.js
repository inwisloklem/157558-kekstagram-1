const {version} = require(`../package.json`);

const VERSION_COLORS = [
  `red`,
  `green`,
  `blue`,
];

const colorizeBy = (colors) =>
  (prev, next, ndx) => {
    prev += next[colors[ndx]];
    if (colors.length - 1 !== ndx) {
      prev += `.`;
    }
    return prev;
  };

const colorizedVersion = version
    .split(`.`)
    .reduce(colorizeBy(VERSION_COLORS), ``);

module.exports = {
  name: `version`,
  description: `Shows program version`,
  execute() {
    console.log(`v${colorizedVersion}`);
  }
};
