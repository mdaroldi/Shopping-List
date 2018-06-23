var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var List = require('../models/List.js');

/* GET ALL LISTS */
router.get('/', function(req, res, next) {
  List.find(function (err, products) {
    if (err) return next(err);
    res.json(products);
  });
});

/* GET SINGLE LIST BY ID */
router.get('/:id', function(req, res, next) {
  List.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* ADD LIST */
router.post('/', function(req, res, next) {
  List.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* UPDATE LIST */
router.put('/:id', function(req, res, next) {
  List.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE LIST */
router.delete('/:id', function(req, res, next) {
  List.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;