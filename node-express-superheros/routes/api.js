var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Superhero = mongoose.model('superheros');

// get ALL superheros
router.get('/superheros', function(req, res) {
  Superhero.find(function(err, superheros){
    // console.log(superheros);
    res.json(superheros);
  });
});

// post ALL superheros
router.post('/superheros', function(req, res) {
  // new Superhero({name: req.body.superheroName})
  new Superhero(req.body)
  .save(function(err, superhero) {
    // console.log(superhero);
    res.json({message: 'Success!'});
  });
});

// get SINGLE superhero
router.get('/superhero/:id', function(req, res) {
  var query = {"_id": req.params.id};
  Superhero.findOne(query, function(err, superhero){
    // console.log(superhero);
    res.json(superhero);
  });
});

// update SINGLE superhero
router.put('/superhero/:id', function(req, res) {
  var query = {"_id": req.params.id};
  var update = req.body;
  var options = {new: true};
  Superhero.findOneAndUpdate(query, update, options, function(err, superhero){
    // console.log(superhero);
    res.json(superhero);
  });
});

// delete SINGLE superhero
router.delete('/superhero/:id', function(req, res) {
  var query = {"_id": req.params.id};
  Superhero.findOneAndRemove(query, function(err, superhero){
    // console.log(superhero);
    res.json(superhero);
  });
});

module.exports = router;
