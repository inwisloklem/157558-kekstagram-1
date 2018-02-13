const MESSAGE =
`This application does nothing yet.

Accessible options:
--author      — prints author info
--description — prints application description
--help        — prints this info
--license     — prints application license
--version     — prints application version`;

module.exports = {
  name: `help`,
  description: `Shows program help`,
  execute() {
    console.log(MESSAGE);
  }
};
