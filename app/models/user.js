var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    bcrypt = require('bcryptjs');

var UserSchema = new Schema({
  role: String,

  //role specific fields
  pesel: String,
  speciality: String,
  doctors: [{type: Schema.ObjectId, ref: 'User'}],
  patients: [{type: Schema.ObjectId, ref: 'User'}],

  first_name: String,
  last_name: String,
  city: String,

  username: {type: String, index: true},
  password: String
});
var User = mongoose.model('User', UserSchema);

module.exports = User;
module.exports.validPassword = function(candidate,hash){
  return bcrypt.compareSync(candidate, hash);
};
module.exports.createUser = function(newUser, callback){
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(newUser.password, salt, function(err, hash) {
      newUser.password = hash;
      newUser.save(callback)
    });
  });
};

