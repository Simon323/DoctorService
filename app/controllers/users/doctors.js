var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose');

module.exports = function (app) {
  app.use('/register/doctor', router);
};

/*
 * DOCTOR
 */

router.get('/', function (req, res, next) {
  res.render('users/doctors/register_doctor' , {
    title: "Doctor  Registration"
  })
});


