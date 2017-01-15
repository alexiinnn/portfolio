const express = require('express');
const passport = require('passport');
var nodemailer = require('nodemailer');
const router = express.Router();

const SkillModel = require("../models/skill");
const UserModel = require("../models/user");

const configMail = require("../config/mail");

//mail
var transporter = nodemailer.createTransport(configMail.url);

/* GET home page. */
router.get(['/', '/index.html'], function (req, res, next) {
    res.render('index', {title: 'Home'});
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


router.get('/admin.html', isLoggedIn, function (req, res) {
    SkillModel.find({}).sort({order: 1}).exec(function (err, items) {
        res.render('admin', {circles: items});
    });
});

router.post('/login', function (req, res, next) {
    // return res.redirect(301, '/admin.html');
    console.log(req.body);
    passport.authenticate('local', (err, user) => {
        console.log("user: " + user);
    if (err) { return next(err); }
    if (!user) { return res.json({status: 'Invalid username or password'}) }
    req.logIn(user, function (err) {
        if (err) { return next(err); }
        return res.json({status: 'OK!', redirect: 'admin.html'});
    });
})(req, res, next);
});

router.post('/message', function (req, res, next) {
    // return res.redirect(301, '/admin.html');
    console.log(req.body);

    // setup e-mail data with unicode symbols
    var mailOptions = {
        from: configMail.sender, // sender address
        to: configMail.recipient, // list of receivers
        subject: configMail.topic, // Subject line
        // text: req.body.message, // plaintext body
        // html: configMail.html // html body
        html: configMail.html1+req.body.email+configMail.html2+req.body.message+configMail.html3 // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            console.log(error);
            return res.json('Error');
        }
        console.log('Message sent: ' + info.response);
        return res.json('Done');
    });
});

router.post('/saveSkills', function (req, res) {
    var items = req.body;
    var willUpdated = Object.keys(items).length;
    console.log("willUpdated "+willUpdated);
    var countUpdated = 0;

    for (var key in items) {
        if (items.hasOwnProperty(key)) {
            console.log(key + " -> " + items[key]);
        }
        SkillModel.findOneAndUpdate({skill: key}, {
            value: items[key]
        }, function (err) {
            if (err) return res.send(500, {error: err});
            countUpdated++
            console.log(countUpdated);
            if (countUpdated === willUpdated) {
                return res.send(countUpdated + " skill(s) updated");
            };
        })
    };
});


router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        console.log('isAuthenticated');
        return next();
    }
    console.log("auth fail");
    res.sendStatus(401);
}

module.exports = router;