const { createLogger, format, transports } = require("winston");
const chalk = require("chalk");

//Logger personalizado con niveles
module.exports = createLogger({
  transports: [
    new transports.Console({
      level: "info",
      format: format.combine(
        format((info) => {
          info.level = info.level.toUpperCase();
          return info;
        })(),
        format.timestamp({
          format: "YY-MM-DD HH:MM:SS",
        }),
        format.ms(),
        format.printf((level) => {
          let message;
          if (level.level.toUpperCase() == "INFO") {
            message = `[${level.timestamp}] | ${chalk.blue(
              level.level
            )} | ${chalk.magenta(level.ms)} | ${level.message}`;
          } else if (level.level.toUpperCase() == "ERROR") {
            message = `[${level.timestamp}] | ${chalk.red(level.level)} | ${
              level.message
            }`;
          } else {
            message = `[${level.timestamp}] | ${level.level} | ${level.message}`;
          }
          return message;
        })
      ),
    }),
  ],
});
