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

router.get('/patients', function (req, res, next) {
  //returns all the doctors
  var doctor_id = mongoose.Types.ObjectId(req.user.id);
  
  User.find({'role':'patient', doctors:{$in : [doctor_id] }},function(err,patients){
    
    if(err){throw err}
    else {
      res.send(patients);
    }
    
  })
  
  
});
