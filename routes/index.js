var express = require('express');
var router = express.Router();
var models = require("../models");

/* GET home page. */
router.get('/', function(req, res, next) {
	var messages = req.app.get('messages');
	res.render('index', { messages });
});

module.exports = router;

module.exports.addEnquiry = function(req, res) {
	var enquiry = models.enquiry.build();
	
	enquiry.username = req.body.name;
	enquiry.email = req.body.email;
	enquiry.subject = req.body.subject;
	enquiry.message = req.body.msg;
	
	enquiry.add(models);
};

module.exports.getCategories = function(req, res) {
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
};

module.exports.getAdminPanelData = function(req, res) {
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
};

module.exports.addComment = function(req, res) {
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
};

module.exports.updateComment = function(req, res) {
	var comment = models.comment.build();
	
	comment.message = req.body.message;
	comment.writer = req.body.writer;
	
	var onSuccess = function(success) {
		console.log("++updateComment++: " + JSON.stringify(success));
		res.sendStatus(200);
	};
	var onError = function(error) {
		console.log("--updateComment--: " + error);
		res.status(500).send(error);
	};
	
	comment.update(req.body.id, onSuccess, onError);
};

module.exports.updatePost = function(req, res) {
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
};

module.exports.getOnePost = function(req, res) {
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
};

module.exports.getPosts = function(req, res) {
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
};

module.exports.addPost = function(req, res) {
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
};

module.exports.addReply = function(req, res) {
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
};

module.exports.updateReply = function(req, res) {
	var reply = models.reply.build();
	
	reply.message = req.body.message;
	reply.writer = req.body.writer;
	
	var onSuccess = function(success) {
		console.log("++updateComment++: " + JSON.stringify(success));
		res.sendStatus(200);
	};
	var onError = function(error) {
		console.log("--updateComment--: " + error);
		res.status(500).send(error);
	};
	
	reply.update(req.body.id, onSuccess, onError);
};

module.exports.deleteReply = function(req, res) {
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
};

module.exports.deleteComment = function(req, res) {
	var comment = models.comment.build();
	var commentId = req.body.commentId;
	
	var onSuccess = function(comment) {
		console.log("++deleteComment++: " + JSON.stringify(comment));
		res.json(comment);
	};
	var onError = function(error) {
		console.log("--deleteComment--: " + error);
		res.status(500).send(error);
	};
	
	comment.deleteComment(models, commentId, req.body.deleted, onSuccess, onError);
};
