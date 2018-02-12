const MESSAGE =
`This application does nothing yet.

Accessible options:
--help    — prints this info;
--version — prints application version.`;

module.exports = {
  name: `help`,
  description: `Shows program help`,
  execute() {
    console.log(MESSAGE);
  }
};
