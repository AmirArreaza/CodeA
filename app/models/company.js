//app/models/compnay.js

var mongoose = require('mongoose');

//Company Schema
var companySchema = mongoose.Schema({
  company_number: { Name: 'Company Number', type: Number},
  company_name:           String,
  company_email:          String,
  company_phone:          String,
  created_date:   { type: Date, default: Date.now },
  updated_date:   Date
});

//Add module to app
module.exports = mongoose.model('Companies', companySchema);