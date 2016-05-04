var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose');

module.exports = function (app) {
  app.use('/doctor_panel', router);
};

router.get('/', function (req, res, next) {
  if(req.user == undefined || req.user.role != "doctor") {res.redirect('/')}

  res.render('users/doctor_panel',{
    title: "Doctor panel",
    doctor: req.user
  })
});
