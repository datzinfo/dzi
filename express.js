var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');
var Sequelize = require('sequelize');

var routes = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon(path.join(__dirname, 'public/images', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.post('/addPost', routes.addPost);
app.get('/getPosts', routes.getPosts);
app.get('/getOnePost', routes.getOnePost);
app.post('/addComment', routes.addComment);
app.get('/getAdminPanelData', routes.getAdminPanelData);
app.post('/addEnquiry', routes.addEnquiry);
app.get('/getCategories', routes.getCategories);
app.post('/addReply', routes.addReply);

// email
app.post('/sendEmail', function(req, res){
	var mailOptions={
	        from : "kkkkk97855@yahoo.com",
	        to : "kkkkk97855@yahoo.com",
	        subject : req.body['subject'],
	        text : "Msg from: " + req.body['name'] + "<" + req.body['email'] + "> " + req.body['msg'],
	        html : "&#128538; Msg from " + req.body['name'] + "<" + req.body['email'] + ">: " + req.body['msg']
	     }
	console.log('Sending email: ' + JSON.stringify(mailOptions));

	var transporter = nodemailer.createTransport({
	    host : "smtp.mail.yahoo.com",
	    secureConnection : true,
	    port: 465,
	    auth : {
	        user : "kkkkk97855@yahoo.com",
	        pass : "buyNbuy88"
	    }
	});

	transporter.sendMail(mailOptions, function(error, response){
	    if (error) {
	        console.log(error);
			res.end("error");
	    } else {
	        console.log(response.response.toString());
			res.end("success");
	    }
	    transporter.close();	// close connection pool
	});
});

// db APIs



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
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
