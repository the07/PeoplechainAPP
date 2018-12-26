var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var favicon = require('serve-favicon');

const uuid = require('uuid/v4');
const session = require('express-session');
const FileStore = require('session-file-store')(session);

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var flash = require('connect-flash');

var secret = require('./config/secret');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var organizationsRouter = require('./routes/organizations');

var app = express();

//Mongoose db setup

var mongoUrl = require('./config/mongo');

var mongoose = require('mongoose');
var mongoDB = mongoUrl.mongoURI;
console.info('MongoDB URL: '  + mongoDB);
mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error: '));

// Require the passport config
require('./utils/passport/index')(passport);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  genid: (req) => {
    console.log("Inside the middleware");
    console.log(req.sessionID);
    return uuid();
  },
  store: new FileStore(),
  secret: secret.secret,
  resave: false,
  saveUninitialized: true
}))

app.use(passport.initialize());
app.use(flash());
app.use(passport.session());



app.use('/', indexRouter);
app.use('/user', usersRouter);
app.use('/organizations', organizationsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
