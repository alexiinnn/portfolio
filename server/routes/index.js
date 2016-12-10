var express = require('express');
var router = express.Router();

/* GET home page. */
router.get(['/','/index.html'], function(req, res, next) {
  res.render('index', { title: 'Home' });
});

//pages
router.get('/about.html', function (req, res) {
  res.render('about');
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
