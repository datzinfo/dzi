var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	var messages = req.app.get('messages');
	res.render('blog', { messages });
});

module.exports = router;
