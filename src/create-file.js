const fs = require(`fs`);
require(`colors`);

const {promisify} = require(`util`);
const writeFile = promisify(fs.writeFile);

const createFile = ({filePath, data = ``}) => {
  return writeFile(filePath, data, {mode: 0o644, encoding: `utf-8`})
      .catch((e) => console.error(`Error: ${e}. Write file error.`.red));
};

module.exports = createFile;
