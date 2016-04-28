var express = require('express'),
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
  app.use('/login', router);
};

router.get('/', function (req, res, next) {

  res.render('users/login',{
    title : "login"
  })
});

router.post('/',
  passport.authenticate('local', {session: true, successRedirect: '/',failureRedirect: '/login', successFlash: true, failureFlash:true}));

