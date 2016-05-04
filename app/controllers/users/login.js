var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy,
  User  = require('../../models/user');


passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!User.validPassword(password,user.password)) {
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
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

module.exports = function (app) {
  app.use('/login', router);
};

router.get('/', function (req, res, next) {

  res.render('users/login',{
    title : "login",
    flash: res.locals.flash
  })
});

router.post('/',
  passport.authenticate('local', {session: true, successRedirect: '/',failureRedirect: '/login', successFlash: true, failureFlash:true}));

