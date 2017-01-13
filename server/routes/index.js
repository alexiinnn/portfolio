const express = require('express');
const passport = require('passport');
var nodemailer = require('nodemailer');
const router = express.Router();

const SkillModel = require("../models/skill");
const UserModel = require("../models/user");


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


// router.post('/login',
//     passport.authenticate('local'),
//     function(req, res) {
//         // If this function gets called, authentication was successful.
//         // `req.user` contains the authenticated user.
//         res.redirect('/admin.html');
//     });
//
// router.get('/admin.html', isLoggedIn, function (req, res) {
router.get('/admin.html', isLoggedIn, function (req, res) {
    SkillModel.find({}).sort({order: 1}).exec(function (err, items) {
        res.render('admin', {circles: items});
    });
});

// router.post('/login', passport.authenticate('local', { failureRedirect: '/', failureFlash: true }), (req, res, next) => {
//     console.log(req.body);
//     req.session.save((err) => {
//         if (err) {
//             console.log("posr err");
//             return next(err);
//         }
//         console.log("post suc");
//         res.redirect('/admin.html');
//     });
// });
//
// router.post('/login', passport.authenticate('local', {
//     failureRedirect: '/blog.html',
//     failureFlash: true
// }), (req, res, next) => {
//     // req.session.save((err) => {
//     //     if (err) {
//     //         console.log('post err');
//     //         return next(err);
//     //     }
//     //     res.redirect('/blog.html');
//     // });
//
// });

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
    var mailOptions = {
        from: '"Fred Foo ?" <foo@blurdybloop.com>', // sender address
        to: 'bar@blurdybloop.com, baz@blurdybloop.com', // list of receivers
        subject: 'Hello ✔', // Subject line
        text: 'Hello world ?', // plaintext body
        html: '<b>Hello world ?</b>' // html body
    };

    console.log(mailOptions);
});

// router.post('/login', function (req, res, next) {
//     passport.authenticate('local', function (err, user, info) {
//         if (err) {
//             return next(err);
//         }
//         // Redirect if it fails
//         if (!user) {
//             return res.redirect('/about.html');
//         }
//         req.logIn(user, function (err) {
//             if (err) {
//                 return next(err);
//             }
//             // Redirect if it succeeds
//             return res.redirect('/users/' + user.username);
//         });
//     })(req, res, next);
// });

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

    // var countUpdated = 0;
//     items.forEach(function (item) {
//         SkillModel.findOneAndUpdate({skill: item.name}, {
//             value: item.value
//         }, function (err) {
//             if (err) return res.send(500, {error: err});
//             countUpdated++
//             console.log(countUpdated);
//             if (countUpdated === willUpdated) {
//                 return res.send(countUpdated + " skill(s) updated");
//             }
//             ;
//         })
//     });


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