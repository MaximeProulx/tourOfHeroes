var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
//user:"admin", pwd:"admin123"
var db = mongojs('mongodb://localhost:27017/heroes', ['heroes']);

//Heroes
/* GET All Heroes */
router.get('/getHeroes', function(req, res) {
  db.heroes.find(function(err, heroes) {
    if (err) {
      res.send(err);
    } else {
      res.json(heroes);
    }
  });
});
/* GET One Hero with the provided ID */
router.get('/getHero/:id', function(req, res, next) {
  db.heroes.findOne({
    _id: mongojs.ObjectId(req.params.id)
  }, function(err, heroes) {
    if (err) {
      res.send(err);
    } else {
      res.json(heroes);
    }
  });
});
/* POST/SAVE a Hero */
router.post('/addHero', function(req, res) {
  var hero = req.body;
  if (!hero.alias ) {
    res.status(400);
    res.json({
      "error": "Invalid Data"
    });
  } else {
    db.heroes.save(hero, function(err, result) {
      if (err) {
        res.send(err);
      } else {
        res.json(result);
      }
    })
  }
});
/* PUT/UPDATE a Hero */
router.put('/updateHero/:id', function(req, res) {
  var hero = req.body;
  var updObj = {};
  if (hero.firstName) {
    updObj.firstName = hero.firstName;
  }
  if (hero.lastName) {
    updObj.lastName = hero.lastName;
  }
  if (hero.alias) {
    updObj.alias = hero.alias;
  }
  if (hero.phone) {
    updObj.phone = hero.phone;
  }
  if (hero.address) {
    updObj.address = hero.address;
  }
  if (hero.city) {
    updObj.city = hero.city;
  }
  if (hero.postalCode) {
    updObj.postalCode = hero.postalCode;
  }
  if (!updObj) {
    res.status(400);
    res.json({
      "error": "Invalid Data"
    });
  } else {
    db.heroes.update({
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
/* DELETE a Hero */
router.delete('/deleteHero/:id', function(req, res) {
  db.heroes.remove({
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
