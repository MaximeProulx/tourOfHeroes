var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
//user:"admin", pwd:"admin123"
var db = mongojs('mongodb://localhost:27017/heroes', ['users']);

//Users
router.post('/login', function(req, res, next) {
  var user = req.body;
  db.users.findOne({
    email: user.email,
    password: user.password
  }, function(err, users) {
    if (err) {
      res.send(err);
    } else {
      users.token="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9";
      res.json(users);
    }
  });
});

/* GET User*/
router.post('/getUser', function(req, res, next) {
  var user = req.body;
  db.users.findOne({
    _id: mongojs.ObjectId(user._id),
  }, function(err, users) {
    if (err) {
      res.send(err);
    } else {
      res.json(users);
    }
  });
});

//update a user
router.put('/updateUser/:id', function(req, res) {
  var user = req.body;
  var updObj = {};
  if (user.firstName) {
    updObj.firstName = user.firstName;
  }
  if (user.lastName) {
    updObj.lastName = user.lastName;
  }
  if (user.email) {
    updObj.email = user.email;
  }
  if (user.password) {
    updObj.password = user.password;
  }

  if (!updObj) {
    res.status(400);
    res.json({
      "error": "Invalid Data"
    });
  } else {
    db.users.update({
      _id: mongojs.ObjectId(req.params.id)
    }, updObj, {}, function(err, result) {
      if (err) {
        res.send(err);
      } else {
        res.json(result);
      }
    });
  }
});

//update a user
router.post('/addUser', function(req, res) {
  var user = req.body;

  if (!user) {
    res.status(400);
    res.json({
      "error": "Invalid Data"
    });
  } else {
    db.users.save(user, function(err, result) {
      if (err) {
        res.send(err);
      } else {
        res.json(result);
      }
    })
  }
});
/* GET All Users */
router.get('/getUsers', function(req, res) {
  db.users.find(function(err, users) {
    if (err) {
      res.send(err);
    } else {
      res.json(users);
    }
  });
});


/* DELETE a User */
router.delete('/deleteUser/:id', function(req, res) {
  db.users.remove({
    _id: mongojs.ObjectId(req.params.id)
  }, '', function(err, result) {
    if (err) {
      res.send(err);
    } else {
      res.json(result);
    }
  });
});

module.exports = router;
