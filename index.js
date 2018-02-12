const {
  byName,
  pipe,
} = require(`./src/utils.js`);

const commandsList = [
  require(`./src/author.js`),
  require(`./src/description.js`),
  require(`./src/help.js`),
  require(`./src/license.js`),
  require(`./src/version.js`),
];

const getOption = (options) => {
  if (options.length > 2) {
    return options[2].slice(2);
  }
  return `help`;
};

const findCommandByName = (cliArguments) => (commands) =>
  commands.find(byName(getOption(cliArguments)));

const executeCommand = (command) => {
  try {
    command.execute();
  } catch (e) {
    console.error(`Bad option. To get list of possible options type '--help'`);
    process.exit(1);
  }
};

const runCurrentCommand = pipe(findCommandByName(process.argv), executeCommand);

runCurrentCommand(commandsList);
