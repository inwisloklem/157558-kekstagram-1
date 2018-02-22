const MESSAGE =
`This application generates data file by default.

Accessible options:
--${`author`.grey}      — ${`prints author info`.green}
--${`description`.grey} — ${`prints application description`.green}
--${`help`.grey}        — ${`prints this info`.green}
--${`license`.grey}     — ${`prints application license`.green}
--${`version`.grey}     — ${`prints application version`.green}`;

module.exports = {
  name: `help`,
  description: `Shows program help`,
  execute() {
    console.log(MESSAGE);
  }
};
