var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var userSchema = new Schema({
  username: String
});

var User = mongoose.model('User', userSchema);

var createUser = function(username, done) {
  var user = new User({ username: username });
  user.save(function (err,data) {
    if (err) {
      done(err);
    }
    else {
      done(null, data);
    }
  })
};