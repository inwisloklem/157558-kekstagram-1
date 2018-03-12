const MESSAGE =
`${`Kekstagram server and command line utilities set.`.cyan.bold}

Accessible options:
--${`author`.grey}         — ${`prints author info`.green}
--${`description`.grey}    — ${`prints application description`.green}
--${`generate`.grey}       — ${`generates file with data`.green}
--${`fill`.grey}           — ${`fills database with data`.green}
--${`help`.grey}           — ${`prints this info`.green}
--${`license`.grey}        — ${`prints application license`.green}
--${`server [port]`.grey}  — ${`starts local server`.green}
--${`version`.grey}        — ${`prints application version`.green}`;

module.exports = {
  name: `help`,
  description: `Shows program help`,
  execute() {
    console.log(MESSAGE);
  }
};
