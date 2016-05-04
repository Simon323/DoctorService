var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  User = require('../models/user')

module.exports = function (app) {
  app.use('/patients', router);
};
/*
* GET all patients
*/
router.get('/', function (req, res, next) {
  //returns all the patients
  User.find({'role':'patient'},function(err,users){
    res.send(users);
  })
});

/*
* GET doctors of patient with id..
*/
router.get('/:patient_id/doctors', function (req, res, next) {
  //todo pobieranie doctors danego pacjenta -get
});

/*
 * ADD a new doctor do patient with id ..
 */
router.post('/:patient_id/doctors', function (req, res, next) {
  //todo dodawanie doctors danego pacjenta - post
});

/*
 * DELETE a doctor from array that belongs to patient with id..
 */
router.delete('/:patient_id/doctors', function (req, res, next) {
  //todo usuwanie docotrs danego pacjenta -delete
});




/**
 * Created by peter_kruhy on 04.05.2016.
 */
