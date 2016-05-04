var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  User = require('../models/user');

module.exports = function (app) {
  app.use('/', router);
};

router.get('/', function (req, res, next) {
  if(typeof req.user == 'undefined') {
    res.redirect('/login')
  }
  else {
    var user = req.user;
    if(user.role=="patient") {
      res.redirect('/patient_panel')
    }
    if(user.role == "doctor") {
      res.redirect('/doctor_panel')
    }
  }
});
