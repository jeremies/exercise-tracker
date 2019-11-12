const express = require('express')
const app = express()
const bodyParser = require('body-parser')
var mongoose = require('mongoose');

mongoose.connect(process.env.MLAB_URI || 'mongodb://localhost/exercise-track' )

const cors = require('cors')

app.use(cors())

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())


app.use(express.static('public'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

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

app.post("/api/exercise/new-user", function (req, res, next) {
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
});

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

app.get("/api/exercise/users", function (req, res, next) {
  getUsers(function(err, data) {
    if (err) {
      return next(err);
    }
    res.json(data);
  })
});

// Not found middleware
app.use((req, res, next) => {
  return next({status: 404, message: 'not found'})
})

// Error Handling middleware
app.use((err, req, res, next) => {
  let errCode, errMessage

  if (err.errors) {
    // mongoose validation error
    errCode = 400 // bad request
    const keys = Object.keys(err.errors)
    // report the first validation error
    errMessage = err.errors[keys[0]].message
  } else {
    // generic or custom error
    errCode = err.status || 500
    errMessage = err.message || 'Internal Server Error'
  }
  res.status(errCode).type('txt')
    .send(errMessage)
})

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
