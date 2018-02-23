const fs = require(`fs`);
const readline = require(`readline`);
const generateFormattedData = require(`./generate-data.js`);
const createFile = require(`./create-file.js`);

const {promisify} = require(`util`);
const open = promisify(fs.open);

const rl = readline.createInterface({input: process.stdin, output: process.stdout});

const log = ({message, type}) => {
  switch (type) {
    case `text`:
      console.log(message.green);
      break;
    case `error`:
      console.error(message.red);
      break;
    default:
      console.log(message);
  }
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
        reject({message: `Bye-bye!`, type: `text`});
      }
    };

    rl.question(`Generate data file? (type 'y' for yes): `.green, handleAnswer);
  });

const askItemCount = () =>
  new Promise((resolve, reject) => {
    const handleAnswer = (answer) => {
      const itemsCount = parseInt(answer, 10);

      if (!Number.isNaN(itemsCount)) {
        resolve(itemsCount);
      } else {
        reject({message: `Number, please.`, type: `error`});
      }
    };

    rl.question(`Number of entities to generate: `.green, handleAnswer);
  });

const askFilePath = () =>
  new Promise((resolve) => {
    const handleAnswer = (fileName) => {
      resolve(`${process.cwd()}/${fileName}.json`);
    };

    rl.question(`Enter filename w/o extension (e.g. data): `.green, handleAnswer);
  });

const checkExist = (filePath) =>
  open(filePath, `r`)
      .then(() => true)
      .catch((e) => {
        return (e.code === `ENOENT` ? false : Promise.reject(e));
      });

const askRewrite = () =>
  new Promise((resolve, reject) => {
    const handleAnswer = (answer) => {
      if (answer.trim() === `y`) {
        resolve(true);
      } else {
        reject({message: `File left intact. Bye-bye!`, type: `text`});
      }
    };

    rl.question(`Rewrite file? (type 'y' for yes): `.yellow, handleAnswer);
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
        return;
      }
      await createFileWith(itemsCount, filePath);

      const message = isFileExists ?
        {message: `Task complete. File was overwritten.`, type: `text`} :
        {message: `Task complete. File was created.`, type: `text`};

      log(message);

      rl.close();
    } catch (e) {
      log(e);
      process.exit(1);
    }
  }
};
