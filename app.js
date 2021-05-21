const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const logger = require('morgan');
const monk = require('monk');

const db = monk('localhost:27017/ros');
const expressSession = require('express-session')({
  secret: 'h7zagyb72yi1b51k2jegVWG2',
  resave: false,
  saveUnitialized: false,
});
const User = require('./models/user');

const indexRouter = require('./routes/index');
const api = require('./routes/api/index');
const usersRouter = require('./routes/api/users');
const musicRouter = require('./routes/music');

const app = express();

// Connect Mongoose
mongoose.connect('mongodb://localhost/ros');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(expressSession);
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  req.db = db;
  next();
});

app.use('/', indexRouter);
app.use('/api', api);
app.use('/music', musicRouter);
app.use('/api/users', usersRouter);

// Configure passport
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => { // eslint-disable-line
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
