// dependencies
var express = require('express');
var path = require('path');
// var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
// var routes = require('./routes/index')(passport);
var LocalStrategy = require('passport-local').Strategy;

var routes = require('./routes/index');
var users = require('./routes/users');


var UserModel = require(path.resolve(__dirname, "./models/user.js"));


var app = express();


var user ={
  username: "admin",
  password: "pass",
  id: 1
}

// view engine setup
app.set('views', path.join(__dirname, 'views/pages'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: 'secret',
  // key: 'keys',
  // cookie: {
  //   path: '/',
  //   httpOnly: true,
  //   maxAge: null
  // },
  saveUninitialized: false,
  resave: false,
  // store: new MongoStore({mongooseConnection: mongoose.connection})
}));
app.use(passport.initialize());
app.use(flash());
app.use(passport.session());
app.use("/assets", express.static(path.join(__dirname, 'public')));

// passport.use('local', new LocalStrategy(
//     {usernameField: 'username',
//       passwordField: 'password',
//       passReqToCallback : true},
//     function(username, password, done) {
//       console.log('local!!');
//       UserModel.findOne({ username : username},function(err,user){
//         console.log(username);
//         return err
//             ? done(err)
//             : user
//             ? password === user.password
//             ? done(null, user)
//             : done(null, false, { message: 'Incorrect password.' })
//             : done(null, false, { message: 'Incorrect username.' });
//       });
//     }
// ));

passport.serializeUser(function(user, done) {
  console.log('serializeUser');
  done(null, user.id);
});


passport.deserializeUser(function(id, done) {
  console.log('deserializeUser');
  UserModel.findById(id, function(err, user) {
    done(err, user);
  });
});

passport.use('local', new LocalStrategy((username, password, done) => {
      if (username === user.username && password === user.password) {
  return done(null, user);
} else {
  return done(null, false);
}
}));

app.use('/', routes);//CHANGED
// app.use('/users', users);

// passport config
// passport config
var userModel = require('./models/user');
// passport.use(new LocalStrategy(userModel.authenticate()));
// passport.serializeUser(userModel.serializeUser());
// passport.deserializeUser(userModel.deserializeUser());

//db
mongoose.connect('mongodb://127.0.0.1/portfolio');
mongoose.connection.on('error', console.error.bind(console, 'connection error:'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

//favicon
// app.use(favicon(__dirname + '/public/img/favicon.ico'));



// error handler
app.set('env', 'development');
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  console.log(err.message);
  // app.get('env') = 'development';
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



module.exports = app;