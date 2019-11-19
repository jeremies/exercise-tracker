var User = require('../models/user.js');

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

exports.newUser = function (req, res, next) {
  var username = req.body.username;
  createUser(username, function(err, data) {
    if (err) {
      return next(err);
    }
    
    var res_username = {
      username: data.username,
      _id: data._id
    }
    res.json(res_username);
  });
};


var getUsers = function (done) {
  User.find({}, 'username _id', function(err, data) {
    if (err) {
      done(err);
    }
    else {
      done(null, data);
    }
  })
};

exports.getUsers = function (req, res, next) {
  getUsers(function(err, data) {
    if (err) {
      return next(err);
    }
    res.json(data);
  })
});