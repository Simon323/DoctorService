/**
 * Created by peter_kruhy on 04.05.2016.
 */

var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose');

module.exports = function (app) {
  app.use('/patient_panel', router);
};

router.get('/', function (req, res, next) {
  if(typeof req.user == 'undefined' || req.user.role != "patient") {res.redirect('/')}

  res.render('users/patient_panel', {
    title: "Patient panel",
    patient: req.user
  })
});
