
const winston = require('winston');
const { combine, timestamp, label, prettyPrint } = winston.format;

module.exports = winston.createLogger({
        format: combine(
            label({ label: 'right meow!' }),
            timestamp(),
            prettyPrint()
          ),
        transports: [
          new winston.transports.Console(),
          new winston.transports.File({ filename: `src/logger/data/${new Date().getDate()+ "-"+ new Date().getMonth()+ "-"+ new Date().getFullYear()}.log` })
        ]
      })