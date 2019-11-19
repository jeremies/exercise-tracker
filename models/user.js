var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var userSchema = new Schema({
  username: String,
  exercises: [{ description: String, }]
});

module.exports = mongoose.model('User', userSchema);