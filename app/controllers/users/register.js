var express  = require('express'),
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
  app.use('/register', router);
};

/*
* ROUTES
*/
router.get('/', function (req, res, next) {
  res.render('users/register' , {
    title: "Registration"
  })
});

router.post('/', function (req, res, next) {
  var role = req.body.role;

  //role specific fields
  var speciality = req.body.speciality;
  var pesel = req.body.pesel;

  var first_name = req.body.first_name;
  var last_name = req.body.last_name;
  var city = req.body.city;

  var username = req.body.username;
  var password = req.body.password;
  var password2 = req.body.password2;

  req.check('username','Username should not be empty').notEmpty();
  req.check('password','Password should not be empty').notEmpty();
  req.check('password2','Confirmation should not be empty').notEmpty();
  req.check('password','Passwords should match').equals(password2);

  var errors = req.validationErrors();
  if(errors){
    res.render('users/register', {
      title: "Registration Page",
      errors: errors,
      info: false,
      user: req.user
    })
  }
  else {
    var newUser = new User({
      role: role,
      speciality: speciality,
      pesel:pesel,
      username: username,
      password: password,
      first_name: first_name,
      last_name: last_name,
      city: city,
      pesel: pesel
    });

    User.createUser(newUser, function(err,user) {
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




