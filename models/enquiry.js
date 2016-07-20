"use strict";

var crypto = require('crypto');

module.exports = function(sequelize, DataTypes) {
	var Enquiry = sequelize.define('enquiry', {
		username : DataTypes.STRING,
		email : DataTypes.STRING,
		subject : DataTypes.STRING,
		message : DataTypes.TEXT
	}, {
		classMethods : {
			associate : function(models) {
				Enquiry.belongsTo(models.user);
			}
		},

		instanceMethods : {
			add : function(models) {
				var username = this.username;
				var email = this.email;
				var subject = this.subject;
				var message = this.message;

				var usr = models.user.build({
					username : this.username,
					email : this.email,
				});

				usr.findOrCreateByEmail(this.email).then(
						function(user, created) {
							if (user[0]) {
								Enquiry.build({
									username : username,
									email : email,
									subject : subject,
									message : message,
									userId : user[0].id
								}).save().then(function(enquiry) {
									// TODO
									// }).catch(function(error) {
									// // error-handling
								});
							} else {
								// handle error
							}
						});
			}
		}
	});

	return Enquiry;
};
