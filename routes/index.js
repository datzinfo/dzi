var jwt = require('jwt-simple');
var models = require("../models");
var secure = require('../config/secure');
var config = require('../config/dzi');
var express = require('express');
var router = express.Router();

module.exports = router;

/* GET home page. */
router.get('/', function(req, res, next) {
	var messages = req.app.get('messages');
	res.render('index', { messages });
});

router.post('/auth', function(req, res) {
	models.user.build()
	.findAdminByEmail(req.body.email)
	.then(
			function(user) {
				if (!user) {
					res.status(401).send({success: false, msg: 'Authentication failed. User not found.'});
				}
				else {
			        if (secure.verify(req.body.password, user.password)) {
			            // if user is found and password is right create a token
						var now = new Date();
						var expires =  Math.floor(new Date(now.getTime() + config.durationInMinutes*60000).getTime()/1000);
						var timestamp = Math.floor(now.getTime()/1000);
						var token = jwt.encode({id: user.email, iat: timestamp, exp: expires}, config.secret);
			            // return the information including token as JSON
			            res.json({success: true, token: 'JWT ' + token});
			        } else {
			            res.status(401).send({success: false, msg: 'Authentication failed. Wrong password.'});
			        }
				}
			},
			function(error) {
				res.send({success: false, msg: 'Authentication failed. User not found.'});
			}
	)
});
