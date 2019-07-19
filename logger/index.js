let winston = require("winston");


const transports = [
  new winston.transports.Console({
    level: process.env.NODE_ENV === "production" ? "error" : "debug",
    handleExceptions: true,
    json: false,
    colorize: true
  })
]

if (process.env.NODE_ENV === "production") {
  transports.push(new winston.transports.File({
    filename: "logs/debug.log",
    level: "info",
    handleExceptions: true,
    maxsize: 5242880, // 5MB
    json: true,
    colorize: false
  }))
}

winston.add(winston.createLogger({
  colorize: true,
  format: winston.format.simple(),
  transports,
  exitOnError: false
}));

if (process.env.NODE_ENV !== "production") {
  winston.debug("Logging initialized at debug level");
}

winston.stream = {
  write: function (message, encoding) {
    winston.info(message);
  },
};

module.exports = winston;
