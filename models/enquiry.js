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
			add : function(models, onSuccess, onError) {
				var username = this.username;
				var email = this.email;
				var subject = this.subject;
				var message = this.message;

				var usr = models.user.build({
					username : this.username,
					email : this.email,
				});

				usr.findOrCreateByEmail(this.email)
				.then(function(user) {
					if (user) {
						Enquiry.build({
							username : username,
							email : email,
							subject : subject,
							message : message,
							userId : user.id
						}).save().then(
							function(enquiry) {
								if (onSuccess) {
									onSuccess(enquiry);
								}
							}, 
							function(error) {
								if (onError) {
									onError("Error adding an enquiry: " + error);
								}
							}
						);
				    }
				    else {
						if (onError) {
							onError("An unexpected error has occurred.");
						}
				    }
				  })
			  .catch(function(error) {
					if (onError) {
						onError("Unexpected error encountered identifying sender: " + error);
					}
			  });
			}
		}
	});

	return Enquiry;
};
