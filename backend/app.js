var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// MongoDB
var mongoClient = require('mongodb').MongoClient
global.database = null

var index = require('./routes/index');
var user = require('./routes/user');
var video = require('./routes/video');
var develop = require('./routes/develop');
var movies = require('./routes/movies');

var app = express();
var config = require('./config/config');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/v', video);
app.use('/d', develop);
app.use('/user', users);
app.use('/api/movies', movies);
app.use(require('connect-history-api-fallback')())

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

function connectDB() {
  mongoClient.connect(config.db_url, { useNewUrlParser:true }, function(err, database) {
      if (err) throw err;
      console.log('Database Connected : ' + config.db_url);
      global.database = database.db('matdongsang');
  })
};

app.listen(process.env.PORT || config.server_port, function() {
  console.log("Connected 8080 port");
  connectDB();
});

module.exports = app;
