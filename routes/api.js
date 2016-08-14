var express = require('express');
var apiRoutes = express.Router();
var models = require("../models");
var nodemailer = require('nodemailer');
var config0 = require('../config/dzi');
var config = config0[config0.env];

module.exports = apiRoutes;

apiRoutes.post('/sendEmail', function(req, res) {
	var mailOptions={
	        from : config.emailFrom,
	        to : config.emailFrom,
	        subject : req.body['subject'],
	        text : "Msg from: " + req.body['name'] + "<" + req.body['email'] + "> " + req.body['msg'],
	        html : "&#128538; Msg from " + req.body['name'] + "<" + req.body['email'] + ">: " + req.body['msg']
	     }

	var transporter = nodemailer.createTransport(config.mailer);

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

apiRoutes.post('/addEnquiry', function(req, res) {
	var enquiry = models.enquiry.build();
	
	enquiry.username = req.body.name;
	enquiry.email = req.body.email;
	enquiry.subject = req.body.subject;
	enquiry.message = req.body.msg;
	
	var onSuccess = function(enquiry) {
		console.log("++addEnquiry++: " + JSON.stringify(enquiry));
		res.json(enquiry);
	};
	var onError = function(error) {
		console.log("--addEnquiry--: " + error);
		res.status(500).send(error);
	};

	enquiry.add(models, onSuccess, onError);
});

apiRoutes.get('/getCategories', function(req, res) {
	var post = models.post.build();
	
	var category = models.category.build();
	var onSuccess = function(categories) {
		console.log("++getCategories++");
		res.status(200).json(categories);		
	};
	
	var onError = function(error) {
		console.log("--getCategories--: " + error);
		res.status(500).send(error);
	};
	
	category.getAllCategories(onSuccess, onError);
});

apiRoutes.get('/getOnePost', function(req, res) {
	var post = models.post.build();

	var onSuccess = function(post){
		console.log("++getOnePost++: " + JSON.stringify(post));	
		res.json(post);
	};
	
	var onError = function(error) {
		console.log("--getOnePost--: " + error);
		res.status(401).send("Post not found");   		
	};

	post.findById(models, req.query.id, req.query.deleted, onSuccess, onError);
});

apiRoutes.get('/getPosts', function(req, res) {
	var post = models.post.build();

	var onSuccess = function(posts){
		console.log("++getPosts++: " + JSON.stringify(posts));	
		res.json(posts);
	};
	
	var onError = function(error) {
		console.log("--getPosts--: " + error);
		res.status(401).send("No posts not found");   		
	};

	post.findAllByCategory(models, req.query.categoryId, req.query.state, onSuccess, onError);
});

apiRoutes.post('/addComment', function(req, res) {
	var comment = models.comment.build();
	
	comment.message = req.body.message;
	comment.postId = req.body.postId;
	comment.replyId = req.body.replyId;
	
	var onSuccess = function(comment) {
		console.log("++addComment++: " + JSON.stringify(comment));
		res.json(comment);
	};
	var onError = function(error) {
		console.log("--addComment--: " + error);
		res.status(500).send(error);
	};
	
	comment.add(models, req.body.name, req.body.email, req.body.postId, onSuccess, onError);
});

apiRoutes.post('/addReply', function(req, res) {
	var reply = models.reply.build();
	reply.message = req.body.message;
	reply.commentId = req.body.commentId;
	reply.replyId = req.body.replyId;
	
	var onSuccess = function(reply) {
		console.log("++addReply++: " + JSON.stringify(reply));
		res.json(reply);
	};
	var onError = function(error) {
		console.log("--addReply--: " + error);
		res.status(500).send(error);
	};
	
	reply.add(models, req.body.name, req.body.email, onSuccess, onError);
});
