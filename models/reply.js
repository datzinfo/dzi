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
				Reply.belongsTo(models.user);
				Reply.belongsTo(models.reply);
				Reply.hasMany(models.reply, {
					as: 'replies'
				});
			}
		},

		instanceMethods : {
			findById : function(replyId, onSuccess, onError) {
				
				Reply.find({
					where : {
						id : replyId,
					},
					include: [{model: Reply, as: 'replies'}],
					order : '`createdAt` DESC, `replies.createdAt` DESC'
				})
				.then(function(reply) {
					console.log(">>reply: " + JSON.stringify(reply));
					onSuccess(reply);
				})				
				.catch(function(error) {
					if (onError) {
						onError("Unexpected error encountered finding reply: " + error);
					}
				});
			},

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
			},
			
			update: function(replyId, onSuccess, onError) {
				var writer = this.writer;
				var message = this.message;
				
				Reply.find({ where: {id: replyId} })
				.then(function(reply) {
					if (reply) {
						reply.updateAttributes({
							writer : writer,
							message: message
						})
						.then(
							function(success) {
								if (onSuccess) {
									onSuccess("Reply successfully updated.");
								}
							}, 
							function(error) {
								if (onError) {
									onError("Error updating a reply: " + error);
								}
							}
						);
					}
					else {
						onError("Error finding reply by id " + commentId);
					}
				})
				.catch(function(error) {
					if (onError) {
						onError("Unexpected error encountered identifying replyId: " + error);
					}
				});
			},

			deleteReply : function(replyId, isDelete, onSuccess, onError) {
				
				Reply.update(
				    { deleted : isDelete },
				    { where:  sequelize.or(
							{id: replyId},
							{replyId: replyId}
						)
				    })
					.then(
						function(replies) {
							if (onSuccess) {
								Reply.build().findById(replyId, onSuccess, onError);
							}
						}, 
						function(error) {
							if (onError) {
								onError("Error deleting a reply: " + error);
							}
						}
					);					    
			}
		}
	});

	return Reply;
};
