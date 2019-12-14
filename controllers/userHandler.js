var User = require('../models/user.js');

exports.createUser = function (req, res, next) {
  var username = req.body.username;
  var user = new User({ username: username });
  user.save(function (err,savedUser) {
    if (err) {
      return next(err);
    }
    savedUser = savedUser.toObject();
    delete savedUser.log;
    delete savedUser.__v;
    res.json(savedUser);
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
    
    user.save(function (err,savedUser) {
      if (err) {
        return next(err);
      }
      
      let last_exercise = savedUser.log[savedUser.log.length - 1];
      res.json({
        username: savedUser.username,
        description: last_exercise.description,
        duration: last_exercise.duration,
        _id: savedUser._id,
        date: last_exercise.date
      });
    });
  });
}

exports.getExerciseLog = function (req, res, next) {
  let userId = req.query.userId;
  let from = new Date(req.query.from);
  if (from.toDateString() == "Invalid Date") from = undefined;
  let to = new Date(req.query.to);
  if (to.toDateString() == "Invalid Date") to = undefined;
  let limit = req.query.limit;
  User.findById(userId, function (err, user) {
    if (err) {
      return next(err);
    }
    user = user.toObject();
    user.log = user.log.filter( exercise => {
      return (!to || exercise.date < to) && (!from || exercise.date > from);
    });
    if (limit) {
      user.log = user.log.slice(0,limit);
    }
    user.count = user.log.length;
    delete user.__v;
    user.log.forEach(exercise => { delete exercise._id; });
    res.json(user);
  });
}