const {author} = require(`../../package.json`);

module.exports = {
  name: `author`,
  description: `Shows program author`,
  execute() {
    console.log(`${author}`);
  }
};
