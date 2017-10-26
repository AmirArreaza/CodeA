var company = require('../app/controllers/company');

module.exports = function (app) {

  //Company Routes
  app.get('/Company/index', company.index);
  app.get('/Company/create', company.create);
  app.post('/Company/create', company.add);

}