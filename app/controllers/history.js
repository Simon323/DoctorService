var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  History = require('../models/history'),
  User = require('../models/user'),
  multer = require('multer'),
  path = require('path'),
  mime = require('mime');

var app = express();

router.get('/download/:fileGuid', function(req, res){
  var fileGuid = req.params.fileGuid;
  var record = History.findOne({'fileGuid' : fileGuid}, function(err,docs){

    if(err){throw err}
    else {
      var file = __dirname + '\\..\\upload-folder\\' + docs.fileGuid;
      res.download(file, docs.file);
    }
  });
});

module.exports = function (app) {
  app.use('/', router);
};

router.get('/patients/:patient_id/history', function (req, res, next) {
  var patient_id = mongoose.Types.ObjectId(req.params.patient_id);

  History.find({'patient' : patient_id})
    .populate('doctor')
    .exec(function(err,history) {
      if(err){throw err}
      else {
        res.send(history)
      }
    })
});

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4();
}

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname + '/../upload-folder/')
  },
  filename: function (req, file, cb) {
    var fileNameSplit = file.originalname.split(".");
    var fileName = fileNameSplit[0] + guid() + fileNameSplit[1];
    cb(null, fileName);
  }
});

var upload = multer({ storage: storage });

router.post('/patients/:patient_id/history', upload.single('file') ,function (req, res, next) {
  var patient_id = mongoose.Types.ObjectId(req.params.patient_id);
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
  var file = req.file.originalname;
  var fileGuid = req.file.filename;

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
          file : file,
          fileGuid: fileGuid
        });

        history.save(function(err,hist){
          if(err){throw err}
          else{
            user.history.push(hist);
            user.save(function(err,user){
              if(err){throw err}
              else {
                /*res.sendStatus(200);*/

                res.render('users/doctor_panel',{
                  title: "Doctor panel",
                  doctor: req.user
                });
              }
            })
          }
        })
      }
    });


});

router.delete('/patients/:patient_id/history/:history_id', function (req, res, next) {
  var patientId = req.params.patient_id;
  var historyId = req.params.history_id;

  History.remove({'_id': historyId}, function (err) {
    if(err) throw err;

    res.send("200 OK");
  });
  //todo usuwanie historii po id pacjenta - moze jednak nie usuwac tylko edytowac ?
});
