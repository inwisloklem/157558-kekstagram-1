const fs = require(`fs`);
const readline = require(`readline`);
const generateFormattedData = require(`./generate-data.js`);
const createFile = require(`./create-file.js`);

const {promisify} = require(`util`);
const open = promisify(fs.open);

const rl = readline.createInterface({input: process.stdin, output: process.stdout});

const logMessage = (message) => {
  console.log(message.green);
};

const logError = (error) => {
  console.error(error.red);
};

const createFileWith = (itemsCount, filePath) => {
  const options = {
    filePath,
    data: generateFormattedData(itemsCount),
  };

  return createFile(options);
};

const askGenerateData = () =>
  new Promise((resolve, reject) => {
    const handleAnswer = (answer) => {
      if (answer.trim() === `y`) {
        resolve();
      } else {
        logMessage(`Bye-bye!`);
        reject();
      }
    };

    rl.question(`Generate data file? (type 'y' for yes): `, handleAnswer);
  });

const askItemCount = () =>
  new Promise((resolve, reject) => {
    const handleAnswer = (answer) => {
      const itemsCount = parseInt(answer, 10);

      if (!Number.isNaN(itemsCount)) {
        resolve(itemsCount);
      } else {
        logError(`Number, please.`);
        reject();
      }
    };

    rl.question(`Number of entities to generate: `, handleAnswer);
  });

const askFilePath = () =>
  new Promise((resolve) => {
    const handleAnswer = (fileName) => {
      resolve(`${process.cwd()}/${fileName}.json`);
    };

    rl.question(`Enter filename w/o extension (e.g. data): `, handleAnswer);
  });

const checkExist = (filePath) =>
  open(filePath, `r`)
      .then(() => true)
      .catch(() => false);

const askRewrite = () =>
  new Promise((resolve, reject) => {
    const handleAnswer = (answer) => {
      if (answer.trim() === `y`) {
        resolve(true);
      } else {
        logMessage(`File left intact. Bye-bye!`);
        reject(false);
      }
    };

    rl.question(`Rewrite file? (type 'y' for yes): `, handleAnswer);
  });

module.exports = {
  name: `default`,
  description: `Generates data file`,
  async execute() {
    try {
      await askGenerateData();

      const itemsCount = await askItemCount();
      const filePath = await askFilePath();
      const isFileExists = await checkExist(filePath);

      if (isFileExists && !await askRewrite()) {
        process.exit(0);
      }
      await createFileWith(itemsCount, filePath);

      const message = isFileExists ?
        `Task complete. File was overwritten.` : `Task complete. File was created.`;
      logMessage(message);

      process.exit(0);
    } catch (e) {
      process.exit(1);
    }
  }
};
