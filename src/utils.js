const pipe = (...fns) =>
  fns.reduce((f, g) => (...args) => g(f(...args)));

module.exports = {
  pipe,
};
