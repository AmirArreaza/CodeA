var env = process.env.NODE_ENV || 'development';
var colors = require('colors/safe');

var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000;
  
/***************Winston Loggin configuratrion********************/
var logger = require('./config/ConfigLog.js')(logger, env);
/****************************************************************/
  
  /************Body-Parser**********************************/
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
/************Body-Parser**********************************/

/***************Mongodb configuratrion********************/
var mongoose = require('mongoose');
var configDB = require('./config/ConfigDB.js');

mongoose.Promise = global.Promise;

mongoose.connect(configDB.url, { useMongoClient: true }); // connect to our database
/***************Mongodb configuratrion********************/
  
/*********************Routes*****************************/  
require('./config/ConfigRoutes.js')(app)
/*********************Routes*****************************/  
  

logger.debug('Debugging info');
logger.verbose('Verbose info');
logger.info('Hello world');
logger.warn('Warning message');
logger.error('Error info');
logger.info(env);
logger.debug('todo list RESTful API server started on: ' + port);

app.listen(port);