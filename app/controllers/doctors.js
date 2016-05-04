var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  User = require('../models/user')

module.exports = function (app) {
  app.use('/doctors', router);
};

router.get('/', function (req, res, next) {
  //returns all the doctors
  User.find({'role':'doctor'},function(err,users){
    res.send(users);
  })

});
