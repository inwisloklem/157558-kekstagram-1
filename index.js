const commandsList = [
  require(`./src/author.js`),
  require(`./src/description.js`),
  require(`./src/help.js`),
  require(`./src/version.js`),
];

const head = ([x]) => x;

const pipe = (...fns) =>
  fns.reduce((f, g) => (...args) => g(f(...args)));

const getOptionsOrDefault = (options) => {
  if (options.length > 2) {
    return options.slice(2);
  }
  return [`--help`];
};

const getCommandName = (args) => args.slice(2);

const getCurrentCommand = pipe(getOptionsOrDefault, head, getCommandName);

const byName = (name) => (command) =>
  command.name === name;

const findCommandByName = (cliArguments) => (commands) =>
  commands.find(byName(getCurrentCommand(cliArguments)));

const executeCommand = (command) => {
  try {
    command.execute();
  } catch (e) {
    console.error(`Bad option. To get list of possible options type '--help'.`);
    process.exit(1);
  }
};

const runCurrentCommand = pipe(findCommandByName(process.argv), executeCommand);

runCurrentCommand(commandsList);
