//app/models/compnay.js

var mongoose = require('mongoose');

//Company Schema
var companySchema = mongoose.Schema({
  company_number: { Name: 'Number', type: Number},
  company_name:   { Name: 'Name',   type: String},
  company_email:  { Name: 'Email',   type: String},
  company_phone:  { Name: 'Phone',   type: String},
  created_date:   { type: Date, default: Date.now },
  updated_date:   Date
});

//Add module to app
module.exports = mongoose.model('Companies', companySchema);