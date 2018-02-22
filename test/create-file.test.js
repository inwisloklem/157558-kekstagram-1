const fs = require(`fs`);
const assert = require(`assert`);
const {promisify} = require(`util`);
const createFile = require(`../src/create-file.js`);

const open = promisify(fs.open);
const unlink = promisify(fs.unlink);

describe(`createFile`, () => {
  const filePath = `${process.cwd()}/sample.json`;

  it(`should create file`, () => {
    createFile({filePath})
        .then(() => open(filePath, `r`))
        .then(() => unlink(filePath))
        .catch((e) => assert.fail(e));
  });
});
