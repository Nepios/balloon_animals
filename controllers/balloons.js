var express = require('express');
var Balloon = require('../models/balloon');
var router = express.Router();

router.route('/')
  .get(function(req, res) {
    Balloon.find(function(err, Balloons) {
      if (err) return res.status(500).send(err);
      res.send(Balloons);
    });
  })
  .post(function(req, res) {
    Balloon.create(req.body, function(err, Balloon) {
      if (err) return res.status(500).send(err);
      res.send(Balloon);
    });
  });

router.get('/search', function(req, res) {
  var searchTerm = req.query.searchTerm;
  console.log(searchTerm)
  Balloon.find({
    name: { 
      $regex: new RegExp(searchTerm, 'i')
    } 
  }).exec(function(err, balloon){
    res.send(balloon);
  });
})

router.route('/:id')
  .get(function(req, res) {
    Balloon.findById(req.params.id, function(err, Balloon) {
      if (err) return res.status(500).send(err);
      res.send(Balloon);
    });
  })
  .put(function(req, res) {
    Balloon.findByIdAndUpdate(req.params.id, req.body, function(err) {
      if (err) return res.status(500).send(err);
      res.send({'message': 'success'});
    });
  })
  .delete(function(req, res) {
    Balloon.findByIdAndRemove(req.params.id, function(err) {
      if (err) return res.status(500).send(err);
      res.send({'message': 'success'});
    });
  });

module.exports = router;
