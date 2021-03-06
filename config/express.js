var express = require('express');
var glob    = require('glob');

var favicon = require('serve-favicon');
var logger  = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var compress     = require('compression');
var methodOverride   = require('method-override');
var expressValidator = require("express-validator");
var session  = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var flash = require('flash');
var path = require('path');

module.exports = function(app, config) {
  var env = process.env.NODE_ENV || 'development';
  app.locals.ENV = env;
  app.locals.ENV_DEVELOPMENT = env == 'development';

  app.set('views', config.root + '/app/views');
  app.set('view engine', 'ejs');

  // app.use(favicon(config.root + '/public/img/favicon.ico'));
  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(expressValidator({
    errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
        , root    = namespace.shift()
        , formParam = root;

      while(namespace.length) {
        formParam += '[' + namespace.shift() + ']';
      }
      return {
        param : formParam,
        msg   : msg,
        value : value
      };
    }
  }));
  app.use(cookieParser());
  app.use(compress());
  app.use(express.static(config.root + '/public'));
  app.use(methodOverride());
  app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
  }));
  app.use(flash());
  app.use(passport.initialize());
  app.use(passport.session());

  /*
  * Controllers folder
  */
  var controllers = glob.sync(config.root + '/app/controllers/*.js');
  controllers.forEach(function (controller) {
    require(controller)(app);
  });

  /*
  * Controllers/users folder
  */

  var users_controllers = glob.sync(config.root + '/app/controllers/users/*.js');
  users_controllers.forEach(function (users_controller) {
    require(users_controller)(app);
  });

  /*
  * Global vars
  */

  app.use(function(req,res,next){
    res.locals.user = req.user || null;
    res.locals.test = "test";
    next();
  });

  app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  if(app.get('env') === 'development'){
    app.use(function (err, req, res, next) {
      res.status(err.status || 500);
      res.render('error', {
        message: err.message,
        error: err,
        title: 'error'
      });
    });
  }

  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
      res.render('error', {
        message: err.message,
        error: {},
        title: 'error'
      });
  });

};
