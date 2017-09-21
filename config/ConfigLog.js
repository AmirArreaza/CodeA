var fs = require('fs');
var logDir = 'Logs';
var dateFormat = require('dateformat');
var now = new Date();

// Create the log directory if it does not exist
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}
var winston = require('winston');
var tsFormat = () => (new Date()).toLocaleString('en-US', { hour12: false });

module.exports = function (logger, env){
  
  logger = new (winston.Logger)({
  transports: [
    // colorize the output to the console
    new (winston.transports.Console)({
      timestamp: tsFormat,
      prettyPrint: true,
      colorize: true,
      level: 'debug',
      formatter: customFileFormatter
    }),
    new (require('winston-daily-rotate-file'))({
      filename: `${logDir}/.log`,
      timestamp: tsFormat,
      datePattern: dateFormat(new Date(), "yyyymmdd"),
      prepend: true,
      json : false,
      level: env === 'development' ? 'debug' : 'info',
      formatter: customFileFormatter
    })
  ]
});
return logger;
}

function customFileFormatter (options) {
  var dateFormatted = dateFormat(new Date(), "yyyymmdd HH:MM:ss L");
    // Return string will be passed to logger.
    return dateFormatted + ' ['+ options.level.toUpperCase() +'] '+ (undefined !== options.message ? options.message : '') +
     (options.meta && Object.keys(options.meta).length ? '\n\t'+ JSON.stringify(options.meta) : '' );
}