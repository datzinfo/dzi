"use strict";

var crypto = require('crypto');
var secure = require('../config/secure');

module.exports = function(sequelize, DataTypes) {
	var User = sequelize.define('user', {
		// uuid: {
		// type: DataTypes.UUID,
		// primaryKey: true
		// },
		username : DataTypes.STRING,
		password : DataTypes.STRING,
		email : {type: DataTypes.STRING, validate: {isEmail: true}},
		isAdmin : DataTypes.BOOLEAN,
		active : DataTypes.BOOLEAN
	}, {
		classMethods : {
			associate : function(models) {
				User.hasMany(models.post, {
					as : 'posts'
				});
				User.hasMany(models.comment, {
					as : 'comments'
				});
				User.hasMany(models.enquiry, {
					as : 'enquiries'
				});
				User.hasMany(models.reply, {
					as : 'replies'
				});
			}
		},

		instanceMethods : {
			findAdminByEmail : function(email, onSuccess, onError) {
				return User.find({
					where : {
						email : email,
						isAdmin : true
					}
				});
			},

			findAdminIdByEmail : function(email) {
				return User.find({
					where : {
						email : email,
						isAdmin : true
					},
					attributes : [ 'id' ]
				});
			},

			findOrCreateByEmail : function(email) {
				var pw = '';
				if (this.password) {
					pw = secure.hash(this.password);
				}

				return User.findOrCreate({
					where : {
						email : email
					},
					defaults : {
						username : this.username,
						password : pw,
						isAdmin : false,
						active : true
					}
				});
			},

			findOrCreateByNameEmail : function(name, email) {
				var pw = '';
				if (this.password) {
					pw = secure.hash(this.password);
				}

				return User.findOrCreate({
					where : {
						username : name,
						email : email,
					},
					defaults : {
						password : pw,
						isAdmin : false,
						active : true
					}
				});
			}
		}
	});

	return User;
};
