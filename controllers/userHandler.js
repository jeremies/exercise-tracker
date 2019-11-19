var User = require('../models/user.js');

exports.createUser = function (req, res, next) {
  var username = req.body.username;
  var user = new User({ username: username });
  user.save(function (err,data) {
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


exports.getUsers = function (req, res, next) {
  User.find({}, 'username _id', function(err, data) {
    if (err) {
      return next(err);
    }
    else {
      res.json(data);
    }
  });
};

exports.addExercise = function (req, res, next) {
  
}