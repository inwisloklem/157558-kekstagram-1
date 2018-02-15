const {version} = require(`../package.json`);
require(`colors`);

const [major, minor, patch] = version.split(`.`);

module.exports = {
  name: `version`,
  description: `Shows program version`,
  execute() {
    console.log(`v${major.red}.${minor.green}.${patch.blue}`);
  }
};
