var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var userSchema = new Schema({
  username: String,
  exercises: [{ 
    description: String, 
    duration: Number, 
    date: { type: Date, default: Date.now } 
  }]
});

module.exports = mongoose.model('User', userSchema);