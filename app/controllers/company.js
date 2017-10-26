var mongoose = require('mongoose');
var Company = mongoose.model('Companies');
//var validator = require('validator');
var logger = require('../../config/ConfigLog.js')(logger, env);
var env = process.env.NODE_ENV || 'development';

exports.index = function(req, res){
  logger.info("Entering Compnay Index function");
  var arrCompanies = [];
  Company.find({}, function(err, companies){
    companies.forEach(function(company){
      arrCompanies.push(company);
    });
    logger.info(arrCompanies.length + " companies found");
    res.render('Company/index', {
      map       : arrCompanies,
      session   : req.session
    });
  });
}

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
      res.render('Company/new', {
        company   : newCompany,
        session   : req.session
      });
    }
  });
}