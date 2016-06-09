var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  User = require('../models/user');

module.exports = function (app) {
  app.use('/patient', router);
};
/*
 * GET all patients
 */
router.get('/', function (req, res, next) {
  //returns all the patients
  User.find({'role': 'patient'}, function (err, users) {
    res.send(users);
  })
});

/*
 * GET doctors of patient with id..
 */
router.get('/doctors', function (req, res, next) {
  // var patient_id = mongoose.Types.ObjectId(req.params["patient_id"]);
  var patient_id = mongoose.Types.ObjectId(req.user.id);

  var patientDoctors = [];
  var restDoctors = [];

  User.findOne({'_id': patient_id})
    .populate('doctors')
    .exec(function (err, patient) {
      if (err) {res.sendStatus(400)}
      else {
        patientDoctors = patient.doctors;
        User.find({'role': 'doctor'})
          // .populate('patients')
          .exec(function (err, doctors) {
            if (err) {res.sendStatus(400)}
            else {
              doctors.forEach(function (d) {
                if (d.patients.indexOf(patient_id) == -1) {
                  restDoctors.push(d)
                }})
            }
            res.send(200, {"patientDoctors" : patientDoctors , "restDoctors" : restDoctors})
          })}
    })
});

/*
 * ADD a new doctor do patient with id ..
 */
router.post('/doctors', function (req, res, next) {
  // var patient_id = mongoose.Types.ObjectId(req.params["patient_id"]);
  var patient_id = mongoose.Types.ObjectId(req.user.id);
  var doctor_id  = mongoose.Types.ObjectId(req.body.doctor_id);

  User.findOne({'_id': patient_id}, function (err, patient) {
    if (err) {
      res.sendStatus(200)
    }
    else {
      User.findOne({'_id': doctor_id}, function (err, doctor) {
        if (err) {
          res.senStatus(400)
        }
        else {
          patient.doctors.push(doctor);
          doctor.patients.push(patient);
          patient.save(function (err, p) {
          });
          doctor.save(function (err, d) {
          });
          res.sendStatus(200);
        }
      })
    }
  });
});

/*
 * DELETE a doctor from array that belongs to patient with id..
 */
router.delete('/doctors', function (req, res, next) {
  var patient_id = mongoose.Types.ObjectId(req.user.id);
  var doctor_id = mongoose.Types.ObjectId(req.body.doctor_id);

  User.update(
    {'_id' : patient_id},
    {$pull : {doctors : doctor_id}},
    {safe : true},
    function(err, patient){
      if(err){throw err}
      else {
        User.update(
          {'_id' : doctor_id},
          {$pull : {patients : patient_id}},
          {safe : true},
          function(err,doctor){
            if(err){throw err}
            else {res.sendStatus(200)}
          })
      }
    }
  )
  });

/**
 * Created by peter_kruhy on 04.05.2016.
 */
