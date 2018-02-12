const byName = (name) => (array) =>
  array.name === name;

const pipe = (...fns) =>
  fns.reduce((f, g) => (...args) => g(f(...args)));

module.exports = {
  byName,
  pipe,
};
