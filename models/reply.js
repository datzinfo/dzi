"use strict";

module.exports = function(sequelize, DataTypes) {
	var Reply = sequelize.define('reply', {
		writer: DataTypes.STRING,
		message : DataTypes.TEXT,
		deleted: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false}
	}, {
		classMethods : {
			associate : function(models) {
				Reply.belongsTo(models.comment);
				Reply.belongsTo(models.reply);
				Reply.hasMany(models.reply);
				Reply.belongsTo(models.user);
			}
		},

		instanceMethods : {
			add : function(models, name, email, onSuccess, onError) {
				var message = this.message;
				var commentId = this.commentId;
				var replyId = this.replyId;
				
				var usr = models.user.build();

				usr.findOrCreateByNameEmail(name, email)
				.then(function(user) {
				    if (user) {
						Reply.build({
								writer : name,
								message : message,
								userId : user[0].id,
								commentId : commentId,
								replyId : replyId
							}).save().then(
								function(reply) {
									if (onSuccess) {
										onSuccess(reply);
									}
								}, 
								function(error) {
									if (onError) {
										onError("Error adding a reply: " + error);
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

	return Reply;
};
