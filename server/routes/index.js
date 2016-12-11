var express = require('express');
var router = express.Router();
var path = require('path');

var SkillModel = require( path.resolve( __dirname, "../models/skill.js" ) );

/* GET home page. */
router.get(['/','/index.html'], function(req, res, next) {
  res.render('index', { title: 'Home' });
});

//pages
router.get('/about.html', function (req, res) {
  SkillModel.find({}).sort({order: 1}).exec(function (err, items) {
    res.render('about', {items: items});
    // console.log(items.skill);
    // console.log(items.value);
  });
});
router.get('/works.html', function (req, res) {
  res.render('works');
});
router.get('/blog.html', function (req, res) {
  res.render('blog');
});
router.get('/admin.html', function (req, res) {
  res.render('admin');
});
module.exports = router;
