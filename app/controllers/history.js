var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  History = require('../models/history'),
  User = require('../models/user'),
  multer = require('multer'),
  upload = multer({dest: './uploads/'});

module.exports = function (app) {
  app.use('/', router);
};

router.get('/patients/:patient_id/history', function (req, res, next) {
  var patient_id = mongoose.Types.ObjectId(req.params.patient_id);
  // User.findOne({'_id' : patient_id})
  //   .populate('history')
  //   .exec(function(err,user){
  //     if(err){throw err}
  //     else {
  //       res.send(user.history)
  //     }
  //   });

  History.find({'patient' : patient_id})
    .populate('doctor')
    .exec(function(err,history) {
      if(err){throw err}
      else {
        res.send(history)
      }
    })
});

router.post('/patients/:patient_id/history', multer({ dest: __dirname+'\\..\\..\\public\\files\\'}).single('file'),function (req, res, next) {
  var patient_id = mongoose.Types.ObjectId(req.params.patient_id);
 console.log(__dirname);
  //todo tutaj zaczac
  
  //todo dodac do obiektu historia informacje o miejscu zapisania pliku
  //todo dodac etykiete opisujaca plik
  //todo obsluga rozszerzen
  //todo kontrola wielkosci
  //todo zmiana formatu wyswietlania daty w doctor_panel
  /*History object*/
  var doctor_id = mongoose.Types.ObjectId(req.user.id);
  var date = req.body["date"];
  var diagnosis = req.body["diagnosis"];
  var file = req.body["file"];

  User.findOne({'_id' : patient_id})
    .populate('history')
    .exec(function(err,user){
      if(err){throw err}
      else {
        var history =new History({
          patient: patient_id,
          doctor : doctor_id,
          date : date,
          diagnosis : diagnosis,
          file : file
        });

        history.save(function(err,hist){
          if(err){throw err}
          else{
            user.history.push(hist);
            user.save(function(err,user){
              if(err){throw err}
              else {res.sendStatus(200);}
            })
          }
        })
      }
    });


});

router.delete('/patients/:patient_id/history/:history_id', function (req, res, next) {
  //todo usuwanie historii po id pacjenta - moze jednak nie usuwac tylko edytowac ?
});
