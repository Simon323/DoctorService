var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Patient = require('../models/patient');

module.exports = function (app) {
  app.use('/', router);
};

router.get('/', function (req, res, next) {

  var patient = new Patient({
    first_name: "Piotr",
    last_name: "Krusicki",
    city: "Poznań",
    pesel: "90030205898",
    username: "kruhy",
    password: "something"
  });

  patient.save(function(err,patient){
    console.log('done');
  })


  res.render('index', {
    title: "index"
  })
});
