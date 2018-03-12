require(`colors`);

const {
  byName,
  pipe,
  log,
} = require(`./src/utils`);

const commandsList = [
  require(`./src/cli/author`),
  require(`./src/cli/help`),
  require(`./src/cli/description`),
  require(`./src/cli/generate`),
  require(`./src/cli/fill`),
  require(`./src/cli/license`),
  require(`./src/cli/server`),
  require(`./src/cli/version`),
];

require(`dotenv`).config();

const getOption = (options) => {
  if (options.length > 2) {
    return options[2].slice(2);
  }
  return `help`;
};

const findCommandByName = (cliArguments) =>
  (commands) =>
    commands
        .find(byName(getOption(cliArguments)));

const executeCommand = (command) => {
  try {
    command.execute();
  } catch (e) {
    log({message: `Bad option. To get list of possible options type '--help'`, type: `error`});
    process.exit(1);
  }
};

const runCurrentCommand = pipe(findCommandByName(process.argv), executeCommand);

runCurrentCommand(commandsList);
