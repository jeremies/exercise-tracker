var User = require('../models/user.js');

exports.createUser = function (req, res, next) {
  var username = req.body.username;
  var user = new User({ username: username });
  user.save(function (err,data) {
    if (err) {
      return next(err);
    }
    
    res.json(data);
  });
};


exports.getUsers = function (req, res, next) {
  User.find({}, 'username _id', function(err, data) {
    if (err) {
      return next(err);
    }
    res.json(data);
  });
};

exports.addExercise = function (req, res, next) {
  var userId = req.body.userId;
  var description = req.body.description;
  var duration = req.body.duration;
  var date = req.body.date;
  User.findById(userId, function (err, user) {
    if (err) {
      return next(err);
    }
    if (!user.log) {
      user.log = [];
    }
    var exercise = {
      description: description,
      duration: duration
    };
    
    if (date != "") {
      exercise.date = new Date(date);
    }
    user.log.push(exercise);
    
    user.save(function (err,user) {
      if (err) {
        return next(err);
      }
      
      let last_exercise = user.log[user.log.length - 1];
      res.json({
        username: user.username,
        description: last_exercise.description,
        duration: last_exercise.duration,
        _id: user._id,
        date: last_exercise.date
      });
    });
  });
}

exports.getExerciseLog = function (req, res, next) {
  var userId = req.query.userId;
  User.findById(userId, function (err, user) {
    if (err) {
      return next(err);
    }
    user.count = user.log.length;
    res.json(user);
  });
}