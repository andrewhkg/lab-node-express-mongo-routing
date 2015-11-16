var mongoose = require('mongoose');
var CarSchema = new mongoose.Schema({
  namepart:      String,
  carmodel:      String,
  color:         String,
  manufactured:  { type: Date, default: Date.now },
  imageUrl:      String
});

var Car = mongoose.model('Car', CarSchema);
module.exports = Car;