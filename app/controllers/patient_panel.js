/**
 * Created by peter_kruhy on 04.05.2016.
 */

var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  History = require('../models/history');

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

router.get('/history', function (req, res, next) {
  var patient_id = mongoose.Types.ObjectId(req.user._id);

  History.find({'patient' : patient_id})
    .populate('doctor')
    .exec(function(err,history) {
      if(err){throw err}
      else {
        res.json(history)
      }
    });
});
