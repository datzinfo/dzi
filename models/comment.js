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
			},
			
			update: function(commentId, onSuccess, onError) {
				var writer = this.writer;
				var message = this.message;
				
				Comment.find({ where: {id: commentId} })
				.then(function(comment) {
					if (comment) {
						comment.updateAttributes({
							writer : writer,
							message: message
						})
						.then(
							function(success) {
								if (onSuccess) {
									onSuccess("Comment successfully updated.");
								}
							}, 
							function(error) {
								if (onError) {
									onError("Error updating a comment: " + error);
								}
							}
						);
					}
					else {
						onError("Error finding comment by id " + commentId);
					}
				})
				.catch(function(error) {
					if (onError) {
						onError("Unexpected error encountered identifying commentId: " + error);
					}
				});
			},

			deleteComment : function(models, commentId, isDelete, onSuccess, onError) {
				
				Comment.find({ 
					where: {id: commentId},
					include: [{model: models.reply, as: 'replies'}]
				})
				.then(function(comment) {
					console.log(">>comment: "+ JSON.stringify(comment));
					comment.updateAttributes({
						deleted : isDelete
					})
					.then(
						function(success) {
							comment.replies.forEach(function(reply) {
								reply.deleteReply(reply.id, isDelete, null, null);	
							});
							if (onSuccess) {
								onSuccess(comment);
//								Comment.findAll({
//									include: [{model: models.reply, as: 'replies',
//										include: [{model: models.reply, as: 'replies'}]}],
//										order : '`createdAt` DESC, `replies.createdAt` DESC, `replies.replies.createdAt` DESC'
//								})
//								.then(function(comments) {
//									onSuccess(comments);
//								})
							}
						}, 
						function(error) {
							if (onError) {
								onError("Error deleting a comment: " + error);
							}
						}
					);
				})
				.catch(function(error) {
					if (onError) {
						onError("Unexpected error encountered finding the comment: " + error);
					}
				});
			}
		}
	});

	return Comment;
};
