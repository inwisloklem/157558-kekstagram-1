const fs = require(`fs`);
const readline = require(`readline`);
const generateFormattedData = require(`../generate/generate-data`);
const createFile = require(`../generate/create-file`);
const {log} = require(`../utils`);

const {promisify} = require(`util`);
const open = promisify(fs.open);

const createFileWith = (itemsCount, filePath) => {
  const options = {
    filePath,
    data: generateFormattedData(itemsCount),
  };

  return createFile(options);
};

const askGenerateData = (line) =>
  new Promise((resolve, reject) => {
    const handleAnswer = (answer) => {
      if (answer.trim() === `y`) {
        resolve();
      } else {
        reject({message: `Bye-bye!`, type: `text`});
      }
    };

    line.question(`Generate data file? (type 'y' for yes): `.green, handleAnswer);
  });

const askItemCount = (line) =>
  new Promise((resolve, reject) => {
    const handleAnswer = (answer) => {
      const itemsCount = parseInt(answer, 10);

      if (!Number.isNaN(itemsCount)) {
        resolve(itemsCount);
      } else {
        reject({message: `Number, please.`, type: `error`});
      }
    };

    line.question(`Number of entities to generate: `.green, handleAnswer);
  });

const askFilePath = (line) =>
  new Promise((resolve) => {
    const handleAnswer = (fileName) => {
      resolve(`${process.cwd()}/${fileName}.json`);
    };

    line.question(`Enter filename w/o extension (e.g. data): `.green, handleAnswer);
  });

const checkExist = (filePath) =>
  open(filePath, `r`)
      .then(() => true)
      .catch((e) => {
        return (e.code === `ENOENT` ? false : Promise.reject(e));
      });

const askRewrite = (line) =>
  new Promise((resolve, reject) => {
    const handleAnswer = (answer) => {
      if (answer.trim() === `y`) {
        resolve(true);
      } else {
        reject({message: `File left intact. Bye-bye!`, type: `text`});
      }
    };

    line.question(`Rewrite file? (type 'y' for yes): `.yellow, handleAnswer);
  });

module.exports = {
  name: `default`,
  description: `Generates data file`,
  async execute() {
    try {
      const line = readline.createInterface({input: process.stdin, output: process.stdout});

      await askGenerateData(line);

      const itemsCount = await askItemCount(line);
      const filePath = await askFilePath(line);
      const isFileExists = await checkExist(filePath);

      if (isFileExists && !await askRewrite(line)) {
        return;
      }
      await createFileWith(itemsCount, filePath);

      const message = isFileExists ?
        {message: `Task complete. File was overwritten.`, type: `text`} :
        {message: `Task complete. File was created.`, type: `text`};

      log(message);

      line.close();
    } catch (e) {
      log(e);
      process.exit(1);
    }
  }
};
