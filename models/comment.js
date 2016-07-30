"use strict";

module.exports = function(sequelize, DataTypes) {
	var Comment = sequelize.define('comment', {
		writer: DataTypes.STRING,
		message : DataTypes.TEXT,
		deleted: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false}
	}, {
		classMethods : {
			associate : function(models) {
				Comment.belongsTo(models.post);
				Comment.belongsTo(models.user);
				Comment.hasMany(models.reply, {
					as: 'replies'
				});
			}
		},

		instanceMethods : {
			add : function(models, name, email, postId, onSuccess, onError) {
				var message = this.message;
				var deleted = this.deleted;
				
				var usr = models.user.build();

				usr.findOrCreateByNameEmail(name, email)
				.then(function(user) {
				    if (user) {
						Comment.build({
								writer : name,
								message : message,
								deleted: deleted,
								userId : user[0].id,
								postId : postId
							}).save().then(
								function(comment) {
									if (onSuccess) {
										onSuccess(comment);
									}
								}, 
								function(error) {
									if (onError) {
										onError("Error adding a comment: " + error);
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
						onError("Unexpected error encountered identifying author: " + error);
					}
			  });
			}
		}
	});

	return Comment;
};
