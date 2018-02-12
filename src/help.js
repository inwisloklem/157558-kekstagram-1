const MESSAGE =
`This application does nothing yet.

Accessible options:
--author      — prints author info;
--description — prints program description;
--help        — prints this info;
--license     — prints program license;
--version     — prints application version.`;

module.exports = {
  name: `help`,
  description: `Shows program help`,
  execute() {
    console.log(MESSAGE);
  }
};
