var mongoose = require('mongoose'),
    Schema = mongoose.Schema

var HistorySchema = new Schema({
  patient: {type: Schema.ObjectId, ref: "User"},
  doctor: {type: Schema.ObjectId, ref:"User"},

  date: {type: Date, default: Date.now()},
  diagnosis: String,
  file: String,
  fileGuid: String

});
var History = mongoose.model('History', HistorySchema);

module.exports = History;
