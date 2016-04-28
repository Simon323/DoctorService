var express  = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    Patient  = require('../../models/patient');

passport.use(new LocalStrategy(
  function(username, password, done) {
    Patient.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!Patient.validPassword(password,user.password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));
passport.serializeUser(function(user, done) {
  done(null, user.id);
});
passport.deserializeUser(function(id, done) {
  Patient.findById(id, function(err, user) {
    done(err, user);
  });
});
module.exports = function (app) {
  app.use('/register/patient', router);
};

/*
* ROUTES
*/
router.get('/', function (req, res, next) {
  res.render('users/patients/register_patient' , {
    title: "Patient Registration"
  })
});

router.post('/', function (req, res, next) {
  var first_name = req.body.first_name;
  var last_name = req.body.last_name;
  var city = req.body.city;
  var pesel = req.body.pesel;

  var username = req.body.username;
  var password = req.body.password;
  var password2 = req.body.password2;

  req.check('username','Username should not be empty').notEmpty();
  req.check('password','Password should not be empty').notEmpty();
  req.check('password2','Confirmation should not be empty').notEmpty();
  req.check('password','Passwords should match').equals(password2);

  var errors = req.validationErrors();
  if(errors){
    res.render('users/patients/register_patient', {
      title: "Registration Page",
      errors: errors,
      info: false,
      user: req.user
    })
  }
  else {
    var newPatient = new Patient({
      username: username,
      password: password,
      first_name: first_name,
      last_name: last_name,
      city: city,
      pesel: pesel
    });

    Patient.createPatient(newPatient, function(err,user) {
      console.log(user);
    });

    res.render('index', {
      title: "Panel",
      errors: false,
      info: ["Hello! Enjoy your first login !"],
      user: req.user
    })
  }
});




