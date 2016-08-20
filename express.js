var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var config = require('./config/dzi');

var routes = require('./routes/index');
var apiRoutes = require("./routes/api");
var adminRoutes = require("./routes/admin");

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));

function userIsAllowed(referer, callback) {
	callback(referer && referer.indexOf(config.hostname) != -1);
};

var protectPath = function(regex) {
	return function(req, res, next) {
		if (!regex.test(req.url)) {
			return next();
		}
		userIsAllowed(req.headers['referer'], function(allowed) {
			if (allowed) {
				next();
			} else {
				// send to home page
				 res.redirect('/');
			}
		});
	};
};
	
app.use(protectPath(/^\/js|css|app\/.*$/));
app.use(favicon(path.join(__dirname, 'public/images', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser(config.secret));
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use(passport.session());

//app.all('*', function(req, res, next) {
//	console.log("*all* " + JSON.stringify(next));
//	// CORS headers
//	res.header("Access-Control-Allow-Origin", "*"); // restrict it to the
//													// required domain
//	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
//	// Set custom headers for CORS
//	res.header('Access-Control-Allow-Headers',
//			'Content-type,Accept,X-Access-Token,X-Key');
//	if (req.method == 'OPTIONS') {
//		res.status(200).end();
//	} else {
//		next();
//	}
//});

app.use('/', routes);
app.use('/api', apiRoutes);
app.use('/admin', adminRoutes);

app.disable('x-powered-by');

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.redirect('/#/error/'+JSON.stringify(err)+'?code='+err.status+'&msg='+err.message);
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.redirect('/#/error');
});

module.exports = app;
