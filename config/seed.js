"use strict";

var crypto = require('crypto');

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
	  .findOrCreate({where: {type: 'Multimedia'}, defaults: {desc: 'Multimedia desc', blogId: '1'}})
	  .spread(function(category, created) {
		  if (created) {
		    console.log(category.get({
		      plain: true
		    }));
		    console.log('Created category Multimedia: ' + created);
		  }
	  });

	models.category
	  .findOrCreate({where: {type: 'Business Intelligence'}, defaults: {desc: 'Business Intelligence desc', blogId: '1'}})
	  .spread(function(category, created) {
		  if (created) {
		    console.log(category.get({
		      plain: true
		    }));
		    console.log('Created category Business Intelligence: ' + created);
		  }
	  });

	models.category
	  .findOrCreate({where: {type: 'Application Development'}, defaults: {desc: 'Application Development desc', blogId: '1'}})
	  .spread(function(category, created) {
		  if (created) {
		    console.log(category.get({
		      plain: true
		    }));
		    console.log('Created category Application Development: ' + created);
		  }
	  });

	var shasum = crypto.createHash('sha1');
	shasum.update('admin');
	var pw = shasum.digest('hex');
	models.user
	  .findOrCreate({where: {username: 'admin'}, defaults: {password: pw, email: "michaelfung@datzinfo.com", isAdmin: true, active: true}})
	  .spread(function(user, created) {
		  if (created) {
		    console.log(user.get({
		      plain: true
		    }));
		    console.log('Created admin user: ' + created);
		  }
	  });
};