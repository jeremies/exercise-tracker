var User = require('../models/user.js');

exports.createUser = function (req, res, next) {
  var username = req.body.username;
  var user = new User({ username: username });
  user.save(function (err,data) {
    if (err) {
      return next(err);
    }
    
    res.json({
      _id: data._id,
      username: data.username
    });
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
    if (!user.exercises) {
      user.exercises = [];
    }
    var exercise = {
      description: description,
      duration: duration
    };
    
    if (date != "") {
      exercise.date = new Date(date);
    }
    user.exercises.push(exercise);
    
    user.save(function (err,data) {
      if (err) {
        return next(err);
      }
      
      let last_exercise = data.exercises[data.exercises.length - 1];
      res.json({
        username: data.username,
        description: last_exercise.description,
        duration: last_exercise.duration,
        _id: data._id,
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
    res.json({
      username: data.username,
      description: last_exercise.description,
      duration: last_exercise.duration,
      _id: data._id,
      date: last_exercise.date
    });
}