var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var userSchema = new Schema({
  username: {
    type: String, 
    required: true,
    maxlength: [20, 'username too long']
  },
  log: [{ 
    description: String, 
    duration: Number, 
    date: { type: Date, default: Date.now } 
  }]
});

console.log(userSchema.indexes());

module.exports = mongoose.model('User', userSchema);