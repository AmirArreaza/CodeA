var mongoose = require('mongoose');
var Company = mongoose.model('Companies');
//var validator = require('validator');
var logger = require('../../config/ConfigLog.js')(logger, env);
var env = process.env.NODE_ENV || 'development';

exports.create = function(req, res){

  if (req.session.company) {
    
    res.redirect('/home');
    
  }else{
    res.render('Company/create', {
      error     : req.flash("error"),
      success   : req.flash("success"),
      session   : req.session      
    });
  }
  
}

exports.add = function(req, res){
  //res.send(req.body);
  logger.info(req.body);
  var newCompany = new Company(req.body);
  
  logger.info(JSON.stringify(req.body));
  
  newCompany.save(function (err) {
    if (err) { 
      logger.error(err.message);
      res.render('Company/create', {
        error     : err.message,
        success   : req.flash("success"),
        session   : req.session      
      });
    }else{
      res.send(JSON.stringify(newCompany + req.body));
    }
  });
}