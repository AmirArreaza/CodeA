var env = process.env.NODE_ENV || 'development';
var path = require('path');
var express = require('express');
var session = require('express-session');
var flash = require('connect-flash');    

app = express();
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

/*********************Session*****************************/
app.use(session({
  secret: 'Code A',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}));
app.use(flash());
/*********************Session*****************************/

/*********************View Engine*************************/  
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'ejs');
/*********************View Engine************************/

/*********************Routes*****************************/  
require('./app/models/company');  
require('./config/ConfigRoutes.js')(app)
/*********************Routes*****************************/  

  
//logger.debug('Debugging info');
//logger.verbose('Verbose info');
//logger.info('Hello world');
//logger.warn('Warning message');
//logger.error('Error info');
//logger.info(env);

app._router.stack.forEach(function(r){
  if (r.route && r.route.path){
    logger.info('Route: ' + r.route.path);
  }
})
logger.info('Proyect Code A RESTful API server started on: ' + port);

app.listen(port);
exports = module.exports = app;