const fs = require(`fs`);
const readline = require(`readline`);
const generateFormattedData = require(`./generate-data.js`);
const createFile = require(`./create-file.js`);

const {promisify} = require(`util`);
const access = promisify(fs.access);

const rl = readline.createInterface({input: process.stdin, output: process.stdout});

const withMessage = (message) => {
  console.log(message.green);
  process.exit(0);
};

const withError = (error) => {
  console.error(error.red);
  process.exit(1);
};

const questionGenerateData = () =>
  new Promise((resolve, reject) => {
    const handleAnswer = (answer) => {
      if (answer.trim() === `y`) {
        resolve();
      } else {
        reject(withMessage(`Bye-bye!`));
      }
    };

    rl.question(`Generate data file? (type 'y' for yes): `, handleAnswer);
  });

const questionEntitiesNumber = () =>
  new Promise((resolve, reject) => {
    const handleAnswer = (answer) => {
      const numberEntities = parseInt(answer, 10);

      if (!Number.isNaN(numberEntities)) {
        resolve(numberEntities);
      } else {
        reject(withError(`Number, please.`));
      }
    };

    rl.question(`Number of entities to generate: `, handleAnswer);
  });

const createFileWith = (numberEntities, filePath) => {
  const fOptions = {
    filePath,
    data: generateFormattedData(numberEntities)
  };

  return createFile(fOptions);
};

const questionRewriteFile = ({numberEntities, filePath}) =>
  new Promise((resolve, reject) => {
    const handleAnswer = (answer) => {
      if (answer.trim() === `y`) {
        createFileWith({numberEntities, filePath})
            .then(withMessage(`File was overwritten.`));
      } else {
        reject(withMessage(`File left intact. Bye-bye!`));
      }
    };

    rl.question(`Rewrite file? (type 'y' for yes): `, handleAnswer);
  });

const questionFilePath = (numberEntities) =>
  new Promise((resolve) => {
    const handleAnswer = (fileName) => {
      const filePath = `${process.cwd()}/${fileName}.json`;

      access(filePath)
          .then(() => questionRewriteFile({numberEntities, filePath}))
          .catch(() => createFileWith(numberEntities, filePath)
              .then(() => withMessage(`Task complete. File was created.`))
              .then(() => resolve()));
    };

    rl.question(`Enter filename w/o extension (e.g. data): `, handleAnswer);
  });

module.exports = {
  name: `default`,
  description: `Generates data file`,
  execute() {
    questionGenerateData()
        .then(questionEntitiesNumber)
        .then(questionFilePath)
        .catch(withError);
  }
};
