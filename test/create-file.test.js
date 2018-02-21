const fs = require(`fs`);
const assert = require(`assert`);
const {promisify} = require(`util`);
const createFile = require(`../src/create-file.js`);

const access = promisify(fs.access);
const unlink = promisify(fs.unlink);

describe(`createFile`, () => {
  const filePath = `${process.cwd()}/sample.json`;

  it(`should create file`, () => {
    createFile({filePath})
        .then(() => access(filePath))
        .then(() => unlink(filePath))
        .catch((e) => assert.fail(e));
  });
});
