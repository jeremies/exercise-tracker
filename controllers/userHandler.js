var User = require('../models/user.js');

exports.createUser = function(username, done) {
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