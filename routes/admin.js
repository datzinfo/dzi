var express = require('express');
var adminRoutes = express.Router();
var models = require("../models");
var config = require('../config/dzi');
var passport = require('passport');
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;

module.exports = adminRoutes;

var opts = {
	jwtFromRequest: ExtractJwt.fromAuthHeader(),
	secretOrKey: config.secret
}
passport.use(new JwtStrategy(opts, function(jwt_payload, done) {

	models.user.build()
	.findAdminByEmail(jwt_payload.id)
	.then(
		function(user) {
			if (!user) {
				done(null, false, 'User is not authorized.');
			}
			else {
				done(null, user);
			}
		},
		function(error) {
			return done(err, false, 'User is not authorized.');
		}
	)
}));

var ppOpts = {
	session: false,
}

adminRoutes.post('/addPost', passport.authenticate('jwt', ppOpts), function(req, res) {
	var post = models.post.build();
	
	post.title = req.body.title;
	post.contents = req.body.contents;
	post.imageurl = req.body.imageurl;
	post.state = req.body.state;
	post.author = req.body.author;
	
	var onSuccess = function(success) {
		console.log("++addPost++: " + success);
		res.sendStatus(200);
	};
	var onError = function(error) {
		console.log("--addPost--: " + error);
		res.status(500).send(error);
	};
	
	post.add(models, req.body.email, req.body.categoryId, onSuccess, onError);
});

adminRoutes.post('/updatePost', passport.authenticate('jwt', ppOpts), function(req, res) {
	var post = models.post.build();
	
	post.title = req.body.title;
	post.author = req.body.author;
	post.contents = req.body.contents;
	post.imageurl = req.body.imageurl;
	post.state = req.body.state;
	post.categoryId = req.body.categoryId;
	
	var onSuccess = function(success) {
		console.log("++updatePost++: " + success);
		res.sendStatus(200);
	};
	var onError = function(error) {
		console.log("--updatePost--: " + error);
		res.status(500).send(error);
	};
	
	post.update(req.body.id, onSuccess, onError);
});

adminRoutes.get('/getAdminPanelData', function(req, res, next) {
	
	var post = models.post.build();
	var states = post.getStateEnum();
	
	var category = models.category.build();
	var onSuccess = function(categories) {
		console.log("++getAdminPanelData++");
		res.status(200).json({
			'states': states,
			'categories': categories
		});		
	};
	
	var onError = function(error) {
		console.log("--getAdminPanelData--: " + error);
		res.status(200).json({
			'states': states,
			'categories': {}
		});		
	};
	
	category.getAllCategories(onSuccess, onError);
});

adminRoutes.post('/updateComment', passport.authenticate('jwt', ppOpts), function(req, res) {
	var comment = models.comment.build();
	
	comment.message = req.body.message;
	comment.writer = req.body.writer;
	
	var onSuccess = function(success) {
		res.sendStatus(200);
	};
	var onError = function(error) {
		console.log("--updateComment--: " + error);
		res.status(500).send(error);
	};
	
	comment.update(req.body.id, onSuccess, onError);
});

adminRoutes.post('/deleteComment', passport.authenticate('jwt', ppOpts), function(req, res) {
	var comment = models.comment.build();
	var commentId = req.body.commentId;
	
	var onSuccess = function(comment) {
		res.json(comment);
	};
	var onError = function(error) {
		console.log("--deleteComment--: " + error);
		res.status(500).send(error);
	};
	
	comment.deleteComment(models, commentId, req.body.deleted, onSuccess, onError);
});

adminRoutes.post('/updateReply', passport.authenticate('jwt', ppOpts), function(req, res) {
	var reply = models.reply.build();
	
	reply.message = req.body.message;
	reply.writer = req.body.writer;
	
	var onSuccess = function(success) {
		res.sendStatus(200);
	};
	var onError = function(error) {
		console.log("--updateComment--: " + error);
		res.status(500).send(error);
	};
	
	reply.update(req.body.id, onSuccess, onError);
});

adminRoutes.post('/deleteReply', passport.authenticate('jwt', ppOpts), function(req, res) {
	var reply = models.reply.build();
	var replyId = req.body.replyId;
	
	var onSuccess = function(reply) {
		console.log("++deleteReply++: " + reply);
		res.json(reply);
	};
	var onError = function(error) {
		console.log("--deleteReply--: " + error);
		res.status(500).send(error);
	};
	
	reply.deleteReply(replyId, req.body.deleted, onSuccess, onError);
});
