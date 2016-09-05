"use strict";

var crypto = require('crypto');
var secure = require('../config/secure');

module.exports = function(models) {
	models.blog
	  .findOrCreate({where: {name: 'dziBlog'}, defaults: {desc: 'Blogging DatzInfo'}})
	  .spread(function(blog, created) {
		  if (created) {
		    console.log(blog.get({
		      plain: true
		    }));
		    console.log('Created blog: ' + created);
		  }
	  });

	models.category
	  .findOrCreate({where: {type: 'Tech Tips'}, defaults: {desc: 'Tech how-tos', blogId: '1'}})
	  .spread(function(category, created) {
		  if (created) {
		    console.log(category.get({
		      plain: true
		    }));
		    console.log('Created category Tech Tips: ' + created);
		  }
	  });

	models.category
	  .findOrCreate({where: {type: 'Business Insights'}, defaults: {desc: 'Anything relating to the business', blogId: '1'}})
	  .spread(function(category, created) {
		  if (created) {
		    console.log(category.get({
		      plain: true
		    }));
		    console.log('Created category Business: ' + created);
		  }
	  });

	models.category
	  .findOrCreate({where: {type: 'News & Announcements'}, defaults: {desc: 'News and annoucements', blogId: '1'}})
	  .spread(function(category, created) {
		  if (created) {
		    console.log(category.get({
		      plain: true
		    }));
		    console.log('Created category News & Announcements: ' + created);
		  }
	  });

	var pw = secure.hash('dziadmin');
	models.user
	  .findOrCreate({where: {username: 'mike'}, defaults: {password: pw, email: "michaelfung@datzinfo.com", isAdmin: true, active: true}})
	  .spread(function(user, created) {
		  if (created) {
		    console.log(user.get({
		      plain: true
		    }));
		    console.log('Created admin user mike: ' + created);
		  }
	  });
	
	var pw = secure.hash('dziadmin');
	models.user
	  .findOrCreate({where: {username: 'khuan'}, defaults: {password: pw, email: "kkh@datzinfo.com", isAdmin: true, active: true}})
	  .spread(function(user, created) {
		  if (created) {
		    console.log(user.get({
		      plain: true
		    }));
		    console.log('Created admin user khuan: ' + created);
		  }
	  });
};