const getOptions = () =>
  process.argv.slice(2);

const getMessage = (options) => {
  const [firstOption] = options;

  switch(firstOption) {
    case '--help':
      return {
        text:
`This application does nothing yet.

Accessible options:
--help    — prints this info;
--version — prints application version.`,
        type: 'log',
      };
    case '--version':
      return {
        text: '0.1.0',
        type: 'log',
      };
    default:
      return {
        text: `Bad option: ${firstOption}. To get list of possible options type '--help'.`,
        type: 'error',
      };
  }
};

const showMessage = (message) => {
  if (message.type === 'log') {
    console.log(message.text);
    return;
  }
  if (message.type === 'error') {
    console.error(message.text);
    return;
  }
  return 'Message type uknown.';
}

showMessage(getMessage(getOptions()));
