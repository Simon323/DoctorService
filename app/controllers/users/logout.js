var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose');

module.exports = function (app) {
  app.use('/logout', router);
};

router.get('/', function (req, res, next) {
  req.logout();
  res.redirect('/');
});
