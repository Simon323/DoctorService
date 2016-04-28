
var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  bcrypt = require('bcryptjs');

var PatientSchema = new Schema({
  first_name: String,
  last_name: String,
  city: String,
  pesel: String,

  username: {type: String, index: true},
  password: String
});
var Patient = mongoose.model('Patient', PatientSchema);

module.exports = Patient;
module.exports.validPassword = function(candidate,hash){
  return bcrypt.compareSync(candidate, hash);
};
module.exports.createPatient    = function(newUser, callback){

  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(newUser.password, salt, function(err, hash) {
      newUser.password = hash;
      newUser.save(callback)
    });
  });
};

